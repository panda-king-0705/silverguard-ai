// Draft prepared with AI assistance for Dev 1 (DEV-3 demo hardening); to be reviewed and edited by the team.
// The pitch run sheet shows this page on the projector in beat 6. Browser check on 6 Nov 2026 found
// text down to 14 px (clock, button labels, footer) and a 15 px mock-mode label. These tests keep the
// same 20 px floor the combined pitch demo uses, and keep the mock label prominent.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const css = html.slice(html.indexOf('<style>'), html.indexOf('</style>'));

test('no font size below 20 px, in px units so it can be checked', () => {
  const sizes = [...css.matchAll(/font(?:-size)?:\s*(\d+(?:\.\d+)?)px/g)].map((m) => Number(m[1]));
  assert.ok(sizes.length > 10);
  assert.ok(Math.min(...sizes) >= 20, 'smallest font size is ' + Math.min(...sizes) + 'px');
  assert.doesNotMatch(css, /font-size:\s*[\d.]+(?:em|rem|%|pt)/);
});

test('the mock-mode label is at least 20 px, bold and outlined', () => {
  const rule = css.match(/\.mode-pill\s*\{([^}]*)\}/)[1];
  assert.ok(Number(rule.match(/font-size:\s*(\d+)px/)[1]) >= 20);
  assert.ok(Number(rule.match(/font-weight:\s*(\d+)/)[1]) >= 700);
  assert.match(rule, /border:\s*2px solid/);
});
