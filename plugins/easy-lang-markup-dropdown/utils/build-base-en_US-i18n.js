#!/usr/bin/env node

/**
 * Build a TinyMCE-style i18n file from calls to translate()
 *
 * Usage:
 *   node build-base-en_US-i18n.js path/to/plugin.ts >path/to/en_US.js
 *
 * Output:
 *   Writes to stdout:
 *     tinymce.addI18n('en_US', {
 *       "Key": "Key",
 *       ...
 *     });
 */

const fs = require('fs');

const LOCALE = 'en_US'; // change if you want a different locale code

// --- CLI args -------------------------------------------------------------

const inputPath = process.argv[2];

if (!inputPath) {
  console.error('Usage: node build-i18n.js path/to/plugin.ts');
  process.exit(1);
}

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

// --- Read source ----------------------------------------------------------

const source = fs.readFileSync(inputPath, 'utf8');

// This regex finds calls to translate("...") in the plugin source.
// It looks specifically for the word "translate(", then captures:
//   (1) the quote type used (' or " or `)
//   (2) the string contents, including escaped characters
// It uses the captured quote to ensure the string closes correctly.
// Example matches:
//   translate("Choose from list")
//   translate('Set language')
//   translate(`Some text`)
const translateCallRegex = /\btranslate\(\s*(['"`])((?:\\.|(?!\1).)*)\1/g;


// --- Extract keys ---------------------------------------------------------

const keys = new Set();
let match;

while ((match = translateCallRegex.exec(source)) !== null) {
  const quote = match[1];
  const raw = match[2];

  let key = raw
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\\\/g, '\\');

  const escQuote = new RegExp('\\\\' + quote, 'g');
  key = key.replace(escQuote, quote);

  keys.add(key);
}

// Preserve encounter order
const orderedKeys = Array.from(keys);

// --- Build output ---------------------------------------------------------

const lines = [];

lines.push(`tinymce.addI18n('${LOCALE}', {`);

orderedKeys.forEach((key, index) => {
  const isLast = index === orderedKeys.length - 1;
  const jsonKey = JSON.stringify(key);
  const jsonVal = JSON.stringify(key);
  lines.push(`  ${jsonKey}: ${jsonVal}${isLast ? '' : ','}`);
});

lines.push('});');
lines.push(''); // final newline

const output = lines.join('\n');

// --- Write to stdout ------------------------------------------------------

process.stdout.write(output);

// --- Log info to stderr (so it doesn't interfere with redirected output) --

console.error(`Extracted ${orderedKeys.length} strings.`);
