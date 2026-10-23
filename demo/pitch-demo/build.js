#!/usr/bin/env node
/*
 * Draft prepared with AI assistance for Dev 2; to be reviewed and edited by the team.
 *
 * Copies the current engine.js, alert.js and scamcheck-alert.js into index.html between marker
 * comments, so index.html stays ONE offline file and picks up later fixes when this script is re-run.
 *
 *   node build.js           rewrite index.html from the sources
 *   node build.js --check   change nothing; exit 1 if index.html is out of date
 *
 * Sources (read only, except scamcheck-alert.js which lives here):
 *   ../scam-check-web/engine.js   -> /* ENGINE:START *\/ ... /* ENGINE:END *\/
 *   ../guardian-alert/alert.js    -> /* ALERT:START *\/ ... /* ALERT:END *\/
 *   ./scamcheck-alert.js          -> /* SCAMALERT:START *\/ ... /* SCAMALERT:END *\/
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const PAGE = path.join(__dirname, 'index.html');

const SOURCES = [
  { name: 'ENGINE', file: path.join(__dirname, '..', 'scam-check-web', 'engine.js') },
  { name: 'ALERT', file: path.join(__dirname, '..', 'guardian-alert', 'alert.js') },
  { name: 'SCAMALERT', file: path.join(__dirname, 'scamcheck-alert.js') }
];

function markers(name) {
  return { start: '/* ' + name + ':START */\n', end: '/* ' + name + ':END */' };
}

/** Source text as it is embedded: always ends with a newline so the END marker is on its own line. */
function embeddedText(file) {
  const text = fs.readFileSync(file, 'utf8');
  if (/<\/script/i.test(text) || text.includes('<!--')) {
    throw new Error(path.basename(file) + ' contains "</script" or "<!--", which would break the inline <script>. Remove it from the source.');
  }
  return text.endsWith('\n') ? text : text + '\n';
}

/** Returns the page with each source copied between its markers. Throws if a marker is missing. */
function embed(html, sources) {
  let out = html;
  for (const s of sources) {
    const m = markers(s.name);
    const a = out.indexOf(m.start);
    const b = out.indexOf(m.end, a + 1);
    if (a === -1 || b === -1 || b < a) throw new Error('Markers for ' + s.name + ' not found in index.html');
    out = out.slice(0, a + m.start.length) + embeddedText(s.file) + out.slice(b);
  }
  return out;
}

function main(argv) {
  const check = argv.includes('--check');
  const html = fs.readFileSync(PAGE, 'utf8');
  let next;
  try {
    next = embed(html, SOURCES);
  } catch (err) {
    console.error(err.message);
    return 1;
  }
  if (check) {
    if (next !== html) {
      console.error('index.html is out of date. Run: node demo/pitch-demo/build.js');
      return 1;
    }
    console.log('index.html is up to date with engine.js, alert.js and scamcheck-alert.js');
    return 0;
  }
  if (next === html) {
    console.log('index.html already embeds the current engine.js, alert.js and scamcheck-alert.js (no change)');
  } else {
    fs.writeFileSync(PAGE, next);
    console.log('index.html now embeds the current engine.js, alert.js and scamcheck-alert.js');
  }
  return 0;
}

if (require.main === module) process.exit(main(process.argv.slice(2)));

module.exports = { SOURCES, markers, embeddedText, embed, PAGE };
