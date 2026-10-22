"""Static checks for design/clickable-screens/index.html (Python standard library only).

Draft prepared with AI assistance for the Designer; to be reviewed and edited by the team.

Checks:
1. Every navigation/reference target id exists (data-go, data-return, aria-controls,
   aria-labelledby, href="#...", <use href="#...">).
2. Every data-i18n key exists in all four languages, and no language has extra or empty keys.
3. No external network resources (http/https URLs in src/href, @import, url()).
4. Colour-token contrast ratios for the text pairs used on the screens.
Run: python3 check_static.py [path/to/index.html]
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

path = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent / "index.html")
src = path.read_text(encoding="utf-8")


class Collector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.refs, self.i18n, self.urls = set(), [], set(), []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        for key in ("data-go", "data-return", "aria-controls", "aria-labelledby"):
            if a.get(key):
                for ref in a[key].split():
                    self.refs.append((tag, key, ref))
        href = a.get("href") or ""
        if href.startswith("#") and len(href) > 1:
            self.refs.append((tag, "href", href[1:]))
        if a.get("data-i18n"):
            self.i18n.add(a["data-i18n"])
        for key in ("src", "href"):
            v = a.get(key) or ""
            if re.match(r"^(https?:)?//", v):
                self.urls.append((tag, key, v))

    handle_startendtag = handle_starttag


c = Collector()
c.feed(src)
fails = 0

missing = [r for r in c.refs if r[2] not in c.ids]
print(f"[1] {len(c.refs)} id references checked; missing targets: {len(missing)}")
for m in missing:
    print("    MISSING", m)
fails += len(missing)

# Parse the I18N object: blocks "  en: {", "  zh: {" ... with key: "value" pairs.
blocks = re.split(r"\n\s{4}(en|zh|ms|ta): \{", src.split("var I18N = {", 1)[1].split("var HTML_LANG", 1)[0])
langs = {}
for i in range(1, len(blocks), 2):
    langs[blocks[i]] = dict(re.findall(r'(\w+): "((?:[^"\\]|\\.)*)"', blocks[i + 1]))
en_keys = set(langs["en"])
print(f"[2] languages: {sorted(langs)}; {len(en_keys)} keys in en; {len(c.i18n)} data-i18n keys used in HTML")
for code, d in langs.items():
    miss = (en_keys | c.i18n) - set(d)
    extra = set(d) - en_keys
    empty = [k for k, v in d.items() if not v.strip()]
    same = sorted(k for k in d if code != "en" and d[k] == langs["en"].get(k))
    status = "OK" if not (miss or extra or empty) else "FAIL"
    print(f"    {code}: {status} missing={sorted(miss)} extra={sorted(extra)} empty={empty} identical-to-en={same}")
    fails += len(miss) + len(extra) + len(empty)
dynamic = {"qCount", "q1", "q2", "q3", "noVoice", "choiceHung", "callingWJ", "proto", "endCall"}
unused = en_keys - c.i18n - dynamic
print(f"    keys neither in HTML nor used by script: {sorted(unused)}")

ext = c.urls + re.findall(r"@import|url\((?!['\"]?data:)", src)
print(f"[3] external resources: {len(ext)}")
for e in ext:
    print("    EXTERNAL", e)
fails += len(ext)


def lum(h):
    h = h.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    f = lambda v: v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def ratio(a, b):
    hi, lo = sorted((lum(a), lum(b)), reverse=True)
    return (hi + 0.05) / (lo + 0.05)


tok = dict(re.findall(r"--([\w-]+):\s*(#[0-9A-Fa-f]{6})", src.split(":root", 1)[1].split("}", 1)[0]))
pairs = [
    ("ink", "screen-bg", 4.5, "body text on senior screens"),
    ("muted", "screen-bg", 4.5, "secondary text"),
    ("white", "teal", 4.5, "Pause & Verify button, Done"),
    ("white", "indigo", 4.5, "Check a message button"),
    ("white", "green", 4.5, "call buttons"),
    ("white", "ink", 4.5, "Yes button, OK"),
    ("risk-ink", "risk-bg", 4.5, "High risk card, red flags"),
    ("white", "red", 4.5, "Hang up, End call"),
    ("ink", "amber", 4.5, "Practice call label, drill pause button"),
    ("white", "dark", 4.5, "practice call text"),
    ("pale", "dark", 4.5, "practice call secondary text"),
    ("ok-ink", "ok-bg", 4.5, "No warning signs card"),
    ("ok-ink", "screen-bg", 4.5, "This stayed on your phone"),
    ("white", "slate", 4.5, "messaging header"),
    ("ink", "chat-bg", 4.5, "chat text"),
    ("muted", "chat-bg", 4.5, "chat secondary text"),
    ("muted", "white", 4.5, "notification and bubble time"),
    ("ink", "page-bg", 4.5, "presenter page text"),
    ("muted", "page-bg", 4.5, "presenter notes"),
    ("focus", "screen-bg", 3.0, "focus ring on light screens (non-text)"),
    ("focus", "page-bg", 3.0, "focus ring on presenter page (non-text)"),
    ("focus", "chat-bg", 3.0, "focus ring on guardian screen (non-text)"),
]
print("[4] contrast (WCAG 2.x relative luminance)")
for fg, bg, need, what in pairs:
    r = ratio(tok[fg], tok[bg])
    ok = r >= need
    fails += 0 if ok else 1
    print(f"    {r:5.2f}:1 {'PASS' if ok else 'FAIL'} (min {need}) {fg} {tok[fg]} on {bg} {tok[bg]} - {what}")
r = ratio("#FFD24A", tok["dark"])
print(f"    {r:5.2f}:1 {'PASS' if r >= 3 else 'FAIL'} (min 3.0) focus #FFD24A on dark {tok['dark']} - focus ring on practice/calling screens")

print("RESULT:", "PASS" if fails == 0 else f"FAIL ({fails} problems)")
sys.exit(1 if fails else 0)
