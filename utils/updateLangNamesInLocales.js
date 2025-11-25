// Convert localization keys to use double quotes per JSON requirements.

const fs = require('fs');
const path = require('path');

const LANGS_FOLDER = "/Users/brichwin/dev/easy-lang-markup-tinymce-plugin/plugins/easy-lang-markup-dropdown/src/langs";
const FIXED_LANGS_FOLDER = "/Users/brichwin/dev/easy-lang-markup-tinymce-plugin/plugins/easy-lang-markup-dropdown/src/langsFixed";
const PATH_TO_CLDR_LANG_FOLDERS = '/Users/brichwin/dev/easy-lang-markup-tinymce-plugin/plugins/easy-lang-markup-dropdown/utils/cldr-localenames-full/main';

const langAtts = {
  "af": "Afrikaans",
  "af-za": "Afrikaans (Suid-Afrika)",
  "ak": "Akan",
  "am": "አማርኛ",
  "ar": "العربية",
  "ar-eg": "العربية (مصر)",
  "ar-ma": "العربية (المغرب)",
  "ar-sa": "العربية (السعودية)",
  "az": "azərbaycan",
  "be": "беларуская",
  "bg": "български",
  "bg-bg": "български (България)",
  "bho": "भोजपुरी",
  "bm": "bamanakan",
  "bn": "বাংলা",
  "bo": "བོད་སྐད་",
  "bs": "bosanski",
  "ca": "català",
  "cop": "ⲘⲉⲧⲢⲉⲙⲛ̀ⲭⲏⲙⲓ",
  "cr": "ᓀᐦᐃᔭᐍᐏᐣ",
  "cs": "čeština",
  "cu": "ѩзыкъ словѣньскъ",
  "cy": "Cymraeg",
  "da": "dansk",
  "de": "Deutsch",
  "de-at": "Österreichisches Deutsch",
  "de-ch": "Schweizer Hochdeutsch",
  "de-de": "Deutsch (Deutschland)",
  "dv": "ދިވެހިބަސް",
  "el": "Ελληνικά",
  "en-au": "Australian English",
  "en-ca": "Canadian English",
  "en-gb": "British English",
  "en-ie": "English (Ireland)",
  "en-in": "English (Indian)",
  "en-tt": "English (Trinidad)",
  "en-us": "English (United States)",
  "en-za": "English (South Africa)",
  "en": "English",
  "eo": "Esperanto",
  "es-ar": "español de Argentina",
  "es-cl": "español de Chile",
  "es-co": "español de Colombia",
  "es-cr": "español de Costa Rica",
  "es-es": "español de España",
  "es-mx": "español de México",
  "es-pe": "español de Perú",
  "es": "español",
  "et": "eesti",
  "eu": "euskara",
  "fa": "فارسی",
  "fa-af": "دری",
  "fa-ir": "فارسی (ایران)",
  "ff": "Pulaar",
  "fi": "suomi",
  "fi-fi": "suomi (Suomi)",
  "fil": "Filipino",
  "fr-be": "français (Belgique)",
  "fr-ca": "français canadien",
  "fr-ch": "français suisse",
  "fr": "français",
  "ga": "Gaeilge",
  "gl": "galego",
  "grc": "Ἀρχαία ἑλληνικὴ",
  "ha": "Hausa",
  "he": "עברית",
  "he-il": "עברית (ישראל)",
  "hi": "हिन्दी",
  "hr": "hrvatski",
  "hr-hr": "hrvatski (Hrvatska)",
  "ht": "Kreyòl Ayisyen",
  "hu": "magyar",
  "hu-hu": "magyar (Magyarország)",
  "hy": "հայերեն",
  "id": "Indonesia",
  "ig": "Igbo",
  "is": "íslenska",
  "it": "italiano",
  "it-it": "italiano (Italia)",
  "iu": "ᐃᓄᒃᑎᑐᑦ",
  "ja": "日本語",
  "ja-jp": "日本語 (日本)",
  "ka": "ქართული",
  "kab": "Taqbaylit",
  "kk": "қазақ тілі",
  "km": "ខ្មែរ",
  "kn": "ಕನ್ನಡ",
  "ko": "한국어",
  "ko-kr": "한국어 (대한민국)",
  "la": "Latina",
  "lkt": "Lakȟólʼiyapi",
  "lo": "ລາວ",
  "lv": "latviešu",
  "lt": "lietuvių",
  "mi": "Māori",
  "mn": "монгол",
  "mr": "मराठी",
  "ms": "Melayu",
  "mt": "Malti",
  "my": "မြန်မာ",
  "nb": "norsk bokmål",
  "nb-no": "norsk bokmål (Norge)",
  "ne": "नेपाली",
  "nl-be": "Vlaams",
  "nl": "Nederlands",
  "nn": "norsk nynorsk",
  "nv": "Diné Bizaad",
  "ota": "لسان عثمانى",
  "pa": "ਪੰਜਾਬੀ",
  "peo": "𐎱𐎠𐎼𐎿",
  "pl": "polski",
  "ps": "پښتو",
  "pt-br": "Português do Brasil",
  "pt-pt": "português europeu",
  "pt": "português",
  "qu": "Runasimi",
  "ro": "română",
  "ru": "русский",
  "rw": "Ikinyarwanda",
  "sa": "संस्कृत भाषा",
  "se": "davvisámegiella",
  "sk-sk": "slovenčina (Slovensko)",
  "si": "සිංහල",
  "sl": "slovenščina",
  "sl-si": "slovenščina (Slovenija)",
  "sma": "Åarjelsaemien gïele",
  "sme": "davvisámegiella",
  "smj": "julevsámegiella",
  "sn": "chiShona",
  "sr": "српски",
  "sr-latn": "srpski (latinica)",
  "sv": "svenska",
  "sv-se": "svenska (Sverige)",
  "sw": "Kiswahili",
  "sw-ke": "Kiswahili (Kenya)",
  "sw-tz": "Kiswahili (Tanzania)",
  "syc": "ܠܫܢܐ ܣܘܪܝܝܐ",
  "ta": "தமிழ்",
  "te": "తెలుగు",
  "tg": "тоҷикӣ",
  "th": "ไทย",
  "th-th": "ไทย (ไทย)",
  "tk": "türkmen dili",
  "tl": "Tagalog",
  "tr": "Türkçe",
  "tr-tr": "Türkçe (Türkiye)",
  "tt": "татар",
  "ug": "ئۇيغۇرچە",
  "uk": "українська",
  "ur": "اردو",
  "uz": "o‘zbek",
  "vi": "Tiếng Việt",
  "wo": "Wolof",
  "xh": "IsiXhosa",
  "yi": "ייִדיש",
  "yo": "Èdè Yorùbá",
  "yua": "Maaya T'aan",
  "zh-cn": "中文（中国）",
  "zh-hans": "简体中文",
  "zh-hant": "繁體中文",
  "zh-hk": "中文（香港）",
  "zh-sg": "中文（新加坡）",
  "zh-tw": "中文（台灣）",
  "zh": "中文",
  "zu": "isiZulu",
  "zu-za": "isiZulu (iNingizimu Afrika)"
};

