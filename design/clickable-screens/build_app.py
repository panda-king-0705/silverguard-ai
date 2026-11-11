import sys
src, dst = sys.argv[1], sys.argv[2]
s = open(src, encoding='utf-8').read()
def rep(a, b, count=1):
    global s
    assert a in s, a[:60]
    s = s.replace(a, b, count)

rep('<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="theme-color" content="#FFFBF4">')
rep('<title>SilverGuard Clickable Screens</title>', '<title>SilverGuard Prototype</title>')
css = r'''
/* ---------- app mode: full-screen on the visitor's own phone ---------- */
body.app { background: #2A2D31; overflow: hidden; }
body.app .top, body.app .controls, body.app .caption { display: none !important; }
body.app .layout { display: block; padding: 0; max-width: none; margin: 0; }
body.app .stage { display: block; }
body.app .phone-scaler { width: auto !important; height: auto !important; }
body.app .phone {
  position: fixed; inset: 0; width: 100%; height: 100%; height: 100dvh;
  border: 0; border-radius: 0; box-shadow: none; transform: none !important;
  display: flex; flex-direction: column; background: var(--screen-bg);
}
body.app .statusbar { display: none; }
body.app .screen-area { flex: 1; height: auto; min-height: 0; }
body.app .screen { padding-top: max(18px, env(safe-area-inset-top)); }
@media (min-width: 600px) {
  body.app .phone { left: 50%; width: 430px; margin-left: -215px; top: 2vh; height: 96vh; border-radius: 28px; box-shadow: 0 18px 40px rgba(0,0,0,.4); overflow: hidden; }
}
.appbar { display: none; }
body.app .appbar {
  display: grid; grid-template-columns: 1fr 1fr auto; gap: 8px; flex: none;
  padding: 8px 10px calc(8px + env(safe-area-inset-bottom)); background: var(--white);
  border-top: 2px solid var(--line);
}
.appbar button {
  min-height: 52px; border-radius: 12px; border: 2px solid var(--ink); background: var(--white);
  font-size: 17px; font-weight: 700; padding: 4px 10px; line-height: 1.15;
}
.appbar button[aria-current="true"] { background: var(--ink); color: var(--white); }
.appbar .langbtn { min-width: 64px; }
.big.dr { background: var(--dark); }
body.app .home-buttons { flex: none; gap: 12px; }
body.app .big { flex: none; min-height: 128px; padding: 16px 18px; }
body.app .big svg { font-size: 40px; margin-bottom: 6px; }
body.app .big .main { font-size: 28px; }
body.app .big .sub { font-size: 20px; }
.intro { position: fixed; inset: 0; z-index: 50; background: rgba(20,35,43,.72); display: grid; place-items: center; padding: 16px; overflow-y: auto; }
.intro .card { margin: auto 0; }
@media (max-height: 620px) { .intro .card { font-size: 17px; gap: 8px; padding: 16px; } .intro h2 { font-size: 22px; } }
.intro[hidden] { display: none; }
.intro .card { background: var(--screen-bg); color: var(--ink); border-radius: 20px; padding: 22px 20px; max-width: 380px; font-size: 19px; line-height: 1.45; display: grid; gap: 12px; }
.intro h2 { margin: 0; font-size: 26px; color: var(--teal); }
.intro p { margin: 0; }
.intro ul { margin: 0; padding-left: 20px; }
'''
rep('</style>', css + '</style>')
rep('<body>', '<body class="app">') if '<body>' in s else None
# home: third button for the Family Drill
rep('''  </div>
  <p class="guardian-line">''', '''    <button type="button" class="big dr" data-go="s-drill">
      <svg class="i" aria-hidden="true"><use href="#i-practice"/></svg>
      <span class="main" data-i18n="practiceCall">Practice call</span>
      <span class="sub" data-i18n="drillSub">Family Drill</span>
    </button>
  </div>
  <p class="guardian-line">''')
# bottom bar inside the phone
rep('''        </div>
      </div>
    </div>
    <p class="caption"''', '''        </div>
        <nav class="appbar" aria-label="Switch phone">
          <button type="button" data-go="s-home" data-tab="mum" aria-current="true">Mum's phone</button>
          <button type="button" data-go="s-guardian" data-tab="marcus" aria-current="false">Marcus's phone</button>
          <button type="button" class="langbtn" data-action="cycle-lang" aria-label="Change language">EN</button>
        </nav>
      </div>
    </div>
    <p class="caption"''')
# intro card
rep('<script>\n(function () {', '''<div class="intro" id="intro" role="dialog" aria-modal="true" aria-labelledby="intro-h">
  <div class="card">
    <h2 id="intro-h">Try SilverGuard</h2>
    <p>This is a clickable prototype of our app for seniors. Tap the big buttons to try it.</p>
    <ul>
      <li><b>Mum's phone</b>: Pause &amp; Verify, Scam Check and a practice scam call.</li>
      <li><b>Marcus's phone</b>: the alert her son gets when an unknown number rings her.</li>
    </ul>
    <p class="small">Prototype only: no calls are made and nothing leaves your phone. Names and numbers are made up.</p>
    <button type="button" class="btn primary" data-action="intro-close">Start</button>
  </div>
</div>
<script>
(function () {''')
# extra i18n + tab + lang cycling
rep('  var SIX = [', '''  I18N.en.drillSub = "Family Drill";
  if (I18N.zh) I18N.zh.drillSub = "家庭演练";
  if (I18N.ms) I18N.ms.drillSub = "Latihan Keluarga";
  if (I18N.ta) I18N.ta.drillSub = "குடும்பப் பயிற்சி";
  var LANGS = ["en", "zh", "ms", "ta"], LANG_LABEL = { en: "EN", zh: "中文", ms: "BM", ta: "தமிழ்" };
  var SIX = [''')
rep('''    var c = CAPTIONS[id];''', '''    var marcus = id === "s-guardian" || (id === "s-calling" && callWho === "mum");
    document.querySelectorAll(".appbar [data-tab]").forEach(function (b) {
      b.setAttribute("aria-current", String((b.getAttribute("data-tab") === "marcus") === marcus));
    });
    var c = CAPTIONS[id];''')
rep('''      case "speak":''', '''      case "cycle-lang":
        lang = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
        try { localStorage.setItem("sg-proto-lang", lang); } catch (err) { /* storage unavailable */ }
        applyLang(); a.textContent = LANG_LABEL[lang]; break;
      case "intro-close":
        $("intro").hidden = true;
        try { sessionStorage.setItem("sg-intro-seen", "1"); } catch (err) { /* ignore */ }
        var hh = $(current).querySelector("h2[tabindex='-1']"); if (hh) hh.focus({ preventScroll: true });
        break;
      case "speak":''')
rep('''    var phone = $("phone"), scaler = $("scaler"), W = 414, H = 868, s = 1;''', '''    var phone = $("phone"), scaler = $("scaler"), W = 414, H = 868, s = 1;
    if (document.body.classList.contains("app")) { phone.style.transform = ""; scaler.style.width = ""; scaler.style.height = ""; return; }''')
rep('''  applyLang();
  go("s-home", false);''', '''  applyLang();
  document.querySelector(".appbar .langbtn").textContent = LANG_LABEL[lang] || "EN";
  try { if (sessionStorage.getItem("sg-intro-seen")) $("intro").hidden = true; } catch (err) { /* ignore */ }
  go("s-home", false);''')
open(dst, 'w', encoding='utf-8').write(s)
print("ok", len(s))
