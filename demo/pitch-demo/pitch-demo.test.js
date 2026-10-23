/*
 * Draft prepared with AI assistance for Dev 2; to be reviewed and edited by the team.
 *
 * Tests for the combined pitch demo (DEV2-3). Run: node --test   (Node 18 or later)
 *  1. The copies of engine.js, alert.js and scamcheck-alert.js inside index.html match the sources.
 *  2. The page is offline, has big type and big buttons, and never stores anything.
 *  3. The Scam Check alert never contains the pasted message.
 *  4. The page script works end to end in a minimal fake DOM (mock mode and live mode with a mocked fetch).
 * No network is used. No bot token is used: the tests use a made-up string.
 */
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');

const build = require('./build.js');
const S = require('./scamcheck-alert.js');
const engine = require('../scam-check-web/engine.js');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

/** Text between /* NAME:START *\/ and /* NAME:END *\/ in the page (independent of build.js). */
function embeddedBlock(name) {
  const start = '/* ' + name + ':START */\n';
  const end = '/* ' + name + ':END */';
  const a = html.indexOf(start);
  assert.notEqual(a, -1, name + ' start marker missing');
  assert.equal(html.indexOf(start, a + 1), -1, name + ' start marker appears twice');
  const b = html.indexOf(end, a);
  assert.notEqual(b, -1, name + ' end marker missing');
  return html.slice(a + start.length, b);
}

/** The page with the three embedded libraries removed: only the page's own HTML, CSS and script. */
function ownPart() {
  let s = html;
  for (const src of build.SOURCES) {
    const m = build.markers(src.name);
    const a = s.indexOf(m.start);
    const b = s.indexOf(m.end);
    s = s.slice(0, a) + s.slice(b + m.end.length);
  }
  return s;
}

// ---------------------------------------------------------------------------------------------
// 1. Embedded copies match the sources
// ---------------------------------------------------------------------------------------------

for (const src of build.SOURCES) {
  test('index.html embeds an exact copy of ' + path.basename(src.file) + ' (run "node build.js" if this fails)', () => {
    const source = fs.readFileSync(src.file, 'utf8');
    const expected = source.endsWith('\n') ? source : source + '\n';
    assert.equal(embeddedBlock(src.name), expected);
  });
}