const equivalentLocales = {
  "en": "en-us",
  "en-us": "en",
  "uk": "uk-ua",
  "uk-ua": "uk",
  "zh": "zh-cn",
  "zh-hans": "zh-cn",
  "zh-cn": "zh-hans",
  "zh-hant": "zh-tw",
  "zh-tw": "zh-hant",
  "es": "es-es",
  "es-es": "es",
  "fr": "fr-fr",
  "fr-fr": "fr",
  "de": "de-de",
  "de-de": "de",
  "it": "it-it",
  "it-it": "it",
  "ja": "ja-jp",
  "ja-jp": "ja",
  "ko": "ko-kr",
  "ko-kr": "ko",
  "pt": "pt-pt",
  "pt-pt": "pt",
  "ru": "ru-ru",
  "ru-ru": "ru",
  "ar": "ar-sa",
  "ar-sa": "ar",
  "sv": "sv-se",
  "sv-se": "sv",
  "nb": "nb-no",
  "nb-no": "nb",
  "fi": "fi-fi",
  "fi-fi": "fi",
  "hu": "hu-hu",
  "hu-hu": "hu",
  "hr": "hr-hr",
  "hr-hr": "hr",
  "bg": "bg-bg",
  "bg-bg": "bg",
  "sk": "sk-sk",
  "sk-sk": "sk",
  "sl": "sl-si",
  "sl-si": "sl",
  "he": "he-il",
  "he-il": "he",
  "th": "th-th",
  "th-th": "th",
  "tr": "tr-tr",
  "tr-tr": "tr",
  "fa": "fa-ir",
  "fa-ir": "fa",
  "sw": "sw-ke",
  "sw-ke": "sw",
  "af": "af-za",
  "af-za": "af",
  "zu": "zu-za",
  "zu-za": "zu",
  "ko-kr": "ko",
  "ko": "ko-kr",
  "nb-no": "nb",
  "nb": "nb-no",
  "pt-br": "pt",
  "pt": "pt-br",
  "sk": "sk-sk",
  "sk-sk": "sk",
  "sl-si": "sl",
  "sl": "sl-si",
  "sv-se": "sv",
  "sv": "sv-se",
  "sw-tz": "sw",
  "sw": "sw-tz",
  "th": "th-th",
  "th-th": "th",
  "fil": "tl",
  "tl": "fil",
  "tr-tr": "tr",
  "tr": "tr-tr",
  "da-x-k12": "da",
  "sv-x-k12": "sv",
  "nb-x-k12": "nb",
  "vi-VN": "vi"
};

const languageCodes = Object.keys(langAtts);


