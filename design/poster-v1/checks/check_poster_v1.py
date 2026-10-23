"""Checks for design/poster-v1/index.html (local Playwright + Chromium; downloads nothing).

Draft prepared with AI assistance for the Designer; to be reviewed and edited by the team.

Run from anywhere:  python3 check_poster_v1.py [--words-only] [--shot poster.png]
  --words-only   only the static checks and the per-zone word count (no browser)
  --shot FILE    also save a PNG of the poster at screen size

Counting rule (same as the wireframe README): every printed word in the page's HTML, including
headings, labels, stat labels, reference markers like [1], the sources strip and the AI note.
A "word" is any whitespace-separated token with a letter or digit in it ("&", "·", "→" are not words).
Not counted: the QR box (data-nocount), CSS-generated zone/layer numbers, and the text inside the
embedded diagram crops (reported separately from data-diagram-words, counted by hand).
"""
import hashlib
import re
import sys
import tempfile
from html.parser import HTMLParser
from pathlib import Path

here = Path(__file__).resolve().parent.parent
page_path = here / "index.html"
src = page_path.read_text(encoding="utf-8")
BUDGET = [11, 30, 22, 30, 28, 13, 22, 24, 24, 24, 48]   # wireframe budgets, zones 1-11 (total 276)
LIMIT = 276
fails = []


def check(cond, msg):
    print(("  PASS " if cond else "  FAIL ") + msg)
    if not cond:
        fails.append(msg)


