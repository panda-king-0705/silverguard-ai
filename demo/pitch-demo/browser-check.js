#!/usr/bin/env node
// Draft prepared with AI assistance for Dev 1; to be reviewed and edited by the team.
//
// Demo hardening check (DEV-3, issue #13 D7). Opens the three demo pages from disk in a real
// browser (Chromium via Playwright) with ALL network blocked, at the pitch laptop size
// (1366x768) and at 1920x1080, and checks:
//   - no console errors or page errors
//   - no request leaves the machine (anything that is not file:// is aborted and counted)
//   - Scam Check gives the run sheet's expected levels
//   - "Simulate unknown call" works in Mock mode with a clear on-screen mock label
//   - nothing visible is smaller than 20 px, and the key controls fit the first screen
//
// Usage (from the repo root):  node demo/pitch-demo/browser-check.js [--shots <dir>]
// Needs Playwright with Chromium already installed. If "require('playwright')" fails, run
// with NODE_PATH="$(npm root -g)". This file is NOT part of "node --test" on purpose, so the
// unit tests still run on a laptop without Playwright. Exit code 0 = all checks passed.
'use strict';

const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..', '..');
const PAGES = {
  pitch: pathToFileURL(path.join(ROOT, 'demo/pitch-demo/index.html')).href,
  scamcheck: pathToFileURL(path.join(ROOT, 'demo/scam-check-web/index.html')).href,
  guardian: pathToFileURL(path.join(ROOT, 'demo/guardian-alert/index.html')).href
};

// The messages the pitch script and PITCH-DEMO.md use, with the level each must give.
const MESSAGES = [
  { id: 'S04 (beat 7)', expect: 'High risk', text: "Ah Ma, my phone spoil, can't talk now, only can send voice note. Very urgent, I need $1,500 for hospital deposit tonight. PayNow to this number ok? Don't tell anyone first." },
  { id: 'S03', expect: 'Check with family', text: 'Hello Uncle, guess who? I changed my number, please save this one and delete the old one ok. Next time contact me here.' },
  { id: 'family', expect: 'No warning signs found', text: 'Hi Ma, reached the hospital with Pa for his check-up. Doctor says all fine, we will be home by 5. Call you later.' },
  { id: 'G02 (optional extra)', expect: 'No warning signs found', text: null } // filled from test-set.json
];
const testSet = JSON.parse(fs.readFileSync(path.join(ROOT, 'demo/scam-check-web/test-set.json'), 'utf8'));
const g02 = (testSet.messages || testSet).find(function (m) { return m.id === 'G02'; });
MESSAGES[3].text = g02.text;

const VIEWPORTS = [{ width: 1366, height: 768 }, { width: 1920, height: 1080 }];
const MIN_PX = 20;

const shotsArg = process.argv.indexOf('--shots');
const SHOTS = shotsArg > -1 ? path.resolve(process.argv[shotsArg + 1]) : null;
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });

const results = [];
function record(page, vp, name, ok, detail) {
  results.push({ page: page, vp: vp.width + 'x' + vp.height, name: name, ok: !!ok, detail: detail || '' });
}

async function openPage(browser, url, vp) {
  const context = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
  const external = [];
  const errors = [];
  await context.route('**/*', function (route) {
    const u = route.request().url();
    if (u.startsWith('file:') || u.startsWith('data:') || u.startsWith('blob:')) return route.continue();
    external.push(u);
    return route.abort();
  });
  const page = await context.newPage();
  page.on('console', function (m) { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('pageerror', function (e) { errors.push('pageerror: ' + e.message); });
  page.on('requestfailed', function (r) {
    const u = r.url();
    if (!u.startsWith('file:') && external.indexOf(u) === -1) external.push(u);
  });
  await page.goto(url, { waitUntil: 'load' });
  return { context: context, page: page, external: external, errors: errors };
}

// Smallest computed font size of any element that has visible text of its own.
async function smallestText(page) {
  return page.evaluate(function () {
    let min = Infinity; let where = '';
    document.querySelectorAll('body *').forEach(function (el) {
      if (el.closest('[hidden], details:not([open]) > :not(summary), script, style, svg')) return;
      const own = Array.prototype.some.call(el.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); });
      if (!own) return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs < min) { min = fs; where = el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + ' "' + el.textContent.trim().slice(0, 30) + '"'; }
    });
    return { min: min, where: where };
  });
}
async function noHorizontalScroll(page) {
  return page.evaluate(function () { return document.documentElement.scrollWidth <= window.innerWidth; });
}
async function inFirstScreen(page, selector) {
  return page.evaluate(function (sel) {
    const el = document.querySelector(sel);
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.top >= 0 && r.bottom <= window.innerHeight;
  }, selector);
}
async function shot(page, name) {
  if (SHOTS) await page.screenshot({ path: path.join(SHOTS, name + '.png') });
}

