// esbuild.config.mjs
import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';

// Function to create test-friendly TypeScript file
const createTestFiles = () => {
  const sourceContent = readFileSync('src/plugin.ts', 'utf8');
  const testContent = sourceContent + '\nexport { LanguageSelect };\n';
  writeFileSync('__tests__/plugin-for-tests.ts', testContent);

  const sourceContent2 = readFileSync('src/plugin_types.ts', 'utf8');
  writeFileSync('__tests__/plugin_types.ts', sourceContent2);
};


// Common settings
const entryFile = 'src/plugin.ts';
const bannerText = `/*! 
* langSelect plugin.js
* SPDX-License-Identifier: GPL-3.0-only
* 
* Copyright (c) 2018 The Trustees of Indiana University
* Author: Brian Richwine
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License version 3 only,
* as published by the Free Software Foundation.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <https://www.gnu.org/licenses/>.
*/`;

const builds = [
  // Build for TinyMCE plugin
  {
    outfile: 'dist/plugins/languageSelect/plugin.min.js',
    format: 'cjs',
    minify: false,
    banner: {
      js: `${bannerText}\n\n`
    },
    footer: {
      js: `
  tinymce.PluginManager.add('languageSelect', (editor, url) => {
    const plugin = new LanguageSelect(editor, url);
    plugin.init();
    return {
      name: 'languageSelect',
    };
  });
  tinymce.PluginManager.requireLangPack('languageSelect', 'ar,de,en,es,es_MX,fr,fr_CA,it,ja,ko,nl,pt,pt_BR,ru,uk,zh_CN,zh_TW');`
    },
    target: 'es2015'
  }
];

// Create test file first
createTestFiles();

// Run both builds
Promise.all(
  builds.map((opts) =>
    build({
      entryPoints: [entryFile],
      bundle: true,
      target: 'es2015',
      platform: 'browser',
      ...opts,
    })
  )
)
  .then(() => {
    console.log('✅ All builds completed successfully');
  })
  .catch((err) => {
    console.error('❌ Build failed:', err);
    process.exit(1);
  });