class Counter(HTMLParser):
    VOID = {"img", "br", "meta", "link", "input", "hr"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.zone = [], None
        self.words, self.ph, self.diag, self.skip = {}, {}, {}, 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in self.VOID:
            return
        self.stack.append((tag, a, self.zone))
        if tag == "section" and "data-zone" in a:
            self.zone = int(a["data-zone"])
            self.words.setdefault(self.zone, 0); self.ph.setdefault(self.zone, 0)
        if tag in ("script", "style") or "data-nocount" in a:
            self.skip += 1
        if "data-diagram-words" in a and self.zone:
            self.diag[self.zone] = self.diag.get(self.zone, 0) + int(a["data-diagram-words"])

    def handle_endtag(self, tag):
        if tag in self.VOID or not self.stack:
            return
        t, a, z = self.stack.pop()
        if t in ("script", "style") or "data-nocount" in a:
            self.skip -= 1
        if t == "section" and "data-zone" in a:
            self.zone = None

    def handle_data(self, data):
        if self.zone is None or self.skip:
            return
        n = sum(1 for tok in data.split() if re.search(r"[A-Za-z0-9]", tok))
        self.words[self.zone] += n
        if any("data-placeholder" in a for _, a, _ in self.stack):
            self.ph[self.zone] += n


print("[1] static")
ext = re.findall(r'(?:src|href)="(?:https?:)?//[^"]+"', src) + re.findall(r"@import|url\((?!['\"]?data:)", src)
check(not ext, f"no external resources in the page ({ext})")
check("Draft prepared with AI assistance for the Designer" in src, "draft note present")
check(re.search(r"@page\s*\{\s*size:\s*A3 portrait", src) is not None, "@page sets A3 portrait")
for name in ("architecture.png", "guardian-alert-flow.png"):
    mine, orig = here / name, here.parent.parent / "docs" / "diagrams" / name
    same = mine.exists() and orig.exists() and hashlib.sha256(mine.read_bytes()).digest() == hashlib.sha256(orig.read_bytes()).digest()
    check(same, f"{name} is an unmodified copy of docs/diagrams/{name}")
check(len(re.findall(r'<section class="zone z\d+" data-zone="\d+"', src)) == 11, "11 zones in the HTML")

print("[2] words per zone (strict HTML text; wireframe budget in brackets)")
c = Counter(); c.feed(src)
total = sum(c.words.values())
for z in range(1, 12):
    extra = f", {c.ph[z]} placeholder" if c.ph[z] else ""
    dg = f", +{c.diag[z]} inside diagram crop" if z in c.diag else ""
    print(f"   zone {z:2d}: {c.words[z]:3d} words [{BUDGET[z-1]}]{extra}{dg}")
print(f"   TOTAL: {total} words (limit {LIMIT}); placeholders {sum(c.ph.values())}; diagram text {sum(c.diag.values())}")
check(total <= LIMIT, f"body text {total} <= {LIMIT} words")
check(not re.search(r"\bsafe\b(?!”)", re.sub(r"“safe”", "", src.split("<article")[1].split("</article>")[0], flags=re.I)),
      'the poster never says "safe" except in quotes as the level we refuse to give')
if "--words-only" in sys.argv:
    print("RESULT:", "PASS" if not fails else f"FAIL ({len(fails)})")
    sys.exit(1 if fails else 0)

from playwright.sync_api import sync_playwright

JS_CONTRAST = """() => {
  const parse = c => { const m = c.match(/rgba?\\(([^)]+)\\)/)[1].split(',').map(Number); return {r: m[0], g: m[1], b: m[2], a: m.length > 3 ? m[3] : 1}; };
  const lin = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const L = c => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  const over = (f, b) => ({r: f.r * f.a + b.r * (1 - f.a), g: f.g * f.a + b.g * (1 - f.a), b: f.b * f.a + b.b * (1 - f.a), a: 1});
  const bgOf = el => { let layers = []; for (let e = el; e; e = e.parentElement) { const c = parse(getComputedStyle(e).backgroundColor); if (c.a > 0) layers.push(c); if (c.a === 1) break; }
    let base = {r: 255, g: 255, b: 255, a: 1}; for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base); return base; };
  const out = [];
  document.querySelectorAll('#poster *').forEach(el => {
    const own = [...el.childNodes].some(n => n.nodeType === 3 && /[A-Za-z0-9]/.test(n.textContent));
    if (!own) return;
    const fg = over(parse(getComputedStyle(el).color), bgOf(el)), bg = bgOf(el);
    const a = L(fg), b = L(bg), ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    out.push([Math.round(ratio * 100) / 100, el.textContent.trim().slice(0, 40)]);
  });
  out.sort((x, y) => x[0] - y[0]); return out; }"""

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1300, "height": 1700})
    net, errors = [], []
    ctx.route("**/*", lambda r: (net.append(r.request.url), r.abort()) if not r.request.url.startswith(("file:", "data:")) else r.continue_())
    page = ctx.new_page()
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(page_path.as_uri())
    page.wait_for_timeout(300)
    page.evaluate("() => window.posterRefit()")

    print("[3] layout (browser)")
    st = page.evaluate("() => window.posterState()")
    check(st["overflow"] == [], f"no zone overflows (overflowing: {st['overflow']})")
    check(st["bodyPt"] >= 12, f"largest body size that fits: {st['bodyPt']} pt (floor 12 pt)")
    print(f"   INFO decision 12 asks for 20 pt body; this content fits at {st['bodyPt']} pt")
    w, h = page.evaluate("() => [poster.offsetWidth, poster.offsetHeight]")
    check(abs(h / w - 420 / 297) < 0.002, f"A3 portrait aspect {w} x {h} px")
    zr = page.evaluate("() => [...document.querySelectorAll('.zone')].map(z => { const r = z.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.left)]; })")
    check(zr == sorted(zr), "visual order (top to bottom, then left to right) matches zones 1-11")
    imgs = page.evaluate("() => [...document.images].map(i => i.complete && i.naturalWidth > 0)")
    check(all(imgs) and len(imgs) == 2, f"both diagram images load ({imgs})")

    print("[4] contrast (computed styles, all text)")
    rows = page.evaluate(JS_CONTRAST)
    low = [r for r in rows if r[0] < 4.5]
    print(f"   {len(rows)} text elements; lowest ratios: {rows[:4]}")
    check(not low, f"every text element >= 4.5:1 (failing: {low})")

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
    if "--shot" in sys.argv:
        out = sys.argv[sys.argv.index("--shot") + 1]
        page.locator("#poster").screenshot(path=out)
        print("   screenshot:", out)
    browser.close()

print("RESULT:", "PASS" if not fails else f"FAIL ({len(fails)})")
sys.exit(1 if fails else 0)
