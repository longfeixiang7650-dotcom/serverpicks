#!/usr/bin/env python3
"""重写 tools.ts 里含编造数据（评分/测试经历/企业案例/实测百分比）的工具 longDescription。"""
import requests, json, re, subprocess, time, sys, os

KEYS = [
    subprocess.run(["python3", "/home/edi/.hermes/scripts/api_helper.py", f"QWEN_API_KEY_{i}"], capture_output=True, text=True).stdout.strip()
    for i in [1, 2, 3]
]
KEYS = [k for k in KEYS if k.startswith("sk-")]

PATH = "/home/edi/serverpicks/app/data/tools.ts"
URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"

TARGET_IDS = [
    "civo",
    "kamatera",
    "interserver",
    "cloudflare",
    "akamai",
    "keycdn",
    "stackpath",
    "googlecloudcdn",
    "azurecdn",
    "godaddy",
    "grafana",
]

SYSTEM = """你是资深技术编辑。任务：清理一篇云服务/工具描述里的编造数据，改成客观可信的描述。

严格规则：
1. 删除编造的用户评分（如"4.0 rating across 119 reviews"、"X/5 rating"）。
2. 删除编造的测试经历（如"In our testing"、"Benchmarked across 12 production environments"、"we tested"、"verified across 7 audit logs"）。
3. 删除编造的企业案例（如"MedData Systems reduced patching by 41%"、"Capital One uses..."、具体客户+具体数字）。
4. 删除编造的"实测改进数据"（如"reduced load times by 18%"、"~30% faster"、"sub-800ms page load"这类无法验证的精确测试结果）。
5. 删除编造的 benchmark 来源和数据：如"ServerPicks 2026 Infrastructure Benchmark Suite"（虚构自有套件）、"CloudHarmony Q1 2026 shows"、"independent benchmarks by WebPageTest/CNCF"这类引用真实第三方名但配上编造具体数字的表述。若某性能数据无法给出真实可查来源，删掉具体数字，改成定性描述。
6. 保留客观有价值信息：定价、套餐规格、功能、区域/数据中心数量、SLA（99.99% uptime）、许可证、适用场景、tradeoff。
7. 行业标准/厂商公开宣称的数据可保留（如"99.99% SLA"、"32% market share"公开市场报告、"up to 72% savings"公开折扣、厂商官网公开宣称的"减少X%回源"这类营销数据）。
8. 保持专业客观语气，不要引入任何新的编造数据，不要编造引用来源。
9. 输出字数 80-110%。"""


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

# 提取每个目标工具的 longDescription 块
def extract_longdesc(t, tool_id):
    # 找 id: "tool_id" 之后的 longDescription
    m = re.search(r'id:\s*"' + re.escape(tool_id) + r'".*?longDescription: ', t, re.S)
    if not m:
        return None
    start = m.end()
    # 判断是反引号还是双引号
    if t[start] == '`':
        j = start + 1
        while j < len(t):
            if t[j] == '`' and t[j-1] != '\\':
                break
            j += 1
        return t[start:j+1], t[start+1:j]  # (full, inner)
    elif t[start] == '"':
        # 双引号字符串
        j = start + 1
        while j < len(t):
            if t[j] == '"' and t[j-1] != '\\':
                break
            j += 1
        return t[start:j+1], t[start+1:j]
    return None


for n, tid in enumerate(TARGET_IDS):
    r = extract_longdesc(text, tid)
    if not r:
        print(f"[{n+1}/{len(TARGET_IDS)}] {tid}: 未找到 longDescription，跳过", flush=True)
        continue
    full, inner = r
    print(f"[{n+1}/{len(TARGET_IDS)}] 重写 {tid} ({len(inner)}字符)...", flush=True)
    nc = call_qwen(SYSTEM, f"请清理下面这段工具描述的编造数据，输出完整改写后的描述（保持原文风格和长度）：\n\n{inner}", n)
    if nc is None:
        print(f"    ❌ 失败，保留原文", flush=True)
        continue
    # 写回：保持原格式（反引号或双引号）
    if full.startswith('`'):
        nc_esc = nc.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
        new_full = '`' + nc_esc + '`'
    else:
        nc_esc = nc.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')
        new_full = '"' + nc_esc + '"'
    text = text.replace(full, new_full)
    print(f"    ✅ 完成", flush=True)

open(PATH, "w", encoding="utf-8").write(text)
print("\n✅ 全部写回完成", flush=True)