async function checkPitch(browser, vp) {
  const P = 'pitch-demo';
  const o = await openPage(browser, PAGES.pitch, vp);
  const page = o.page;
  record(P, vp, 'Mock mode banner on load', /MOCK MODE/.test(await page.textContent('#modePill')));
  record(P, vp, '"Simulate unknown call" on first screen', await inFirstScreen(page, '#simulateBtn'));
  record(P, vp, '"Check this message" on first screen', await inFirstScreen(page, '#check'));
  await shot(page, P + '-' + vp.width + '-load');

  // Layer 1: simulate unknown call (mock).
  await page.click('#simulateBtn');
  await page.waitForFunction(function () { return /Mock mode: nothing was sent/.test(document.getElementById('callStatus').textContent); }, null, { timeout: 5000 });
  const notice = await page.textContent('#phoneNotice');
  const inbox = await page.textContent('#inbox');
  record(P, vp, 'Simulated call: phone says guardian told', /Marcus has been told/.test(notice), notice);
  record(P, vp, 'Simulated call: inbox shows mock alert to Marcus', /Mock: not sent/.test(inbox) && /Unknown number \+65 9XXX XX67 rang Mum/.test(inbox), inbox.trim().slice(0, 120));
  record(P, vp, 'Simulated call: ring silenced, not blocked', await page.isVisible('text=Ring silenced. You can still answer.'));
  record(P, vp, 'Simulated call: mock status and "Marcus has been told" visible without scrolling',
    (await inFirstScreen(page, '#callStatus')) && (await inFirstScreen(page, '#phoneNotice')));
  await shot(page, P + '-' + vp.width + '-call');

  // Layer 2: the script's messages.
  for (const m of MESSAGES) {
    await page.click('#clear');
    await page.fill('#message', m.text);
    await page.click('#check');
    const level = (await page.textContent('#levelText')).trim();
    const reasons = await page.$$eval('#reasons > li', function (l) { return l.length; });
    record(P, vp, 'Scam Check ' + m.id + ' -> ' + m.expect, level === m.expect, level + ', ' + reasons + ' reasons');
    const guardianShown = await page.isVisible('#guardianBox');
    record(P, vp, 'Scam Check ' + m.id + ': "Alert my guardian" only on High risk', guardianShown === (m.expect === 'High risk'));
    if (m.id.startsWith('S04')) {
      record(P, vp, 'S04 shows 4 reasons', reasons === 4, String(reasons));
      record(P, vp, 'S04 shows the reminder', /calling family on a number you saved/.test(await page.textContent('#reminder')));
      await shot(page, P + '-' + vp.width + '-s04');
      await page.click('#alertBtn');
      await page.waitForFunction(function () { return /Mock mode: nothing was sent/.test(document.getElementById('alertStatus').textContent); }, null, { timeout: 5000 });
      const inbox2 = await page.textContent('#inbox');
      record(P, vp, 'Scam Check alert (mock) contains no pasted text', /High risk/.test(inbox2) && inbox2.indexOf('phone spoil') === -1);
    }
  }
  const small = await smallestText(page);
  record(P, vp, 'No visible text under ' + MIN_PX + ' px', small.min >= MIN_PX, small.min + ' px at ' + small.where);
  record(P, vp, 'No horizontal scroll', await noHorizontalScroll(page));
  record(P, vp, 'Zero external requests', o.external.length === 0, o.external.join(' '));
  record(P, vp, 'Zero console/page errors', o.errors.length === 0, o.errors.join(' | '));
  await o.context.close();
}

