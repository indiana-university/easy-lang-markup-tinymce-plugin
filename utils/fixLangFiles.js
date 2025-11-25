// Convert localization keys to use double quotes per JSON requirements.

const fs = require('fs');
const path = require('path');

const LANGS_FOLDER = "/Users/brichwin/dev/easy-lang-markup-tinymce-plugin/plugins/easy-lang-markup-dropdown/src/langs";
const FIXED_LANGS_FOLDER = "/Users/brichwin/dev/easy-lang-markup-tinymce-plugin/plugins/easy-lang-markup-dropdown/src/langsFixed";

function convertLangFile(inputFile, outputFile) {
  console.log(`Converting\n  ${inputFile} to\n  ${outputFile}\n`);

  const fileContents = fs.readFileSync(inputFile, 'utf8');

  // Match the JS object inside addI18n
  const match = fileContents.match(/addI18n\s*\(\s*['"]([^'"]+)['"]\s*,\s*(\{[\s\S]*\})\s*\)/);

  if (!match) {
    console.error('❌ Could not extract localization object from file.');
    process.exit(1);
  }

  let langCode = match[1];
  let jsObjectString = match[2];

  // Convert single-quoted keys → double-quoted keys, escaping internal double quotes
  jsObjectString = jsObjectString.replace(/'([^']*)'\s*:/g, (_, key) => {
    return `"${key.replace(/"/g, '\\"')}":`;
  });
  
  // Convert single-quoted values → double-quoted values, escaping internal double quotes
  jsObjectString = jsObjectString.replace(/:\s*'([^']*)'/g, (_, value) => {
    return `: "${value.replace(/"/g, '\\"')}"`;
  });

  // Parse to JS object to validate and output pretty JSON
  let jsonObject;

  try {
    jsonObject = (new Function('return ' + jsObjectString))();
  } catch (err) {
    console.error('❌ Failed to parse localization object:', err.message);
    console.log(jsObjectString);
    process.exit(1);
  }

  fs.writeFileSync(outputFile, `tinymce.addI18n('${langCode.replace(/-/g,'_')}', ${JSON.stringify(jsonObject, null, 2)});`, 'utf8');
  console.log(`✅ Converted to ${outputFile}\n`);

}

function processAllLocalizationFiles() {
  if (!fs.existsSync(LANGS_FOLDER)) {
    console.log(`LANGS_FOLDER: ${LANGS_FOLDER} does not exist.`);
    return;
  }
  
  const allLocalizationFiles = fs.readdirSync(LANGS_FOLDER).filter((file) => file.endsWith('.js'));

  allLocalizationFiles.forEach(file => {
    inputFile = path.join(LANGS_FOLDER, file);
    outputFile = path.join(FIXED_LANGS_FOLDER, file);
    convertLangFile(inputFile, outputFile);
  });
}

processAllLocalizationFiles();




