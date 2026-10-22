#!/usr/bin/env node
/*
 * Draft prepared with AI assistance for the Dev 1 role; to be reviewed and edited by the team.
 *
 * Runs the Scam Check engine on test-set.json and prints a results table.
 *   node evaluate.js            plain-text table
 *   node evaluate.js --markdown Markdown table (for README.md)
 */
'use strict';

const path = require('node:path');
const { assess, LEVELS } = require('./engine.js');
const testSet = require(path.join(__dirname, 'test-set.json'));

function evaluate(items = testSet) {
  const rows = items.map((item) => {
    const result = assess(item.text);
    return {
      id: item.id,
      kind: item.kind,
      language: item.language,
      expected: item.expected_level,
      got: result.level,
      match: result.level === item.expected_level,
      cues: result.cues.map((c) => c.family).join(', ') || '-'
    };
  });
  const scams = rows.filter((r) => r.kind === 'scam');
  const genuine = rows.filter((r) => r.kind === 'genuine');
  const summary = {
    scamsHighRisk: scams.filter((r) => r.got === LEVELS.HIGH).length,
    scamsFlagged: scams.filter((r) => r.got !== LEVELS.NONE).length,
    scamTotal: scams.length,
    genuineHighRisk: genuine.filter((r) => r.got === LEVELS.HIGH).length,
    genuineNoWarning: genuine.filter((r) => r.got === LEVELS.NONE).length,
    genuineTotal: genuine.length,
    levelMatches: rows.filter((r) => r.match).length,
    total: rows.length
  };
  return { rows, summary };
}

function printPlain({ rows, summary }) {
  const head = ['ID', 'Kind', 'Lang', 'Expected', 'Engine', 'Match', 'Cues found'];
  const body = rows.map((r) => [r.id, r.kind, r.language, r.expected, r.got, r.match ? 'yes' : 'NO', r.cues]);
  const widths = head.map((h, i) => Math.max(h.length, ...body.map((b) => String(b[i]).length)));
  const line = (cells) => cells.map((c, i) => String(c).padEnd(widths[i])).join('  ');
  console.log(line(head));
  console.log(widths.map((w) => '-'.repeat(w)).join('  '));
  body.forEach((b) => console.log(line(b)));
  console.log('');
  printSummary(summary);
}

function printMarkdown({ rows, summary }) {
  console.log('| ID | Kind | Lang | Expected | Engine | Match | Cues found |');
  console.log('| --- | --- | --- | --- | --- | --- | --- |');
  rows.forEach((r) =>
    console.log(`| ${r.id} | ${r.kind} | ${r.language} | ${r.expected} | ${r.got} | ${r.match ? 'yes' : '**no**'} | ${r.cues} |`)
  );
  console.log('');
  printSummary(summary);
}

function printSummary(s) {
  console.log(`Scam messages rated "High risk": ${s.scamsHighRisk}/${s.scamTotal} (flagged at any level: ${s.scamsFlagged}/${s.scamTotal})`);
  console.log(`Genuine messages rated "High risk": ${s.genuineHighRisk}/${s.genuineTotal} ("No warning signs found": ${s.genuineNoWarning}/${s.genuineTotal})`);
  console.log(`Engine level equals expected level: ${s.levelMatches}/${s.total}`);
}

if (require.main === module) {
  const result = evaluate();
  if (process.argv.includes('--markdown')) printMarkdown(result);
  else printPlain(result);
}

module.exports = { evaluate };
