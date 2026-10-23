#!/usr/bin/env node
/*
 * Draft prepared with AI assistance for the Dev 1 role; to be reviewed and edited by the team.
 *
 * Runs the Scam Check engine on held-out-set.json (12 messages never used to tune the rules).
 *   node evaluate-heldout.js              plain-text table
 *   node evaluate-heldout.js --markdown   Markdown table (for README.md)
 */
'use strict';

const path = require('node:path');
const { evaluate } = require('./evaluate.js');
const heldOut = require(path.join(__dirname, 'held-out-set.json'));

const result = evaluate(heldOut);
const md = process.argv.includes('--markdown');
if (md) {
  console.log('| ID | Kind | Lang | Expected | Engine | Match | Cues found |');
  console.log('| --- | --- | --- | --- | --- | --- | --- |');
  result.rows.forEach((r) =>
    console.log(`| ${r.id} | ${r.kind} | ${r.language} | ${r.expected} | ${r.got} | ${r.match ? 'yes' : '**no**'} | ${r.cues} |`)
  );
} else {
  result.rows.forEach((r) =>
    console.log([r.id, r.kind, r.language, r.expected.padEnd(22), r.got.padEnd(22), r.match ? 'yes' : 'NO ', r.cues].join('  '))
  );
}
const s = result.summary;
console.log('');
console.log(`Scam messages rated "High risk": ${s.scamsHighRisk}/${s.scamTotal} (flagged at any level: ${s.scamsFlagged}/${s.scamTotal})`);
console.log(`Genuine messages rated "High risk": ${s.genuineHighRisk}/${s.genuineTotal}`);
console.log(`Engine level equals expected level: ${s.levelMatches}/${s.total}`);
