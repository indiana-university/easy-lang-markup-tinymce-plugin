const fs = require('fs');
const path = require('path');

const PATH_TO_CLDR_LANG_FOLDERS = '/Users/brichwin/dev/easy-lang-markup-tinymce-plugin/plugins/easy-lang-markup-dropdown/utils/cldr-localenames-full/main';

let langAtts = {
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
  "de-at": "Deutsch (Österreich)",
  "de-ch": "Deutsch (Schweiz)",
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
  "ff": "Fulfulde",
  "fi": "suomi",
  "fi-fi": "suomi (Suomi)",
  "fil": "Filipino",
  "fr-be": "français (Belgique)",
  "fr-ca": "français canadien",
  "fr-ch": "français (Suisse)",
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
  "id": "Bahasa Indonesia",
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
  "km": "ភាសាខ្មែរ",
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
  "nv": "Diné bizaad",
  "ota": "لسان عثمانى",
  "pa": "ਪੰਜਾਬੀ",
  "peo": "𐎱𐎠𐎼𐎿",
  "pl": "polski",
  "ps": "پښتو",
  "pt-br": "Português do Brasil",
  "pt-pt": "português (Portugal)",
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
  "uz": "o'zbek",
  "vi": "Tiếng Việt",
  "wo": "Wolof",
  "xh": "isiXhosa",
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

function getNativeLanguageName(langCode) {
  let cleanedLangCode = cleanLangAttr(langCode);
  console.log(`\n\n${langCode} converted to ${cleanedLangCode}`);

  let filePath = path.join(PATH_TO_CLDR_LANG_FOLDERS, `${cleanedLangCode}/languages.json`);

  /*
  if(!fs.existsSync(filePath)) {
    cleanedLangCode = baseLanguage(cleanedLangCode);
    console.log(`not found: ${filePath}`);
    console.log(`\n\n${langCode} converted to ${cleanedLangCode}`);
    filePath = path.join(PATH_TO_CLDR_LANG_FOLDERS, `${cleanedLangCode}/languages.json`);
  }
  */

  if(fs.existsSync(filePath)) {
    const languagesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const languageName = languagesData.main[cleanedLangCode].localeDisplayNames.languages[cleanedLangCode];
    console.log(`${langCode} name = ${languageName}`);
    return languageName;
  } else {
    console.log(`not found: ${filePath}`);
  }
  console.log(`${langCode} name = null`);
  return null;
}

const languageCodes = Object.keys(langAtts);

languageCodes.forEach(langCode => {
  const languageName = getNativeLanguageName(langCode);
  if(isNotBlank(languageName)) langAtts[langCode]=getNativeLanguageName(langCode);
});

JSON.stringify(langAtts)
fs.writeFileSync('langAtts.js', `langAtts = ${JSON.stringify(langAtts, null, 2)};`, 'utf8');



