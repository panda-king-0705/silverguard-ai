#!/usr/bin/env node
/*
 * Draft prepared with AI assistance for the Dev 1 role; to be reviewed and edited by the team.
 *
 * Copies engine.js into index.html between the ENGINE:START and ENGINE:END markers,
 * so index.html stays a single file that works offline. Run after editing engine.js:
 *   node sync-page.js
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const pagePath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(pagePath, 'utf8');
const engine = fs.readFileSync(path.join(__dirname, 'engine.js'), 'utf8');
const start = '/* ENGINE:START */\n';
const end = '/* ENGINE:END */';
const a = html.indexOf(start);
const b = html.indexOf(end);
if (a === -1 || b < a) {
  console.error('Engine markers not found in index.html');
  process.exit(1);
}
fs.writeFileSync(pagePath, html.slice(0, a + start.length) + engine + html.slice(b));
console.log('index.html now embeds the current engine.js');
