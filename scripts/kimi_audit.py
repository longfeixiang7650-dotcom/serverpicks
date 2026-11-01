#!/usr/bin/env python3
"""AdSense 提交前终审 — kimi-k3.1-pro-highspeed 巡检（优化版）。
每页截断 1000 字符，分 3 批审核，避免 reasoning 吃光 max_tokens 导致 content 为空。
"""
import urllib.request, urllib.error, json, re, sys, os, html, time

def get_key():
    with open(os.path.expanduser("~/.hermes/api_keys.env")) as f:
        for line in f:
            if line.strip().startswith("KIMI_API_KEY_2="):
                return line.split("=", 1)[1].strip()
    return None

KEY = get_key()
BASE = "https://api.moonshot.cn/v1"
MODEL = "kimi-k3.1-pro-highspeed"

def fetch(url, retries=3):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; AdSenseAudit/1.0)"})
    for _ in range(retries):
        try:
            resp = urllib.request.urlopen(req, timeout=25)
            return resp.read().decode("utf-8", errors="ignore")
        except Exception:
            time.sleep(2)
    return ""

def html_to_text(h):
    h = re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', h, flags=re.S | re.I)
    h = re.sub(r'<[^>]+>', ' ', h)
    h = html.unescape(h)
    return re.sub(r'\s+', ' ', h).strip()

def chat(system, user, max_tokens=4000):
    payload = json.dumps({
        "model": MODEL,
        "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
        "max_tokens": max_tokens,
    }).encode()
    req = urllib.request.Request(BASE + "/chat/completions", data=payload,
        headers={"Authorization": "Bearer " + KEY, "Content-Type": "application/json"})
    last_err = ""
    for attempt in range(3):
        try:
            resp = urllib.request.urlopen(req, timeout=200)
            d = json.loads(resp.read().decode())
            return d["choices"][0]["message"].get("content", "")
        except urllib.error.HTTPError as e:
            last_err = f"HTTP {e.code}: {e.read().decode()[:120]}"
        except Exception as e:
            last_err = f"{type(e).__name__}: {str(e)[:120]}"
        time.sleep(3)
    return f"[CHAT_ERROR] {last_err}"

def audit_site(domain, positioning):
    pages = {
        "首页": f"https://{domain}/",
        "About": f"https://{domain}/about/",
        "Privacy": f"https://{domain}/privacy/",
        "Terms": f"https://{domain}/terms/",
        "Disclosure": f"https://{domain}/disclosure/",
        "Contact": f"https://{domain}/contact/",
        "Blog": f"https://{domain}/blog/",
        "Tools": f"https://{domain}/tools/",
    }
    print(f"\n{'='*60}\n巡检 {domain}\n{'='*60}", flush=True)
    texts = {}
    for name, url in pages.items():
        h = fetch(url)
        if not h:
            texts[name] = f"[抓取失败] {url}"
            print(f"  {name}: 抓取失败", flush=True)
            continue
        t = html_to_text(h)
        texts[name] = t[:1000]
        print(f"  {name}: {len(t)}字符", flush=True)
        time.sleep(0.3)

    system = "你是 AdSense 内容合规审核专家。对站点做\"提交前终审\"。每条结论用 [通过]/[警告]/[严重] 前缀，附证据。结论直接写在正文，简洁准确。"

    # 批1：法律页面 + 作者身份
    b1 = "\n".join([f"### [{n}]\n{texts.get(n,'')}" for n in ["About","Privacy","Terms","Disclosure","Contact"]])
    u1 = f"审核 https://{domain}（{positioning}）。\n检查：A1 五页是否正常（非Not Found）；A2 地址是否自相矛盾；A3 隐私/披露是否诚实（有无声称已投广告但实际未投的矛盾）；A4 About作者身份（真实署名+GitHub？有无虚构团队）。\n页面：\n{b1}"
    r1 = chat(system, u1)
    print("\n===== 批1：法律页面+作者身份 =====\n" + r1, flush=True)

    # 批2：内容真实性
    b2 = "\n".join([f"### [{n}]\n{texts.get(n,'')}" for n in ["首页","Tools"]])
    u2 = f"审核 https://{domain}。\n检查：B1 有无编造评分(rating/reviewCount/星级/score)；B2 有无编造实践经历(we tested/I spent/my experience/hands-on)；B3 有无无法验证的精确数据(编造benchmark/用户数/下载量)。\n页面：\n{b2}"
    r2 = chat(system, u2)
    print("\n===== 批2：内容真实性 =====\n" + r2, flush=True)

    # 批3：技术合规 + 内容质量
    b3 = "\n".join([f"### [{n}]\n{texts.get(n,'')}" for n in ["Blog","首页"]])
    u3 = f"审核 https://{domain}。\n检查：C1 首页有无Cookie同意横幅；C2 有无中文内容残留(作者署名\"龙飞翔\"除外)；C3 博客主题是否与定位一致、有无千人一面Top10灌稿。\n页面：\n{b3}"
    r3 = chat(system, u3)
    print("\n===== 批3：技术合规+内容质量 =====\n" + r3, flush=True)

    # 汇总
    u4 = f"根据三批结果给 https://{domain} 汇总：总评分/100 + 是否达可提交AdSense(是/否) + 必须修复的严重项。\n批1:{r1[:800]}\n批2:{r2[:800]}\n批3:{r3[:800]}"
    r4 = chat(system, u4, max_tokens=1500)
    print("\n===== 最终汇总 =====\n" + r4, flush=True)
    return r1, r2, r3, r4

if __name__ == "__main__":
    targets = [("devex-tools.net", "开发者工具目录站，AI辅助整理，作者龙飞翔真实署名")]
    if len(sys.argv) > 1 and sys.argv[1] == "both":
        targets.append(("serverpicks.net", "云主机/VPS对比目录站，AI辅助整理，作者龙飞翔真实署名"))
    for domain, pos in targets:
        audit_site(domain, pos)
