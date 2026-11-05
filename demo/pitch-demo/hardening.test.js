// Draft prepared with AI assistance for Dev 1; to be reviewed and edited by the team.
// DEV-3 (issue #13 D7) regression tests for the projector-layout fix in index.html.
// The full in-browser check (real Chromium, network blocked, 1366x768 and 1920x1080) is
// browser-check.js; these static checks run anywhere with plain "node --test".
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const css = html.slice(html.indexOf('<style>'), html.indexOf('</style>'));
const body = html.slice(html.indexOf('<body>'));

test('the call trigger and its status come before the phone card, so they show on a 768 px high screen', () => {
  const btn = body.indexOf('id="simulateBtn"');
  const status = body.indexOf('id="callStatus"');
  const phone = body.indexOf('class="phone"');
  assert.ok(btn > 0 && status > 0 && phone > 0);
  assert.ok(btn < phone, 'Simulate unknown call must sit above the phone');
  assert.ok(status < phone, 'the mock/live status line must sit above the phone');
});

test('no text tells the presenter to press a button "below" (it is now above)', () => {
  assert.doesNotMatch(html, /button below/i);
});

test('a short-screen rule removes the tall phone minimum height', () => {
  const m = css.match(/@media \(max-height:\s*(\d+)px\)\s*\{([\s\S]*?)\n  \}/);
  assert.ok(m, 'expected an @media (max-height: ...) block');
  assert.ok(Number(m[1]) >= 768, 'the rule must apply at 768 px high');
  assert.match(m[2], /\.phone\s*\{[^}]*min-height:\s*0/);
});

test('short-screen rules keep the 20 px type floor and 64 px buttons', () => {
  const sizes = [...css.matchAll(/font-size:\s*(\d+)px/g)].map((x) => Number(x[1]));
  assert.ok(Math.min(...sizes) >= 20);
  assert.doesNotMatch(css, /@media \(max-height[^{]*\{[^@]*button\s*\{[^}]*min-height:\s*[0-5]?\dpx/);
});
