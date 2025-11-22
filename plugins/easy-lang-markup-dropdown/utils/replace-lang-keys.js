#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Extract the language name mappings from the English file
 * @param {string} content - Content of the en.js file
 * @returns {Object} - Map of langName.code to English name
 */
function extractLangNameMappings(content) {
  const mappings = {};
  
  // Match all langName.* entries in the format "langName.XX": "English Name"
  const regex = /"langName\.([\w-]+)":\s*"([^"]+)"/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const key = `langName.${match[1]}`;
    const englishValue = match[2];
    mappings[key] = englishValue;
  }
  
  return mappings;
}

/**
 * Replace langName.* keys with English values in a file
 * @param {string} content - File content
 * @param {Object} mappings - Map of langName.code to English name
 * @returns {string} - Updated content
 */
function replaceLangNameKeys(content, mappings) {
  let updatedContent = content;
  
  // Replace each langName.* key with its English equivalent
  for (const [langKey, englishName] of Object.entries(mappings)) {
    // Escape special regex characters in the key
    const escapedKey = langKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Match the key in quotes and replace it with the English name
    const regex = new RegExp(`"${escapedKey}"(:\\s*)`, 'g');
    updatedContent = updatedContent.replace(regex, `"${englishName}"$1`);
  }
  
  return updatedContent;
}

/**
 * Process all translation files in a directory
 * @param {string} folderPath - Path to the folder containing translation files
 */
function processTranslationFiles(folderPath) {
  // Resolve the folder path
  const resolvedPath = path.resolve(folderPath);
  
  // Check if the folder exists
  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: Folder '${resolvedPath}' does not exist.`);
    process.exit(1);
  }
  
  // Find the en.js file
  const enFilePath = path.join(resolvedPath, 'en.js');
  if (!fs.existsSync(enFilePath)) {
    console.error(`Error: en.js file not found in '${resolvedPath}'.`);
    process.exit(1);
  }
  
  // Read and parse the English file
  console.log('Reading en.js to extract language name mappings...');
  const enContent = fs.readFileSync(enFilePath, 'utf8');
  const mappings = extractLangNameMappings(enContent);
  
  console.log(`Found ${Object.keys(mappings).length} language name mappings.\n`);
  
  // Get all .js files in the directory
  const files = fs.readdirSync(resolvedPath)
    .filter(file => file.endsWith('.js'))
    .map(file => path.join(resolvedPath, file));
  
  // Process each file
  let processedCount = 0;
  let skippedCount = 0;
  
  for (const filePath of files) {
    const fileName = path.basename(filePath);
    
    try {
      // Read the file
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Replace langName keys
      const updatedContent = replaceLangNameKeys(content, mappings);
      
      // Check if anything changed
      if (content === updatedContent) {
        console.log(`⊘ ${fileName} - No changes needed`);
        skippedCount++;
      } else {
        // Create a backup
        const backupPath = `${filePath}.bak`;
        fs.writeFileSync(backupPath, content, 'utf8');
        
        // Write the updated content
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`✓ ${fileName} - Updated (backup: ${fileName}.bak)`);
        processedCount++;
      }
    } catch (error) {
      console.error(`✗ ${fileName} - Error: ${error.message}`);
    }
  }
  
  console.log(`\n--- Summary ---`);
  console.log(`Files processed: ${processedCount}`);
  console.log(`Files skipped: ${skippedCount}`);
  console.log(`Total files: ${files.length}`);
  console.log(`\nBackup files (.bak) have been created for all modified files.`);
}

// Main execution
if (process.argv.length < 3) {
  console.log('Usage: node replace-lang-keys.js <path-to-folder>');
  console.log('\nExample: node replace-lang-keys.js ./i18n');
  process.exit(1);
}

const folderPath = process.argv[2];
processTranslationFiles(folderPath);
