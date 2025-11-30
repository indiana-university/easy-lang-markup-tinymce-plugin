#!/usr/bin/env node
/**
 * Find all config parameters used with getEditorConfigParameter()
 *
 * Usage:
 *   node find-config-params.js path/to/plugin.ts
 *
 * If no path is given, it defaults to "./plugin.ts" in the current directory.
 */

const fs = require('fs');
const path = require('path');

function main() {
  const targetPath = process.argv[2] || path.join(process.cwd(), 'plugin.ts');

  if (!fs.existsSync(targetPath)) {
    console.error('Error: file not found:', targetPath);
    process.exit(1);
  }

  const source = fs.readFileSync(targetPath, 'utf8');

  // Match: getEditorConfigParameter('param_name', ...)
  const paramRegex = /getEditorConfigParameter\(\s*['"]([^'"]+)['"]/g;

  const paramInfo = new Map(); // name -> { count, firstIndex }

  let match;
  while ((match = paramRegex.exec(source)) !== null) {
    const name = match[1];
    if (!paramInfo.has(name)) {
      paramInfo.set(name, { count: 0, firstIndex: match.index });
    }
    const info = paramInfo.get(name);
    info.count += 1;
  }

  if (paramInfo.size === 0) {
    console.log('No getEditorConfigParameter(...) calls found.');
    return;
  }

  // Helper: compute line number from character index
  const lineCache = [];
  function getLineNumber(index) {
    // Lazy build of line starts
    if (lineCache.length === 0) {
      let pos = 0;
      lineCache.push(0); // line 1 starts at index 0
      while (true) {
        const next = source.indexOf('\n', pos);
        if (next === -1) break;
        lineCache.push(next + 1);
        pos = next + 1;
      }
    }
    // Binary search to find line for index
    let low = 0;
    let high = lineCache.length - 1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (lineCache[mid] <= index) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return high + 1; // 1-based line number
  }

  // Turn map into sorted array
  const entries = Array.from(paramInfo.entries()).map(([name, info]) => {
    return {
      name,
      count: info.count,
      line: getLineNumber(info.firstIndex)
    };
  }).sort((a, b) => a.name.localeCompare(b.name));

  const easylangParams = entries.filter(e => e.name.startsWith('easylang_'));
  const otherParams = entries.filter(e => !e.name.startsWith('easylang_'));

  console.log('Config parameters found in', path.relative(process.cwd(), targetPath));
  console.log('');

  if (easylangParams.length) {
    console.log('Plugin-specific parameters (prefix "easylang_"):\n');
    easylangParams.forEach(e => {
      console.log(
        `  - ${e.name}  (first seen on line ${e.line}, used ${e.count} time${e.count > 1 ? 's' : ''})`
      );
    });
    console.log('');
  }

  if (otherParams.length) {
    console.log('Other config parameters used by the plugin:\n');
    otherParams.forEach(e => {
      console.log(
        `  - ${e.name}  (first seen on line ${e.line}, used ${e.count} time${e.count > 1 ? 's' : ''})`
      );
    });
    console.log('');
  }

  if (easylangParams.length) {
    console.log('Plugin-specific parameters (prefix "easylang_"):\n');
    easylangParams.forEach(e => {
      console.log(
        `  - ${e.name}`
      );
    });
    console.log('');
  }

  if (otherParams.length) {
    console.log('Other config parameters used by the plugin:\n');
    otherParams.forEach(e => {
      console.log(
        `  - ${e.name}`
      );
    });
    console.log('');
  }
}

main();
