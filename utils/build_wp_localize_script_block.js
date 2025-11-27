#!/usr/bin/env node

/**
 * build_wp_localize_script_block.js
 * --------------------------------------------------------------
 * Extracts strings passed to translate("...") in the plugin source
 * and generates::
 *
 *   A wp_localize_script() block for Pressbooks (to STDOUT)
 *
 * Usage:
 *   node build_wp_localize_script_block.js path/to/plugin.ts > wp_localize_script_block.tmp
 *
 * The PHP block is printed to STDOUT.
 */

const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: node build_wp_localize_script_block.js <plugin.ts>');
  process.exit(1);
}

const inputFile = process.argv[2];
const source = fs.readFileSync(inputFile, 'utf8');

// ---------------------------------------------------------------------------
// STEP 1: Extract all strings passed to translate("...") or translate('...')
// ---------------------------------------------------------------------------

const regex = /translate\s*\(\s*(['"])(.*?)\1\s*[\),]/g;
let match;
const keys = new Set();

while ((match = regex.exec(source))) {
  const key = match[2].trim();
  if (key.length > 0) keys.add(key);
}

const orderedKeys = Array.from(keys);

// ---------------------------------------------------------------------------
// STEP 2: Generate wp_localize_script block (stderr)
// ---------------------------------------------------------------------------

function phpEscape(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n');
}

const phpLines = [];
phpLines.push('/* --------------------------------------------------------------');
phpLines.push(' * Paste this into namespace.php inside admin_enqueue_scripts()');
phpLines.push(' * --------------------------------------------------------------');
phpLines.push(' */');
phpLines.push('');
phpLines.push("wp_localize_script('editor', 'PB_EasyLangToken', [");

orderedKeys.forEach((key, i) => {
  const escaped = phpEscape(key);
  const comma = i < orderedKeys.length - 1 ? ',' : '';
  phpLines.push(`    '${escaped}' => __('${escaped}', 'pressbooks')${comma}`);
});

phpLines.push(']);');
phpLines.push('');

process.stdout.write(phpLines.join('\n'));

console.error(`Extracted ${orderedKeys.length} strings.`);
