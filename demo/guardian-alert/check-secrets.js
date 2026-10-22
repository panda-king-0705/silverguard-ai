#!/usr/bin/env node
// Draft prepared with AI assistance for Dev 2; to be reviewed and edited by the team.
//
// Secrets check: scans the repo for Telegram bot tokens and common API-key patterns.
// Usage (from anywhere):  node demo/guardian-alert/check-secrets.js [folder]
//   folder defaults to the repo root (two levels above this file).
// Exit codes: 0 = nothing found, 1 = possible secret found, 2 = the scan itself failed.
// Skips .git and node_modules, binary files and files over 5 MB.
// Findings show the file, line and kind only. The matched value is never printed in full.
//
// False positive? Add the text "check-secrets: ignore-line" on that line, and say
// why in the pull request. Never use it for a real token: revoke the token instead.
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const SKIP_DIRS = new Set(['.git', 'node_modules']);
const MAX_BYTES = 5 * 1024 * 1024;
const IGNORE_MARKER = 'check-secrets: ignore-line';

// Each rule: [kind, RegExp]. The patterns are written so this file does not match itself.
const RULES = [
  // Telegram bot token: bot ID digits, a colon, then about 35 URL-safe characters
  // (letters, digits, "_" and "-"), containing at least one letter.
  ['Telegram bot token', /(?<![A-Za-z0-9_:-])\d{6,12}:(?=[A-Za-z0-9_-]*[A-Za-z])[A-Za-z0-9_-]{30,40}(?![A-Za-z0-9_-])/g],
  ['AWS access key ID', /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}(?![A-Za-z0-9_-])/g],
  ['GitHub token', /\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{22,})/g],
  ['OpenAI or Anthropic style key', /\bsk-(?:ant-|proj-)?[A-Za-z0-9_-]{20,}/g],
  ['Slack token', /\bxox[abposr]-[A-Za-z0-9-]{10,}/g],
  ['Stripe live key', /\b[rs]k_live_[A-Za-z0-9]{20,}/g],
  ['Private key block', /-----BEGIN (?:[A-Z]+ )*PRIVATE KEY-----/g]
];

function preview(value) {
  return value.slice(0, 4) + '…(' + value.length + ' chars, hidden)';
}

/** Scan one text. Returns [{ line, kind, preview }]. */
function scanText(text) {
  const findings = [];
  const lines = String(text).split(/\r?\n/);
  lines.forEach((lineText, i) => {
    if (lineText.includes(IGNORE_MARKER)) return;
    for (const [kind, re] of RULES) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(lineText)) !== null) {
        findings.push({ line: i + 1, kind, preview: preview(m[0]) });
      }
    }
  });
  return findings;
}

function isBinary(buf) {
  const n = Math.min(buf.length, 8000);
  for (let i = 0; i < n; i++) if (buf[i] === 0) return true;
  return false;
}

/** Scan a folder recursively. Returns { findings: [{ file, line, kind, preview }], filesScanned }. */
function scanDir(root) {
  const findings = [];
  let filesScanned = 0;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) walk(full);
      } else if (entry.isFile()) {
        const size = fs.statSync(full).size;
        if (size > MAX_BYTES) continue;
        const buf = fs.readFileSync(full);
        if (isBinary(buf)) continue;
        filesScanned++;
        for (const f of scanText(buf.toString('utf8'))) {
          findings.push({ file: path.relative(root, full) || entry.name, ...f });
        }
      }
    }
  };
  walk(root);
  return { findings, filesScanned };
}

function main(argv) {
  const root = path.resolve(argv[2] || path.join(__dirname, '..', '..'));
  let report;
  try {
    report = scanDir(root);
  } catch (err) {
    console.error('Secrets check could not run: ' + err.message);
    return 2;
  }
  if (report.findings.length === 0) {
    console.log('Secrets check passed: no bot tokens or API keys found in ' + report.filesScanned + ' text files under ' + root + '.');
    return 0;
  }
  console.error('Secrets check FAILED: ' + report.findings.length + ' possible secret(s) found.');
  for (const f of report.findings) {
    console.error('  ' + f.file + ':' + f.line + '  ' + f.kind + '  ' + f.preview);
  }
  console.error('If a real token or key was committed: revoke it first (for a bot token, in @BotFather), then remove it.');
  return 1;
}

module.exports = { scanText, scanDir, RULES, IGNORE_MARKER };

if (require.main === module) {
  process.exitCode = main(process.argv);
}