function isNotBlank(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function baseLanguage(langValue) {
  if (!langValue) return '';

  // Trim whitespace and remove any characters following a dash, underscore, or space
  return langValue.trim().replace(/[-_\s].*$/, '');
}

function cleanLangAttr(langValue) {
  if (!langValue) return langValue || '';

  // Trim whitespace and split by spaces, taking only the first token
  const [firstToken] = langValue.trim().split(/\s+/);

  if (!firstToken) return '';

  // Handle private use tags (x-*) - keep them lowercase
  if (firstToken.toLowerCase().startsWith('x-')) {
    return firstToken.toLowerCase();
  }

  // Split by hyphens or underscores
  const parts = firstToken.split(/[-_]/);

  if (parts.length === 1) {
    // Single part - just return lowercase
    return parts[0].toLowerCase();
  }

  // Multiple parts - apply BCP 47 formatting rules
  const formattedParts = parts.map((part, index) => {
    const lowerPart = part.toLowerCase();

    if (index === 0) {
      // Language code (first part) - always lowercase
      return lowerPart;
    } else if (index === 1) {
      // Second part could be script or region
      if (part.length === 4) {
        // 4-letter = Script code (e.g., Hans, Latn, Deva)
        return part.charAt(0).toUpperCase() + lowerPart.slice(1);
      } else if (part.length === 2) {
        // 2-letter = Region code (e.g., US, GB, FR)
        return part.toUpperCase();
      } else if (part.length === 3 && /^\d+$/.test(part)) {
        // 3-digit = Numeric region code (e.g., 419)
        return part;
      } else {
        // Extended language subtag or other - lowercase
        return lowerPart;
      }
    } else if (index === 2) {
      // Third part - usually region after script
      if (part.length === 2) {
        // 2-letter region code
        return part.toUpperCase();
      } else if (part.length === 3 && /^\d+$/.test(part)) {
        // 3-digit numeric region code
        return part;
      } else {
        return lowerPart;
      }
    } else {
      // Fourth part and beyond - keep lowercase
      return lowerPart;
    }
  });

  return formattedParts.join('-');
}

function getLanguageName(langCode, locale) {
  if(!isNotBlank(langCode)) return null;
  if(!isNotBlank(locale)) return null;
  
  let cleanedLangCode = cleanLangAttr(langCode);
  let cleanedlocale = cleanLangAttr(locale);

  console.log(`\n\n-------------`)
  console.log(`langCode ${langCode} converted to ${cleanedLangCode}`);
  console.log(`locale ${locale} converted to ${cleanedlocale}`);

  let filePath = path.join(PATH_TO_CLDR_LANG_FOLDERS, `${cleanedLangCode}/languages.json`);

  if(!fs.existsSync(filePath)) {
    let oldCleandLangCode = cleanedLangCode;
    cleanedLangCode = cleanLangAttr(equivalentLocales[cleanedLangCode.toLowerCase().trim()]);
    console.log(`not found: ${filePath}`);
    console.log(`\n\n Locale ${oldCleandLangCode} converted to ${cleanedLangCode}`);
    filePath = path.join(PATH_TO_CLDR_LANG_FOLDERS, `${cleanedLangCode}/languages.json`);
  }

  if(fs.existsSync(filePath)) {
    const languagesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`Loaded file: ${filePath} to find ${cleanedlocale}`);
    let languageName = languagesData.main[cleanedLangCode].localeDisplayNames.languages[cleanedlocale];
    if(!isNotBlank(languageName)) {
      cleanedlocale = cleanLangAttr(equivalentLocales[cleanedlocale.toLowerCase().trim()]);
      languageName = languagesData.main[cleanedLangCode].localeDisplayNames.languages[cleanedlocale];
    }    
    console.log(`${cleanedlocale} name = ${languageName} in ${cleanedLangCode}`);

    return languageName;
  } else {
    console.log(`not found: ${filePath}`);
  }
  console.log(`${cleanedLangCode} name = null`);
  return null;
}

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

  // Add language name entries
  languageCodes.forEach(locale => {
    const key = `langName.${locale.toLowerCase().trim().replace(/_/g,'-')}`;
    const languageName = getLanguageName(langCode, locale);

    if(isNotBlank(languageName)) {
      jsonObject[key] = languageName;
    } else if(!Object.prototype.hasOwnProperty.call(jsonObject,key)) {
      jsonObject[key]="";
    }
  });

  // Separate and sort keys
  const englishPhraseKeys = [];
  const langNameKeys = [];

  Object.keys(jsonObject).forEach(key => {
    if (key.startsWith('langName.')) {
      langNameKeys.push(key);
    } else {
      englishPhraseKeys.push(key);
    }
  });

  // Sort both arrays alphabetically
  englishPhraseKeys.sort();
  langNameKeys.sort();

  // Create new ordered object
  const orderedObject = {};

  // Add English phrase keys first (sorted)
  englishPhraseKeys.forEach(key => {
    orderedObject[key] = jsonObject[key];
  });

  // Add langName keys second (sorted)
  langNameKeys.forEach(key => {
    orderedObject[key] = jsonObject[key];
  });

  fs.writeFileSync(outputFile, `tinymce.addI18n('${langCode.replace(/-/g,'_')}', ${JSON.stringify(orderedObject, null, 2)});`, 'utf8');
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




