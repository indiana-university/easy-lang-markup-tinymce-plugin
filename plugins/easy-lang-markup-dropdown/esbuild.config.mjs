// esbuild.config.mjs
import { build } from 'esbuild';
import { readFileSync, writeFileSync, copyFileSync, readdirSync, mkdirSync } from 'fs';
import { join, extname } from 'path';

// Function to create test-friendly TypeScript file
const createTestFiles = () => {
  const sourceContent = readFileSync('src/plugin.ts', 'utf8');
  const testContent = sourceContent + '\nexport { LanguageSelect };\n';
  writeFileSync('dist/plugin_for_tests/plugin-for-tests.ts', testContent);

  const sourceContent2 = readFileSync('src/plugin_types.ts', 'utf8');
  writeFileSync('dist/plugin_for_tests/plugin_types.ts', sourceContent2);
};

// Function to copy language files
const copyLangFiles = () => {
  const srcLangsDir = 'src/langs';
  const destLangsDir = 'dist/plugins/languageSelect/langs';
  
  try {
    // Create destination directory if it doesn't exist
    mkdirSync(destLangsDir, { recursive: true });
    
    // Read all files from source langs directory
    const files = readdirSync(srcLangsDir);
    
    // Copy only .js files
    files.forEach(file => {
      if (extname(file) === '.js') {
        const srcPath = join(srcLangsDir, file);
        const destPath = join(destLangsDir, file);
        copyFileSync(srcPath, destPath);
        console.log(`📄 Copied ${file} to ${destLangsDir}`);
      }
    });
    
    console.log('✅ Language files copied successfully');
  } catch (error) {
    console.error('❌ Failed to copy language files:', error);
    throw error;
  }
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

// Run all builds
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
    copyLangFiles();
    console.log('✅ All builds completed successfully');
  })
  .catch((err) => {
    console.error('❌ Build failed:', err);
    process.exit(1);
  });