test('build.js --check agrees that index.html is up to date', () => {
  const r = spawnSync(process.execPath, [path.join(__dirname, 'build.js'), '--check'], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

test('embedding is idempotent', () => {
  assert.equal(build.embed(html, build.SOURCES), html);
});

test('build.js refuses a source that would break the inline script', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pitch-demo-'));
  try {
    const bad = path.join(dir, 'bad.js');
    fs.writeFileSync(bad, 'var a = "</script>";\n');
    assert.throws(() => build.embeddedText(bad), /would break the inline/);
    const comment = path.join(dir, 'comment.js');
    fs.writeFileSync(comment, 'var a = "<!--";\n');
    assert.throws(() => build.embeddedText(comment), /would break the inline/);
    const noNewline = path.join(dir, 'ok.js');
    fs.writeFileSync(noNewline, 'var a = 1; // last line');
    assert.equal(build.embeddedText(noNewline), 'var a = 1; // last line\n');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('every inline script in the page is valid JavaScript', () => {
  const re = /<script>([\s\S]*?)<\/script>/g;
  let m; let n = 0;
  while ((m = re.exec(html)) !== null) { n++; assert.doesNotThrow(() => new vm.Script(m[1])); }
  assert.equal(n, 4);
});

// ---------------------------------------------------------------------------------------------
// 2. Offline, big type, big buttons, nothing stored
// ---------------------------------------------------------------------------------------------

test('page loads nothing from outside: no CDN, link, image, iframe, import or web address', () => {
  // Checked on the page's own HTML, CSS and script. The copied libraries only mention these words in comments.
  const own = ownPart();
  assert.doesNotMatch(own, /<script[^>]*\ssrc=/i);
  assert.doesNotMatch(own, /<link[\s>]/i);
  assert.doesNotMatch(own, /<img[\s>]/i);
  assert.doesNotMatch(own, /<iframe[\s>]/i);
  assert.doesNotMatch(own, /@import/i);
  assert.doesNotMatch(own, /url\(/i);
  assert.doesNotMatch(own, /https?:\/\//i);
  // The copied libraries must not load anything either.
  const libs = build.SOURCES.map((s) => embeddedBlock(s.name)).join('\n');
  assert.doesNotMatch(libs, /importScripts|\bimport\s*\(|XMLHttpRequest|WebSocket/);
});

test('the only web address in the whole page is the Telegram Bot API used by alert.js', () => {
  const urls = html.match(/https?:\/\/[^\s'"`)<>]+/g) || [];
  const unexpected = urls.filter((u) => !/^https:\/\/(api\.telegram\.org|core\.telegram\.org|developer\.)/.test(u));
  assert.deepEqual(unexpected, []);
});

test('no logos or third-party brand names in the page itself', () => {
  assert.doesNotMatch(ownPart(), /scamshield|\bdbs\b|ocbc|\buob\b|paylah/i);
  assert.doesNotMatch(html, /<svg[^>]*>\s*<image/i);
});

test('type is at least 20px and every button is at least 64px tall', () => {
  const css = html.match(/<style>([\s\S]*?)<\/style>/)[1];
  const sizes = [...css.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g)].map((m) => Number(m[1]));
  assert.ok(sizes.length > 10);
  assert.ok(Math.min(...sizes) >= 20, 'smallest font-size is ' + Math.min(...sizes) + 'px');
  assert.doesNotMatch(css, /font-size:\s*[\d.]+(?:em|rem|%|pt)/, 'use px so the 20px floor can be checked');
  const body = css.match(/body\s*\{[^}]*\}/)[0];
  assert.ok(Number(body.match(/font-size:\s*(\d+)px/)[1]) >= 20);
  const button = css.match(/\n\s*button\s*\{[^}]*\}/)[0];
  assert.ok(Number(button.match(/min-height:\s*(\d+)px/)[1]) >= 64);
  const heights = [...css.matchAll(/(?:^|[\s;{])(?:min-)?height:\s*(\d+)px/g)].map((m) => Number(m[1]));
  // .round (answer/decline) is 72px; the avatar is a picture, not a button.
  assert.ok(heights.includes(72));
  for (const el of ['.round']) assert.match(css, new RegExp('\\' + el + '\\s*\\{[^}]*min-height:\\s*(6[4-9]|[7-9]\\d|\\d{3,})px'));
});

test('page never uses browser storage, cookies or console logging, and holds no token', () => {
  const own = ownPart();
  assert.doesNotMatch(html, /localStorage|sessionStorage|indexedDB|document\.cookie|navigator\.sendBeacon/);
  assert.doesNotMatch(own, /console\./);
  assert.doesNotMatch(html, /(?<![A-Za-z0-9_:-])\d{6,12}:[A-Za-z0-9_-]{30,40}(?![A-Za-z0-9_-])/);
});

test('token field is a password field with autocomplete off, and Mock mode is the default', () => {
  assert.match(html, /<input type="password" id="token" autocomplete="off"/);
  assert.match(html, /<input type="checkbox" id="mockMode" checked>/);
  assert.match(html, /<fieldset id="liveFields" disabled>/);
});

// ---------------------------------------------------------------------------------------------
// 3. The Scam Check alert never contains the pasted message
// ---------------------------------------------------------------------------------------------

test('buildScamCheckAlertText: wording', () => {
  assert.equal(
    S.buildScamCheckAlertText({ seniorName: 'Mum', level: 'High risk', cueLabels: ['Money request', 'Secrecy'], time: '10:44' }),
    'Mum checked a message in SilverGuard at 10:44: High risk (money request, secrecy). Please call her before any money moves.'
  );
  assert.equal(
    S.buildScamCheckAlertText({ level: 'High risk', cueLabels: ['Money request'], includeCues: false, time: '10:44' }),
    'Mum checked a message in SilverGuard at 10:44: High risk. Please call her before any money moves.'
  );
  assert.match(S.buildScamCheckAlertText({ level: 'High risk', pronoun: 'he', time: '09:05' }), /Please call him before/);
  assert.match(S.buildScamCheckAlertText({ level: 'High risk' }), /at \d\d:\d\d: High risk\./);
});

test('buildScamCheckAlertText: only short plain cue names get through', () => {
  const t = S.buildScamCheckAlertText({
    level: 'High risk', time: '10:44',
    cueLabels: ['Money request', 'Money request', 'send $5,000 to 123-456', 'x'.repeat(31), '', null, 'Urgency']
  });
  assert.equal(t, 'Mum checked a message in SilverGuard at 10:44: High risk (money request, urgency). Please call her before any money moves.');
});

const SAMPLES = [
  'Ma, my phone kena stolen, this is my new number. Need to pay the landlord today, can PayNow me $2,000? Don\'t tell Pa first ok.',
  'Grandma it\'s me, I am in trouble and in the police station. Please transfer 8000 dollars to this account today. Do not tell Mum and Dad.',
  '妈，我手机坏了，这是我的新号码。今天急用，请转五千块给我，别告诉爸爸。',
  'Hi Ma, reached the hospital with Pa for his check-up. Doctor says all fine, we will be home by 5. Call you later.',
  'ZXQ-CANARY-7731 transfer money now, keep it secret, urgent, new number, ZXQ-CANARY-7731'
];

/** The alert text the page would build for this message. Uses only the engine's result, as the page does. */
function alertFor(message) {
  const r = engine.assess(message);
  const known = engine.CUE_FAMILIES.map((f) => f.label);
  const labels = r.cues.map((c) => c.label).filter((l) => known.includes(l));
  return { result: r, text: S.buildScamCheckAlertText({ level: r.level, cueLabels: labels, time: '10:44' }) };
}

test('the alert never contains the pasted message, any 16-character run of it, or any phrase the engine matched', () => {
  for (const message of SAMPLES) {
    const { result, text } = alertFor(message);
    assert.equal(S.containsPastedText(text, message), false, 'leak for: ' + message);
    assert.ok(!text.includes('ZXQ-CANARY-7731'));
    assert.ok(!text.includes('$2,000') && !text.includes('PayNow'));
    for (const cue of result.cues) {
      for (const phrase of cue.matches) {
        // Skip phrases that are ordinary words already in the fixed template (for example "money").
        const fixed = 'checked a message in SilverGuard at: High risk. Please call her before any money moves.';
        if (phrase.length >= 4 && !fixed.toLowerCase().includes(phrase.toLowerCase()) && !cue.label.toLowerCase().includes(phrase.toLowerCase())) {
          assert.ok(!text.toLowerCase().includes(phrase.toLowerCase()), 'matched phrase in alert: ' + phrase);
        }
      }
    }
  }
});

test('the alert depends only on the level and cue names, not on the wording of the message', () => {
  const a = alertFor('Ma, new number. PayNow me $2,000 today. Don\'t tell Pa.');
  const b = alertFor('Mum, new number lah. Send me $9,999 by PayNow today, tell nobody.');
  if (a.result.level === b.result.level && a.result.cues.map((c) => c.label).join() === b.result.cues.map((c) => c.label).join()) {
    assert.equal(a.text, b.text);
  }
  assert.equal(alertFor(SAMPLES[0]).text, alertFor(SAMPLES[0].replace('$2,000', '$7,500')).text);
});

test('containsPastedText: detects quoting, ignores case and spacing, ignores unrelated text', () => {
  const pasted = 'Please send   money to my new account today';
  assert.equal(S.containsPastedText('Mum got: please send money to my new account today!', pasted), true);
  assert.equal(S.containsPastedText('Mum got a message: please send money to my', pasted), true);
  assert.equal(S.containsPastedText('Mum checked a message in SilverGuard at 10:44: High risk.', pasted), false);
  assert.equal(S.containsPastedText('anything', ''), false);
  assert.equal(S.containsPastedText('Mum is fine', 'hi'), false);
});

// ---------------------------------------------------------------------------------------------
// 4. The page script, run in a minimal fake DOM
// ---------------------------------------------------------------------------------------------

class El {
  constructor(id, attrs) {
    this.id = id;
    this.attrs = {};
    this.listeners = {};
    this.children = [];
    this.className = '';
    this.textContent = '';
    this.innerHTML = '';
    this.hidden = /(^|\s)hidden(\s|$)/.test(attrs);
    this.disabled = /(^|\s)disabled(\s|$)/.test(attrs);
    this.checked = /(^|\s)checked(\s|$)/.test(attrs);
    const v = attrs.match(/\svalue="([^"]*)"/);
    this.value = v ? v[1] : '';
    const t = attrs.match(/\stype="([^"]*)"/);
    this.type = t ? t[1] : '';
  }
  addEventListener(type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); }
  setAttribute(k, v) { this.attrs[k] = String(v); }
  getAttribute(k) { return this.attrs[k]; }
  appendChild(c) { this.children.push(c); return c; }
  focus() {}
  /** Fire an event and wait for async handlers. */
  async fire(type) {
    const ev = { type: type, target: this };
    await Promise.all((this.listeners[type] || []).map((fn) => fn.call(this, ev)));
  }
  click() { return this.fire('click'); }
  async typeIn(value) { this.value = value; await this.fire('input'); }
}

/** Build a page in a vm context. Returns { $, win, calls, reload }. fetchImpl gets (url, init). */
function loadPage(fetchImpl) {
  const bodyHtml = html.slice(0, html.indexOf('<script>'));
  const els = {};
  const re = /<(\w+)((?:\s[^>]*?)?)\sid="([^"]+)"([^>]*)>/g;
  let m;
  while ((m = re.exec(bodyHtml)) !== null) els[m[3]] = new El(m[3], m[2] + ' ' + m[4]);

  const calls = [];
  const sandbox = {
    console, setTimeout, clearTimeout, clearInterval, performance,
    // The page's clock tick must not keep the test process alive.
    setInterval: (fn, ms) => { const t = setInterval(fn, ms); t.unref(); return t; }, Intl, URLSearchParams, AbortController,
    document: {
      getElementById(id) { if (!els[id]) throw new Error('page asked for a missing element: ' + id); return els[id]; },
      createElement(tag) { return new El('(new ' + tag + ')', ''); }
    },
    fetch: async (url, init) => { calls.push({ url: String(url), body: String(init && init.body), method: init && init.method }); return fetchImpl(url, init); }
  };
  const winListeners = {};
  sandbox.addEventListener = (type, fn) => { (winListeners[type] = winListeners[type] || []).push(fn); };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  const re2 = /<script>([\s\S]*?)<\/script>/g;
  let s;
  while ((s = re2.exec(html)) !== null) vm.runInContext(s[1], sandbox);
  return {
    $: (id) => els[id], els, calls, win: sandbox,
    pageshow: () => (winListeners.pageshow || []).forEach((fn) => fn({}))
  };
}

const telegramOk = async () => ({ status: 200, json: async () => ({ ok: true, result: {} }) });
const FAKE_TOKEN = 'fake-token-for-unit-tests';

function everythingOnScreen(page) {
  return Object.values(page.els).map((e) => [e.textContent, e.innerHTML, e.id === 'token' ? '' : e.value].join(' ')).join(' ');
}

test('page starts in Mock mode with the guardian button hidden', () => {
  const page = loadPage(telegramOk);
  assert.equal(page.$('mockMode').checked, true);
  assert.match(page.$('modePill').textContent, /MOCK MODE: nothing is sent/);
  assert.equal(page.$('liveFields').disabled, true);
  assert.equal(page.$('guardianBox').hidden, true);
  assert.equal(page.$('result').hidden, true);
});

test('Simulate unknown call in Mock mode: phone card, guardian alert text, no network', async () => {
  const page = loadPage(telegramOk);
  await page.$('simulateBtn').click();
  assert.equal(page.calls.length, 0, 'mock mode must not use the network');
  assert.equal(page.$('callUi').hidden, false);
  assert.equal(page.$('callerNumberShown').textContent, '+65 9XXX XX67');
  assert.match(page.$('phoneNotice').textContent, /Wei Jie has been told/);
  assert.match(page.$('callStatus').textContent, /Mock mode: nothing was sent/);
  assert.equal(page.$('simulateBtn').disabled, false);
  assert.match(page.$('inbox').innerHTML, /Mock: not sent/);
  assert.match(page.$('inbox').innerHTML, /Unknown number \+65 9XXX XX67 rang Mum at \d\d:\d\d\. She can still answer/);
  await page.$('declineBtn').click();
  assert.equal(page.$('callUi').hidden, true);
});

test('Scam Check scam example shows High risk, reasons and the Alert my guardian step', async () => {
  const page = loadPage(telegramOk);
  await page.$('exampleScam').click();
  assert.equal(engine.assess(page.$('message').value).level, 'High risk', 'the headline example must stay High risk');
  assert.equal(page.$('result').hidden, false);
  assert.equal(page.$('levelText').textContent, 'High risk');
  assert.equal(page.$('result').getAttribute('data-level'), 'high');
  assert.ok(page.$('reasons').children.length >= 2);
  assert.equal(page.$('guardianBox').hidden, false);
  assert.equal(page.$('alertBtn').disabled, false);
  assert.match(page.$('alertPreview').textContent, /^Wei Jie will receive: Mum checked a message in SilverGuard at \d\d:\d\d: High risk \(/);
});

test('the Alert my guardian step shows only for High risk', async () => {
  for (const message of [SAMPLES[3], 'Please keep it secret and be quick', 'Hello', '']) {
    const page = loadPage(telegramOk);
    await page.$('message').typeIn(message);
    await page.$('check').click();
    const level = engine.assess(message).level;
    if (!message) {
      assert.equal(page.$('result').hidden, true);
      assert.match(page.$('checkStatus').textContent, /paste a message first/);
    }
    assert.equal(page.$('guardianBox').hidden, message ? level !== 'High risk' : true, 'level ' + level + ' for: ' + message);
  }
});

test('editing or clearing the message hides the result and the guardian button', async () => {
  const page = loadPage(telegramOk);
  await page.$('exampleScam').click();
  assert.equal(page.$('guardianBox').hidden, false);
  await page.$('message').typeIn(page.$('message').value + ' extra');
  assert.equal(page.$('guardianBox').hidden, true);
  assert.equal(page.$('result').hidden, true);
  await page.$('exampleScam').click();
  await page.$('clear').click();
  assert.equal(page.$('guardianBox').hidden, true);
  assert.equal(page.$('message').value, '');
});

test('Alert my guardian in Mock mode: separate message, never the pasted text, no network', async () => {
  const page = loadPage(telegramOk);
  await page.$('exampleScam').click();
  const pasted = page.$('message').value;
  await page.$('alertBtn').click();
  assert.equal(page.calls.length, 0);
  assert.match(page.$('alertStatus').textContent, /Wei Jie has been told .*Mock mode: nothing was sent/);
  assert.equal(page.$('alertBtn').disabled, true, 'one alert per result');
  const html2 = page.$('inbox').innerHTML;
  assert.match(html2, /Scam Check alert/);
  assert.match(html2, /Mum checked a message in SilverGuard at \d\d:\d\d: High risk \(/);
  assert.equal(S.containsPastedText(html2, pasted), false);
  assert.doesNotMatch(html2, /PayNow|\$2,000|landlord|kena stolen/i);
  // A new check re-arms the button.
  await page.$('exampleScam').click();
  assert.equal(page.$('alertBtn').disabled, false);
});

test('Live mode: both alerts go to the Telegram sendMessage URL, the second never carries the pasted text, the token never shows', async () => {
  const page = loadPage(telegramOk);
  page.$('mockMode').checked = false;
  await page.$('mockMode').fire('change');
  assert.equal(page.$('liveFields').disabled, false);
  assert.match(page.$('modePill').textContent, /LIVE MODE/);
  page.$('token').value = FAKE_TOKEN;
  page.$('chatId').value = '123456';

  await page.$('simulateBtn').click();
  assert.equal(page.calls.length, 1);
  assert.equal(page.calls[0].url, 'https://api.telegram.org/bot' + FAKE_TOKEN + '/sendMessage');
  assert.equal(page.calls[0].method, 'POST');
  const callParams = new URLSearchParams(page.calls[0].body);
  assert.equal(callParams.get('chat_id'), '123456');
  assert.match(callParams.get('text'), /^Unknown number \+65 9XXX XX67 rang Mum at /);
  assert.match(page.$('inbox').innerHTML, /Sent, /);

  await page.$('exampleScam').click();
  const pasted = page.$('message').value;
  await page.$('alertBtn').click();
  assert.equal(page.calls.length, 2);
  const scamParams = new URLSearchParams(page.calls[1].body);
  assert.equal(scamParams.get('chat_id'), '123456');
  assert.match(scamParams.get('text'), /^Mum checked a message in SilverGuard at \d\d:\d\d: High risk \(/);
  assert.equal(S.containsPastedText(scamParams.get('text'), pasted), false);
  for (const word of ['PayNow', '$2,000', 'landlord', 'kena', 'stolen']) assert.ok(!scamParams.get('text').includes(word));
  assert.match(page.$('alertStatus').textContent, /Wei Jie has been told .*Telegram accepted/);

  assert.ok(!everythingOnScreen(page).includes(FAKE_TOKEN), 'token must never appear on screen');
});

test('Live mode failure: plain words, button re-enabled, keeps a person in the loop, token hidden', async () => {
  const page = loadPage(async () => { throw new Error('boom ' + FAKE_TOKEN); });
  page.$('mockMode').checked = false;
  await page.$('mockMode').fire('change');
  page.$('token').value = FAKE_TOKEN;
  page.$('chatId').value = '123456';
  await page.$('exampleScam').click();
  await page.$('alertBtn').click();
  assert.match(page.$('alertStatus').textContent, /Wei Jie could not be reached/);
  assert.match(page.$('alertStatus').textContent, /Call Wei Jie now/);
  assert.equal(page.$('alertBtn').disabled, false);
  assert.match(page.$('inbox').innerHTML, /Not delivered/);
  assert.ok(!everythingOnScreen(page).includes(FAKE_TOKEN));
});

test('Live mode with no token: plain error, nothing sent', async () => {
  const page = loadPage(telegramOk);
  page.$('mockMode').checked = false;
  await page.$('mockMode').fire('change');
  await page.$('exampleScam').click();
  await page.$('alertBtn').click();
  assert.equal(page.calls.length, 0);
  assert.match(page.$('alertStatus').textContent, /bot token is missing/);
});

test('the pasted-text guard stops a leaking alert before anything is sent', async () => {
  const page = loadPage(telegramOk);
  page.$('mockMode').checked = false;
  await page.$('mockMode').fire('change');
  page.$('token').value = FAKE_TOKEN;
  page.$('chatId').value = '123456';
  // Make the senior's name equal to a long run of the pasted message, as a worst case.
  await page.$('exampleScam').click();
  page.$('seniorName').value = 'Need to pay the landlord today';
  await page.$('alertBtn').click();
  assert.equal(page.calls.length, 0);
  assert.match(page.$('alertStatus').textContent, /Nothing was sent: the alert would have included part of the message/);
});

test('reload clears the token and chat ID and returns to Mock mode', async () => {
  const page = loadPage(telegramOk);
  page.$('mockMode').checked = false;
  await page.$('mockMode').fire('change');
  page.$('token').value = FAKE_TOKEN;
  page.$('chatId').value = '123456';
  page.pageshow();
  assert.equal(page.$('token').value, '');
  assert.equal(page.$('chatId').value, '');
  assert.equal(page.$('mockMode').checked, true);
  assert.equal(page.$('liveFields').disabled, true);
});

test('Show and Hide toggles the token field type', async () => {
  const page = loadPage(telegramOk);
  assert.equal(page.$('token').type, 'password');
  await page.$('showToken').click();
  assert.equal(page.$('token').type, 'text');
  await page.$('showToken').click();
  assert.equal(page.$('token').type, 'password');
});