async function checkScamCheck(browser, vp) {
  const P = 'scam-check-web';
  const o = await openPage(browser, PAGES.scamcheck, vp);
  const page = o.page;
  record(P, vp, '"Check this message" on first screen', await inFirstScreen(page, '#check'));
  for (const m of MESSAGES) {
    await page.click('#clear');
    await page.fill('#message', m.text);
    await page.click('#check');
    await page.waitForSelector('#result:not([hidden])');
    const text = await page.textContent('#result');
    const ok = text.indexOf(m.expect) !== -1 && ['High risk', 'Check with family', 'No warning signs found'].filter(function (l) { return l !== m.expect && text.indexOf(l) !== -1; }).length === 0;
    record(P, vp, 'Scam Check ' + m.id + ' -> ' + m.expect, ok, text.trim().slice(0, 60));
    if (m.id.startsWith('S04')) await shot(page, P + '-' + vp.width + '-s04');
  }
  const small = await smallestText(page);
  record(P, vp, 'No visible text under ' + MIN_PX + ' px', small.min >= MIN_PX, small.min + ' px at ' + small.where);
  record(P, vp, 'No horizontal scroll', await noHorizontalScroll(page));
  record(P, vp, 'Zero external requests', o.external.length === 0, o.external.join(' '));
  record(P, vp, 'Zero console/page errors', o.errors.length === 0, o.errors.join(' | '));
  await o.context.close();
}

async function checkGuardian(browser, vp) {
  const P = 'guardian-alert';
  const o = await openPage(browser, PAGES.guardian, vp);
  const page = o.page;
  record(P, vp, 'Mock mode label on load', /Mock mode/.test(await page.textContent('#modePill')));
  record(P, vp, '"Simulate unknown call" on first screen', await inFirstScreen(page, '#simulateBtn'));
  await page.click('#simulateBtn');
  await page.waitForFunction(function () { return /no real message was sent/.test(document.getElementById('result').textContent); }, null, { timeout: 5000 });
  const res = await page.textContent('#result');
  record(P, vp, 'Simulated call: on-screen mock result', /Mock mode: no real message was sent/.test(res), res.trim().slice(0, 100));
  record(P, vp, 'Simulated call: mock result visible without scrolling', await inFirstScreen(page, '#result'));
  await shot(page, P + '-' + vp.width + '-call');
  const small = await smallestText(page);
  record(P, vp, 'No visible text under ' + MIN_PX + ' px', small.min >= MIN_PX, small.min + ' px at ' + small.where);
  record(P, vp, 'No horizontal scroll', await noHorizontalScroll(page));
  record(P, vp, 'Zero external requests', o.external.length === 0, o.external.join(' '));
  record(P, vp, 'Zero console/page errors', o.errors.length === 0, o.errors.join(' | '));
  await o.context.close();
}

(async function main() {
  const browser = await chromium.launch();
  try {
    for (const vp of VIEWPORTS) {
      await checkPitch(browser, vp);
      await checkScamCheck(browser, vp);
      await checkGuardian(browser, vp);
    }
  } finally {
    await browser.close();
  }
  let failed = 0;
  results.forEach(function (r) {
    if (!r.ok) failed++;
    console.log((r.ok ? 'PASS ' : 'FAIL ') + r.page.padEnd(15) + r.vp.padEnd(10) + r.name + (r.detail && !r.ok ? '  [' + r.detail + ']' : ''));
  });
  console.log('\n' + (results.length - failed) + '/' + results.length + ' browser checks passed' + (failed ? ', ' + failed + ' FAILED' : ''));
  process.exit(failed ? 1 : 0);
})().catch(function (e) { console.error(e); process.exit(2); });
