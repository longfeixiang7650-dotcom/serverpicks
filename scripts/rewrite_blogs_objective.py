#!/usr/bin/env python3
"""Rewrite 66 blog posts (first-person -> objective) — 直连 + 并行 + 增量 checkpoint。
修复：走系统代理(Mihomo 7890)会卡死，必须 proxies=None 直连 dashscope。
"""
import requests, json, re, subprocess, time, sys, os
from concurrent.futures import ThreadPoolExecutor, as_completed

KEYS = [
    subprocess.run(["python3", "/home/edi/.hermes/scripts/api_helper.py", f"QWEN_API_KEY_{i}"], capture_output=True, text=True).stdout.strip()
    for i in [1, 2, 3]
]
KEYS = [k for k in KEYS if k.startswith("sk-")]
print(f"可用 Qwen keys: {len(KEYS)}", flush=True)

PATH = "/home/edi/serverpicks/app/data/blog-posts.ts"
CKPT = "/home/edi/serverpicks/rewrite_checkpoint.json"
text = open(PATH, encoding="utf-8").read()

URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"

SYSTEM_CONTENT = """你是资深技术编辑。任务：把一篇博客改写成客观、可信的第三方指南文章。

严格规则：
1. 删除所有第一人称代词（I, my, me, mine, we, our, us）以及编造的个人使用经历、个人观点、个人轶事。把"我做了什么/我经历了什么/我们测试了"改写成客观陈述或直接删除。
2. 删除所有编造的"一手测试数据"：Geekbench/Sysbench/fio 等基准测试的精确分数、IOPS 数值、延迟毫秒数、"我跑了 benchmark 得到 X"这类无法验证的测试结论。这类"实测"内容整段删除或改成定性、常识性的客观描述。
3. 删除编造的用户数、下载量、市场份额百分比等无法验证的精确统计论断。
4. 保留所有客观有价值的信息：工具/云厂商的定价、套餐规格（vCPU/RAM/SSD/带宽）、功能、许可证、技术概念、tradeoff、适用场景。
5. 保持 markdown 结构（# 标题、## 小节、表格、列表）。
6. 绝对不要引入任何新的编造数据、案例、基准测试、统计数字。
7. 保持专业、客观、百科式的语气，用"本文/本指南/以下内容"等中性措辞。
8. 输出字数保持在原文的 80-110%。"""

SYSTEM_EXCERPT = """你是编辑。把下面这段博客摘要从第一人称改写成客观表述，保持简洁（1-2句话，60词以内），删除第一人称代词（we/our/I）和个人观点，删除编造的统计数字。只输出改写后的摘要，不要加引号或其他标记。"""


def extract_contents(t):
    results = []
    i = 0
    while True:
        idx = t.find('content: `', i)
        if idx == -1:
            break
        cs = idx + len('content: `')
        j = cs
        while j < len(t):
            if t[j] == '`' and t[j-1] != '\\':
                break
            j += 1
        results.append((idx, j + 1, t[cs:j]))
        i = j + 1
    return results


def extract_excerpts(t):
    results = []
    for m in re.finditer(r'excerpt:\s*"((?:[^"\\]|\\.)*)"', t):
        raw = m.group(1)
        raw = raw.replace('\\"', '"').replace('\\\\', '\\').replace('\\n', ' ')
        results.append((m.start(), m.end(), m.group(0), raw))
    return results


contents = extract_contents(text)
excerpts = extract_excerpts(text)
assert len(contents) == len(excerpts) == 66, f"数量不匹配: {len(contents)}/{len(excerpts)}"
print(f"提取 {len(contents)} content, {len(excerpts)} excerpt", flush=True)

# 加载 checkpoint
done = {}
if os.path.exists(CKPT):
    done = json.load(open(CKPT))
    print(f"checkpoint: 已完成 {len(done)} 篇", flush=True)


def call_qwen(system, user, key_idx, max_tokens=3500):
    key = KEYS[key_idx % len(KEYS)]
    headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}
    body = {
        "model": "qwen-plus",
        "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
        "temperature": 0.3,
        "max_tokens": max_tokens,
    }
    for attempt in range(3):
        try:
            # 直连，绕过系统代理（走代理会卡死）
            r = requests.post(URL, headers=headers, json=body, timeout=90, proxies={"http": None, "https": None})
            r.raise_for_status()
            return r.json()["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"    [重试{attempt+1}] {str(e)[:80]}", flush=True)
            time.sleep(3)
    return None


def process_one(i):
    if str(i) in done:
        return i, done[str(i)]
    old_content = contents[i][2]
    old_excerpt = excerpts[i][3]
    nc = call_qwen(SYSTEM_CONTENT, f"请改写下面这篇博客，输出完整的改写后 markdown（保持 # 和 ## 结构）：\n\n{old_content}", i)
    if nc is None:
        nc = old_content
    ne = call_qwen(SYSTEM_EXCERPT, old_excerpt, i, max_tokens=200)
    if ne is None:
        ne = old_excerpt
    return i, {"content": nc, "excerpt": ne.strip().strip('"')}


# 并行处理未完成的篇目
pending = [i for i in range(66) if str(i) not in done]
print(f"待处理 {len(pending)} 篇，并行 {min(3, len(KEYS))} worker", flush=True)

with ThreadPoolExecutor(max_workers=3) as ex:
    futures = {ex.submit(process_one, i): i for i in pending}
    for n, fut in enumerate(as_completed(futures), 1):
        i, result = fut.result()
        done[str(i)] = result
        # 增量保存 checkpoint
        json.dump(done, open(CKPT, "w"))
        print(f"[{n}/{len(pending)}] 完成第 {i+1} 篇", flush=True)

print("全部重写完成，开始写回 blog-posts.ts...", flush=True)

# 写回（从后往前）
for i in range(65, -1, -1):
    r = done[str(i)]
    # excerpt
    old_ex_full = excerpts[i][2]
    new_ex = r["excerpt"].replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')
    text = text.replace(old_ex_full, f'excerpt: "{new_ex}"')
    # content
    nc_esc = r["content"].replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
    text = text.replace(contents[i][2], nc_esc)

open(PATH, "w", encoding="utf-8").write(text)
print("✅ 写回完成", flush=True)
