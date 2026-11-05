#!/usr/bin/env node
// Draft prepared with AI assistance for Dev 1; to be reviewed and edited by the team.
//
// Records the 90-second backup video of the demo (milestone DEV-4). No voice.
// It drives the demo pages from disk in headless Chromium, in the order of the pitch script's
// demo beats (docs/pitch/pitch-script.md):
//   beat 6  demo/guardian-alert/index.html   Simulate unknown call (Mock mode)
//   beat 7  demo/scam-check-web/index.html   Scam Check with message S04 -> High risk
//   beat 8  design/clickable-screens/index.html   Pause & Verify: No, No, Yes -> Call Marcus now
// Captions are injected into the page while recording only (page.evaluate); no source file is
// changed. All network requests are blocked. The page clock is fixed at 10:42 Singapore time to
// match the script's illustration (timers still run, so the mock 0.6 s delay is real).
//
// Usage (from the repo root):   node demo/pitch-demo/record-backup.js
// Needs: Playwright with Chromium installed (NODE_PATH="$(npm root -g)" if require fails), and
// ffmpeg on the PATH (or set FFMPEG=/path/to/ffmpeg). Writes demo/pitch-demo/backup-video.mp4 and
// prints the timestamp of each beat. Takes about 2 minutes.
'use strict';

const path = require('path');
const fs = require('fs');
const os = require('os');
const { execFileSync } = require('child_process');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..', '..');
const url = (p) => pathToFileURL(path.join(ROOT, p)).href;
const OUT = path.join(__dirname, 'backup-video.mp4');
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const W = 1366, H = 768;

const S04 = "Ah Ma, my phone spoil, can't talk now, only can send voice note. Very urgent, I need $1,500 for hospital deposit tonight. PayNow to this number ok? Don't tell anyone first.";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Caption overlay: a bottom bar for the beat caption, a corner tag that is always on, and an
// optional full-screen card for the title and the end. Re-injected after every navigation.
async function overlay(page, opts) {
  await page.evaluate(function (o) {
    function el(id, css) {
      var d = document.getElementById(id);
      if (!d) { d = document.createElement('div'); d.id = id; document.body.appendChild(d); }
      d.style.cssText = css;
      return d;
    }
    var font = 'font-family: system-ui, "Segoe UI", Roboto, sans-serif;';
    var tag = el('rec-tag', font + 'position:fixed;top:12px;right:12px;z-index:2147483647;background:#1c1b19;color:#fff;' +
      'font-size:20px;font-weight:700;padding:6px 14px;border-radius:10px;opacity:.92;pointer-events:none;');
    tag.textContent = 'Recorded run — mock alert, no network';
    var cap = el('rec-caption', font + 'position:fixed;left:50%;transform:translateX(-50%);bottom:18px;z-index:2147483647;' +
      'max-width:1180px;width:max-content;background:rgba(20,22,26,.94);color:#fff;font-size:28px;line-height:1.3;font-weight:600;' +
      'padding:14px 26px;border-radius:14px;text-align:center;pointer-events:none;box-shadow:0 6px 24px rgba(0,0,0,.35);');
    cap.textContent = o.caption || '';
    cap.style.display = o.caption ? 'block' : 'none';
    if (o.capTop) { cap.style.bottom = 'auto'; cap.style.top = '58px'; }
    var card = el('rec-card', font + 'position:fixed;inset:0;z-index:2147483646;background:#1f3a5f;color:#fff;display:flex;' +
      'flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:60px;gap:22px;');
    card.style.display = o.card ? 'flex' : 'none';
    card.innerHTML = o.card || '';
  }, opts);
}

