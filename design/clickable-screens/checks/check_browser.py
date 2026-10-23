"""Headless browser checks for design/clickable-screens/index.html (uses a locally installed Playwright + Chromium; no downloads).

Draft prepared with AI assistance for the Designer; to be reviewed and edited by the team.

Run: python3 check_browser.py [path/to/index.html] [screenshot_dir]
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

page_path = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent / "index.html").resolve()
shot_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else None
fails = []


def check(cond, msg):
    print(("  PASS " if cond else "  FAIL ") + msg)
    if not cond:
        fails.append(msg)


AUDIT_JS = r"""
() => {
  function lum(rgb){const f=c=>{c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4)};return 0.2126*f(rgb[0])+0.7152*f(rgb[1])+0.0722*f(rgb[2]);}
  function parse(c){const m=c.match(/rgba?\(([^)]+)\)/);if(!m)return null;const p=m[1].split(',').map(Number);return {rgb:p.slice(0,3),a:p.length>3?p[3]:1};}
  function bgOf(el){while(el){const c=parse(getComputedStyle(el).backgroundColor);if(c&&c.a>0.5)return c.rgb;el=el.parentElement;}return [255,255,255];}
  const screen=[...document.querySelectorAll('.screen')].find(s=>!s.hidden);
  const out={screen:screen.id,lang:screen.getAttribute('lang'),small:[],lowContrast:[],shortButtons:[],hOverflow:screen.scrollWidth>screen.clientWidth+1,vOverflow:screen.scrollHeight>screen.clientHeight+1,minFont:99,minRatio:99,minBtn:999};
  const walker=document.createTreeWalker(screen,NodeFilter.SHOW_TEXT);
  let n;
  while((n=walker.nextNode())){
    const el=n.parentElement; if(!n.textContent.trim())continue;
    if(el.closest('.visually-hidden'))continue;
    const r=el.getBoundingClientRect(); if(!r.width||!r.height||el.closest('[hidden]'))continue;
    const cs=getComputedStyle(el); const fs=parseFloat(cs.fontSize);
    out.minFont=Math.min(out.minFont,fs);
    if(fs<20)out.small.push([n.textContent.trim().slice(0,30),fs]);
    const fg=parse(cs.color).rgb, bg=bgOf(el); const L1=lum(fg),L2=lum(bg);
    const ratio=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
    out.minRatio=Math.min(out.minRatio,ratio);
    if(ratio<4.5)out.lowContrast.push([n.textContent.trim().slice(0,30),ratio.toFixed(2)]);
  }
  for(const b of screen.querySelectorAll('button')){
    if(b.closest('[hidden]'))continue; const h=b.offsetHeight; if(!h)continue; // layout height, unaffected by the fit-to-window scale
    out.minBtn=Math.min(out.minBtn,h);
    if(h<64)out.shortButtons.push([b.textContent.trim().slice(0,30),h]);
  }
  return out;
}
"""


def visible(page):
    return page.evaluate("() => [...document.querySelectorAll('.screen')].find(s => !s.hidden).id")


with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1280, "height": 1000})
    external = []
    ctx.route("**/*", lambda route: (external.append(route.request.url), route.abort()) if not route.request.url.startswith(("file:", "data:")) else route.continue_())
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(page_path.as_uri())

    print("[1] click-through flows")
    page.click("#s-home .big.pv"); check(visible(page) == "s-pv", "home -> Is this really them? -> Pause & Verify")
    q1 = page.inner_text("#pv-q"); check(q1 == "Did they ask for money?", f"question 1 shown: {q1!r}")
    page.click("#pv-question [data-action=pv-no]"); check(page.inner_text("#pv-q") == "Did they say it's urgent or secret?", "No -> question 2")
    page.click("#pv-question [data-action=pv-no]"); check(page.inner_text("#pv-q") == "Are they calling from a new number?", "No -> question 3")
    page.click("#pv-question [data-action=pv-yes]")
    check(page.is_visible("#pv-call") and "Call Wei Jie now" in page.inner_text("#pv-call") and "•••• 4821" in page.inner_text("#pv-call"), "Yes -> one big 'Call Wei Jie now' with masked saved number")
    page.click("#pv-call [data-action=call]"); check(visible(page) == "s-calling" and page.inner_text("#h-calling") == "Calling Wei Jie…", "Call Wei Jie now -> calling state")
    page.click("[data-action=end-call]"); check(visible(page) == "s-home", "End call -> home")
    page.click("#s-home .big.pv")
    for _ in range(3):
        page.click("#pv-question [data-action=pv-no]")
    check(page.is_visible("#pv-clear") and "No warning signs found" in page.inner_text("#pv-clear"), "three No answers -> 'No warning signs found' (never 'safe')")
    page.click("#pv-clear [data-action=pv-restart]"); check(page.inner_text("#pv-q") == "Did they ask for money?", "Start again -> question 1")
    page.click("#s-pv .back"); check(visible(page) == "s-home", "Home button -> home")
    page.click("#s-home .big.sc"); check(visible(page) == "s-check", "home -> Check a message -> Scam Check result")
    txt = page.inner_text("#s-check")
    for s in ["High risk", "They asked you to send money", "They asked you to keep it secret", "They said they have a new number", "Call Wei Jie", "Report to ScamShield", "This stayed on your phone"]:
        check(s in txt, f"Scam Check shows {s!r}")
    check(page.locator("#s-check .risk svg").count() == 1, "High risk has an icon as well as colour and words")
    page.click("[data-action=report-open]"); check(page.is_visible("#report-sheet"), "Report to ScamShield -> explanation sheet (no link, no logo)")
    page.click("[data-action=report-close]"); check(not page.is_visible("#report-sheet"), "OK closes the sheet")
    page.click("#check-actions [data-action=call]"); page.click("[data-action=end-call]"); check(visible(page) == "s-check", "Call Wei Jie -> calling -> back to result")
    page.click(".picker [data-go=s-drill]"); check(visible(page) == "s-drill" and "Practice call" in page.inner_text("#s-drill"), "picker -> Family Drill labelled 'Practice call'")
    page.click("[data-action=drill-hangup]"); check(visible(page) == "s-debrief" and page.inner_text("#debrief-choice") == "You hung up.", "Hang up -> debrief")
    dtxt = page.inner_text("#s-debrief")
    check("Well done for pausing" in dtxt and "3 drills this month" in dtxt and "A new number" in dtxt, "debrief: praise, red flags, progress")
    page.click("#s-debrief [data-go=s-drill]"); page.click("[data-action=drill-pause]")
    check(visible(page) == "s-debrief" and "Is this really them?" in page.inner_text("#debrief-choice"), "Is this really them? (drill) -> debrief")
    page.click("#s-debrief [data-go=s-home]"); check(visible(page) == "s-home", "Done -> home")
    page.keyboard.press("6"); check(visible(page) == "s-guardian", "key 6 -> guardian's phone")
    gtxt = page.inner_text("#s-guardian")
    check("Unknown number rang Mum at 10:42. She can still answer. Please call her before any money moves." in gtxt and "Call Mum" in gtxt, "guardian chat bubble text and Call Mum button")
    page.click("#s-guardian [data-action=call]"); check(page.inner_text("#h-calling") == "Calling Mum…", "Call Mum -> calling Mum")
    page.click("[data-action=end-call]"); check(visible(page) == "s-guardian", "End call -> back to guardian")
    check(page.locator("#s-guardian [data-go=s-home]").count() == 0, "Guardian screen has no link to Mum's screen")
    for i, sid in enumerate(["s-home", "s-pv", "s-check", "s-drill", "s-debrief", "s-guardian"], 1):
        page.click(f".picker [data-go={sid}]")
        check(visible(page) == sid and page.get_attribute(f".picker [data-go={sid}]", "aria-current") == "true", f"picker {i} -> {sid}")

    print("[2] language toggle")
    expected = {"en": "Is this really them?", "zh": "真的是本人吗？", "ms": "Betulkah ini mereka?", "ta": "இது உண்மையில் அவர்களா?"}
    page.click(".picker [data-go=s-home]")
    for code, want in expected.items():
        page.click(f"[data-lang={code}]")
        got = page.inner_text("#s-home .big.pv .main")
        check(got == want and page.get_attribute("#s-home", "lang") == {"en": "en", "zh": "zh-Hans", "ms": "ms", "ta": "ta"}[code], f"{code}: home button reads {got!r}, lang attribute set")
        page.click(".picker [data-go=s-check]")
        check(page.inner_text("#s-check .level") != "High risk" or code == "en", f"{code}: risk level text changes ({page.inner_text('#s-check .level')!r})")
        page.click(".picker [data-go=s-home]")
    check(page.get_attribute("#s-guardian", "lang") == "en", "guardian screen stays English")

    print("[3] size, contrast and overflow audit in every language and state")
    states = [("s-home", None), ("s-pv", None), ("s-pv", "yes"), ("s-pv", "clear"), ("s-check", None), ("s-check", "report"),
              ("s-drill", None), ("s-debrief", None), ("s-guardian", None), ("s-calling", None)]
    worst = {"minFont": 99, "minRatio": 99, "minBtn": 999}
    overflow = []
    for code in ["en", "zh", "ms", "ta"]:
        page.click(f"[data-lang={code}]")
        for sid, sub in states:
            if sid == "s-calling":
                page.click(".picker [data-go=s-check]"); page.click("#check-actions [data-action=call]")
            else:
                page.click(f".picker [data-go={sid}]")
            if sub == "yes":
                page.click("#pv-question [data-action=pv-yes]")
            elif sub == "clear":
                for _ in range(3):
                    page.click("#pv-question [data-action=pv-no]")
            elif sub == "report":
                page.click("[data-action=report-open]")
            r = page.evaluate(AUDIT_JS)
            label = f"{code} {sid}{'/' + sub if sub else ''}"
            for k in worst:
                worst[k] = min(worst[k], r[k])
            if r["small"] or r["lowContrast"] or r["shortButtons"] or r["hOverflow"]:
                check(False, f"{label}: small={r['small']} lowContrast={r['lowContrast']} shortButtons={r['shortButtons']} hOverflow={r['hOverflow']}")
            if r["vOverflow"]:
                overflow.append(label)
            if shot_dir and ((code == "en") or (code == "ta" and sid in ("s-home", "s-pv", "s-check"))):
                shot_dir.mkdir(parents=True, exist_ok=True)
                page.locator("#phone").screenshot(path=str(shot_dir / f"{code}-{sid}{'-' + sub if sub else ''}.png"))
    check(worst["minFont"] >= 20, f"smallest text inside the phone: {worst['minFont']}px (needs >= 20)")
    check(worst["minBtn"] >= 64, f"shortest button inside the phone: {worst['minBtn']}px (needs >= 64)")
    check(worst["minRatio"] >= 4.5, f"lowest computed text contrast inside the phone: {worst['minRatio']:.2f}:1 (needs >= 4.5)")
    print(f"  INFO screens that scroll vertically (content taller than 804px): {overflow or 'none'}")

    print("[4] keyboard and focus")
    page.click("[data-lang=en]")
    page.click(".picker [data-go=s-home]")
    page.focus("#h-home")
    seen = []
    for _ in range(6):
        page.keyboard.press("Tab")
        seen.append(page.evaluate("() => document.activeElement.textContent.trim().replace(/\\s+/g,' ').slice(0,40)"))
    check(any("Is this really them?" in s for s in seen) and any("Check a message" in s for s in seen), f"Tab reaches both home buttons: {seen[:3]}")
    page.focus("#h-home"); page.keyboard.press("Tab")
    fe = page.evaluate("() => { const s = getComputedStyle(document.activeElement); return [document.activeElement.textContent.trim().slice(0,25), s.outlineStyle, s.outlineWidth, s.outlineColor]; }")
    check(fe[1] == "solid" and float(fe[2].replace("px", "")) >= 3, f"visible focus ring on keyboard focus: {fe}")
    page.keyboard.press("Enter")
    check(visible(page) == "s-pv", f"Enter on the focused 'Is this really them?' button opens {visible(page)}")

    print("[5] reduced motion and errors")
    rm = browser.new_context(reduced_motion="reduce", viewport={"width": 1280, "height": 1000})
    p2 = rm.new_page(); p2.goto(page_path.as_uri())
    anim = p2.evaluate("() => getComputedStyle(document.querySelector('#s-home')).animationName")
    p2.click("#s-home .big.pv"); p2.click("#pv-question [data-action=pv-yes]"); p2.click("#pv-call [data-action=call]")
    ring = p2.evaluate("() => getComputedStyle(document.querySelector('.ring')).animationName")
    check(anim == "none" and ring == "none", f"prefers-reduced-motion: screen animation={anim}, ring animation={ring}")
    check(not errors, f"no JavaScript errors ({errors})")
    check(not external, f"no network requests other than the file itself ({external})")

    print("[6] small window: phone scales to fit")
    small = browser.new_context(viewport={"width": 1366, "height": 768})
    p3 = small.new_page(); p3.goto(page_path.as_uri())
    box = p3.locator("#phone").bounding_box()
    check(box["y"] + box["height"] <= 768 + 1, f"on 1366x768 the phone fits the window (bottom at {box['y'] + box['height']:.0f}px)")
    mob = browser.new_context(viewport={"width": 390, "height": 844})
    p4 = mob.new_page(); p4.goto(page_path.as_uri())
    sw = p4.evaluate("() => document.documentElement.scrollWidth")
    check(sw <= 390, f"no horizontal page scroll at 390px wide (scrollWidth {sw})")
    browser.close()

print("RESULT:", "PASS" if not fails else f"FAIL ({len(fails)})")
sys.exit(1 if fails else 0)
