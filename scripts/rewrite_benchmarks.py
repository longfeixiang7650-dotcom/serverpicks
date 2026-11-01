#!/usr/bin/env python3
"""针对 6 篇含编造 benchmark 精确数据的博客做二次重写：彻底删除 benchmark 数字和'实测'方法学。"""
import requests, json, re, subprocess, time, sys, os

KEYS = [
    subprocess.run(["python3", "/home/edi/.hermes/scripts/api_helper.py", f"QWEN_API_KEY_{i}"], capture_output=True, text=True).stdout.strip()
    for i in [1, 2, 3]
]
KEYS = [k for k in KEYS if k.startswith("sk-")]

PATH = "/home/edi/serverpicks/app/data/blog-posts.ts"
URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"

TARGET_SLUGS = [
    "european-vps-showdown-2026-hetzner-ovhcloud-contabo-scaleway",
    "vps-performance-comparison-hetzner-digitalocean-linode-vultr",
]

SYSTEM = """你是资深技术编辑。任务：删除一篇博客里所有编造的基准测试数据，改成客观的选型指南。

严格规则：
1. 删除所有编造的评分表：如"| 提供商 | 4.3 | 3.9 | 4.6 |"这类小数评分表格，改成定性的优缺点描述或直接删除评分列。
2. 删除所有 benchmark 精确数字：Geekbench 分数、Sysbench events/sec、IOPS 数值、MB/s 吞吐、毫秒延迟、requests/sec、具体百分比性能对比。
3. 删除所有"实测方法学"描述：如"rebooted prior to testing"、"repeated three times"、"measured from five locations"、"using ApacheBench/ab/fio/Geekbench 6.4.0"这类假装真的跑过测试的句子。
4. 把"XX 提供商得分最高"这类结论改成定性、常识性的客观描述（如"XX 以其单核性能和 NVMe 存储见长"），不引用具体测试分数。
5. 保留客观有价值信息：定价、套餐规格（vCPU/RAM/SSD/带宽）、功能、区域覆盖（数据中心数量）、成立年份、许可证、tradeoff、适用场景。
6. 如果某个表格整表都是编造评分或 benchmark 数字，删除该表格，或改成"规格对比表"（只留定价/规格/区域，不留分数）。
7. 保持 markdown 结构，保持专业客观语气，不要引入任何新的编造数据。
8. 输出字数 70-100%（删了评分/benchmark 后可以略短）。"""


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


def slug_positions(t):
    return [(m.start(), m.group(1)) for m in re.finditer(r'slug:\s*"([^"]+)"', t)]


def call_qwen(system, user, key_idx, max_tokens=3500):
    key = KEYS[key_idx % len(KEYS)]
    headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}
    body = {"model": "qwen-plus",
            "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
            "temperature": 0.3, "max_tokens": max_tokens}
    for attempt in range(3):
        try:
            r = requests.post(URL, headers=headers, json=body, timeout=120, proxies={"http": None, "https": None})
            r.raise_for_status()
            return r.json()["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"    [重试{attempt+1}] {str(e)[:80]}", flush=True)
            time.sleep(3)
    return None


text = open(PATH, encoding="utf-8").read()
contents = extract_contents(text)
slugs = slug_positions(text)
print(f"共 {len(contents)} content, {len(slugs)} slug", flush=True)

# 建立 slug -> content 索引
slug_to_content_idx = {}
for i, (pos, slug) in enumerate(slugs):
    # 找这个 slug 之后最近的 content
    for ci, (cidx, cend, cbody) in enumerate(contents):
        if cidx > pos:
            slug_to_content_idx[slug] = ci
            break

target_indices = []
for slug in TARGET_SLUGS:
    if slug in slug_to_content_idx:
        target_indices.append((slug, slug_to_content_idx[slug]))
        print(f"  目标: {slug} -> content #{slug_to_content_idx[slug]}", flush=True)

# 重写
for n, (slug, ci) in enumerate(target_indices):
    old = contents[ci][2]
    print(f"[{n+1}/{len(target_indices)}] 重写 {slug} ({len(old)}字符)...", flush=True)
    nc = call_qwen(SYSTEM, f"请删除下面这篇博客的编造 benchmark 数据，输出完整的改写后 markdown：\n\n{old}", n)
    if nc is None:
        print(f"    ❌ 失败，保留原文", flush=True)
        continue
    nc_esc = nc.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
    text = text.replace(old, nc_esc)
    print(f"    ✅ 完成", flush=True)

open(PATH, "w", encoding="utf-8").write(text)
print("\n✅ 全部写回完成", flush=True)