(async function main() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sg-backup-'));
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 1,
    recordVideo: { dir: tmp, size: { width: W, height: H } },
    timezoneId: 'Asia/Singapore',
    locale: 'en-SG'
  });
  let blocked = 0;
  await context.route('**/*', (route) => {
    const u = route.request().url();
    if (u.startsWith('file:') || u.startsWith('data:') || u.startsWith('blob:')) return route.continue();
    blocked++;
    return route.abort();
  });
  await context.clock.setFixedTime(new Date('2026-11-09T10:42:00+08:00'));
  const errors = [];
  const page = await context.newPage();
  const t0 = Date.now();
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

  const marks = [];
  let start = null; // video time (s) where the trimmed video begins
  const mark = (label) => { const s = (Date.now() - t0) / 1000; marks.push({ label: label, at: s }); };

  // ---- Title card (on top of the guardian-alert page, which is beat 6) ----
  await page.goto(url('demo/guardian-alert/index.html'), { waitUntil: 'load' });
  await overlay(page, { card:
    '<div style="font-size:52px;font-weight:800">SilverGuard AI: demo backup</div>' +
    '<div style="font-size:30px;max-width:1000px">Recorded run of the offline demo, in the order of the pitch.<br>Mock mode: no alert is really sent. No network.</div>' +
    '<div style="font-size:26px;opacity:.9">Beat 6 Guardian Alert · Beat 7 Scam Check · Beat 8 Pause &amp; Verify</div>' });
  await sleep(300);
  start = (Date.now() - t0) / 1000;
  mark('Title card');
  await sleep(6000);

  // ---- Beat 6: Guardian Alert (Layer 1) ----
  mark('Beat 6: Guardian Alert, simulate unknown call');
  await overlay(page, { caption: 'Layer 1, before she answers: a number not in Mum\'s contacts calls.' });
  await sleep(4500);
  await page.hover('#simulateBtn');
  await sleep(800);
  await page.click('#simulateBtn');
  await overlay(page, { caption: 'The ring is silenced, never blocked. She can still answer.' });
  await page.waitForFunction(() => /no real message was sent/.test(document.getElementById('result').textContent));
  await sleep(5000);
  await overlay(page, { caption: 'Guardian Marcus is alerted (mock alert: nothing was sent).' });
  await sleep(6000);
  await overlay(page, { caption: 'Marcus gets the event only. Design target: under 10 s (not yet measured live).' });
  await sleep(5000);

  // ---- Beat 7: Scam Check (Layer 2) ----
  await page.goto(url('demo/scam-check-web/index.html'), { waitUntil: 'load' });
  mark('Beat 7: Scam Check, message S04');
  await overlay(page, { caption: 'Layer 2, during the scam: Ah Ma is not sure about a message. Scam Check.' });
  await sleep(3500);
  await page.click('#message');
  await page.keyboard.type(S04, { delay: 22 });
  await overlay(page, { caption: 'It reads the scam script, not the voice: money, secrecy, new number, urgency.' });
  await sleep(2500);
  await page.click('#check');
  await page.waitForSelector('#result:not([hidden])');
  await page.evaluate(() => document.getElementById('result').scrollIntoView({ block: 'start' }));
  await page.evaluate(() => window.scrollBy(0, -40));
  mark('Beat 7: High risk result');
  await overlay(page, { caption: 'High risk, with plain reasons and the phrases it noticed.' });
  await sleep(6500);
  await overlay(page, { caption: 'It never says "safe". Levels: High risk · Check with family · No warning signs found.' });
  await sleep(6000);
  await overlay(page, { caption: 'Works offline; in the app the message never leaves her phone.' });
  await sleep(4000);

  // ---- Beat 8: Pause & Verify (clickable screens) ----
  await page.goto(url('design/clickable-screens/index.html'), { waitUntil: 'load' });
  mark('Beat 8: Pause & Verify');
  await overlay(page, { capTop: true, caption: 'Pause & Verify: one button, "Is this really them?"' });
  await sleep(3500);
  await page.keyboard.press('2');
  await overlay(page, { capTop: true, caption: 'Three questions, read aloud. Did they ask for money?' });
  await sleep(4000);
  await page.click('#pv-question [data-action="pv-no"]');
  await overlay(page, { capTop: true, caption: 'Answer: No.' });
  await sleep(3000);
  await page.click('#pv-question [data-action="pv-no"]');
  await overlay(page, { capTop: true, caption: 'Answer: No.' });
  await sleep(3000);
  await page.click('#pv-question [data-action="pv-yes"]');
  mark('Beat 8: Call Marcus now');
  await overlay(page, { capTop: true, caption: 'Any yes: one big button. It calls Marcus\'s saved number, never the caller\'s.' });
  await sleep(7000);

  // ---- End card ----
  mark('End card');
  await overlay(page, { card:
    '<div style="font-size:44px;font-weight:800">This was a recorded run of the mock demo</div>' +
    '<div style="font-size:28px;max-width:1080px">Automated recording, no network. The alert was simulated: nothing was sent.</div>' +
    '<div style="font-size:26px;max-width:1080px;opacity:.95">Scam Check is a simplified rules demo: 15/15 on a 15-message test set our team wrote with AI assistance. Real-world accuracy is not yet measured.</div>' });
  await sleep(7000);
  const end = (Date.now() - t0) / 1000;

  const video = page.video();
  await context.close();
  await browser.close();
  const webm = await video.path();

  // Trim the blank start, convert to H.264 MP4 (yuv420p, faststart), no audio.
  execFileSync(FFMPEG, ['-y', '-loglevel', 'error', '-ss', start.toFixed(2), '-i', webm, '-t', (end - start).toFixed(2),
    '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-r', '25',
    '-movflags', '+faststart', OUT], { stdio: 'inherit' });

  const fmt = (s) => { s = Math.max(0, s - start); return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0'); };
  console.log('Beat times below are wall-clock and can run up to about 3 s early; check them against the video before updating BACKUP-VIDEO.md.');
  console.log('Wrote ' + OUT + ' (' + (fs.statSync(OUT).size / 1e6).toFixed(2) + ' MB, ' + (end - start).toFixed(1) + ' s)');
  marks.forEach((m) => console.log('  ' + fmt(m.at) + '  ' + m.label));
  console.log('Blocked network requests: ' + blocked + '. Page errors: ' + (errors.length ? errors.join(' | ') : 'none') + '.');
  fs.rmSync(tmp, { recursive: true, force: true });
  if (errors.length || blocked) process.exit(1);
})().catch((e) => { console.error(e); process.exit(2); });
