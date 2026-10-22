"""Checks for design/poster-wireframe/index.html (local Playwright + Chromium; downloads nothing).

Draft prepared with AI assistance for the Designer; to be reviewed and edited by the team.

Run: python3 check_poster.py [--capacity]
  --capacity  also measure how many words fit per zone at 14/16/20/24 pt body (slow, about a minute)
"""
import re
import sys
import tempfile
from pathlib import Path
from playwright.sync_api import sync_playwright

here = Path(__file__).resolve().parent.parent
page_path, readme = here / "index.html", here / "README.md"
src = page_path.read_text(encoding="utf-8")
fails = []


def check(cond, msg):
    print(("  PASS " if cond else "  FAIL ") + msg)
    if not cond:
        fails.append(msg)


print("[1] static")
ext = re.findall(r'(?:src|href)="(?:https?:)?//[^"]+"', src) + re.findall(r"@import|url\((?!['\"]?data:)", src)
check(not ext, f"no external resources in the page ({ext})")
check("Draft prepared with AI assistance for the Designer" in src, "draft note present on the page")

# Rubric table in README: every row must map to zones 1-11.
rows = re.findall(r"^\| ([^|]+?) \| ([0-9–, ]+) \| ", readme.read_text(encoding="utf-8").split("## Rubric mapping", 1)[1].split("##", 1)[0], re.M)
items = [r for r in rows if r[0] != "Rubric item"]
expected = ["Problem identification", "STEM", "business / governance", "social-science", "logic", "value-add", "limits",
            "flow", "standalone", "visuals", "citations", "AI usage"]
for e in expected:
    hit = [r for r in items if e.lower() in r[0].lower()]
    zones = []
    for r in hit:
        for part in r[1].replace(" ", "").split(","):
            a, _, b = part.partition("–")
            zones += list(range(int(a), int(b or a) + 1))
    check(bool(hit) and zones and all(1 <= z <= 11 for z in zones), f"rubric '{e}' -> zones {sorted(set(zones))}")

JS_OVER = "() => [...document.querySelectorAll('.zone')].filter(z => z.scrollHeight > z.clientHeight + 1).map(z => z.querySelector('.zn').textContent)"
JS_CAP = """(args) => { const [zi, n] = args; const z = document.querySelectorAll('.zone')[zi];
  const ps = [...z.querySelectorAll('.fill[data-n]')]; const main = ps.reduce((a, b) => (+b.dataset.n > +a.dataset.n ? b : a));
  const W = 'a caller asked for money and told her to keep it secret because it was urgent so she pressed the button'.split(' ');
  main.textContent = Array.from({length: n}, (_, i) => W[i % W.length]).join(' ');
  const fixed = ps.filter(p => p !== main).reduce((a, p) => a + p.textContent.split(/\\s+/).filter(Boolean).length, 0);
  const head = (z.querySelector('.ph-head') || {textContent: ''}).textContent.split(/\\s+/).filter(Boolean).length;
  return [z.scrollHeight <= z.clientHeight + 1, fixed + head]; }"""

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1280, "height": 900})
    net = []
    ctx.route("**/*", lambda r: (net.append(r.request.url), r.abort()) if not r.request.url.startswith(("file:", "data:")) else r.continue_())
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(page_path.as_uri())
    page.uncheck("#fit")

    print("[2] layout")
    w, h = page.evaluate("() => [poster.getBoundingClientRect().width, poster.getBoundingClientRect().height]")
    check(abs(h / w - 420 / 297) < 0.002, f"A3 portrait aspect: {w:.0f} x {h:.0f} px = {h / w:.4f} (A3 = {420 / 297:.4f})")
    nums = page.evaluate("() => [...document.querySelectorAll('.zone .zn')].map(n => +n.textContent)")
    check(nums == list(range(1, 12)), f"11 zones in reading order in the DOM: {nums}")
    order = page.evaluate("() => [...document.querySelectorAll('.zone')].map(z => { const r = z.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.left)]; })")
    check(order == sorted(order), "visual order (top-to-bottom, then left-to-right) matches the numbering")
    words = page.evaluate("() => [...document.querySelectorAll('.zone')].map(z => +z.dataset.words)")
    check(sum(words) <= 450, f"word budget total {sum(words)} <= 450 ({words})")
    check(page.inner_text("#total").startswith(str(sum(words))), "budget table total matches the zones")
    check(page.evaluate(JS_OVER) == [], "content notes fit inside every zone")

    print("[3] density test")
    page.check("input[value=density]")
    for pt in ["16", "20"]:
        page.select_option("#body-pt", pt)
        over = page.evaluate(JS_OVER)
        check(over == [], f"budgeted words fit at {pt} pt body (overflowing: {over})")
    fills = page.evaluate("() => [...document.querySelectorAll('.zone')].map(z => [...z.querySelectorAll('.fill')].filter(p => !p.querySelector('.fill')).reduce((a, p) => a + p.textContent.split(/\\s+/).filter(Boolean).length, 0) + (z.querySelector('.ph-head') || {textContent: ''}).textContent.split(/\\s+/).filter(Boolean).length)")
    check(fills == words, f"density filler matches each zone's budget ({fills})")

    if "--capacity" in sys.argv:
        print("[4] capacity (words that fit per zone)")
        for pt in ["14", "16", "20", "24"]:
            page.evaluate(f"() => document.documentElement.style.setProperty('--body-pt', '{pt}pt')")
            caps = []
            for zi in range(11):
                best = 0
                for n in range(0, 160):
                    ok, fixed = page.evaluate(JS_CAP, [zi, n])
                    if not ok:
                        break
                    best = n + fixed
                caps.append(best)
            print(f"  {pt} pt: {caps} total {sum(caps)}")
        page.reload(); page.uncheck("#fit")

    print("[5] print and offline")
    with tempfile.TemporaryDirectory() as d:
        pdf = Path(d) / "poster.pdf"
        page.pdf(path=str(pdf), prefer_css_page_size=True, print_background=True)
        data = pdf.read_bytes()
        pages = len(re.findall(rb"/Type\s*/Page(?!s)", data))
        box = re.search(rb"/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)\s*\]", data)
        mm = (round(float(box.group(1)) * 25.4 / 72), round(float(box.group(2)) * 25.4 / 72)) if box else None
        check(pages == 1 and mm == (297, 420), f"prints as {pages} page(s) of {mm} mm")
    check(not errors, f"no JavaScript errors ({errors})")
    check(not net, f"no network requests ({net})")
    browser.close()

print("RESULT:", "PASS" if not fails else f"FAIL ({len(fails)})")
sys.exit(1 if fails else 0)
