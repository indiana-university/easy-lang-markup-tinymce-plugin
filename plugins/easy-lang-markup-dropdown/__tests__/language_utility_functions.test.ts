import { LanguageSelect } from '../dist/plugin_for_tests/plugin-for-tests';

describe('isValidLang', () => {
  test('returns true for valid language codes', () => {
    expect(LanguageSelect.isValidLang('arq')).toBe(true);
    expect(LanguageSelect.isValidLang('ar-u-nu-latn')).toBe(true);
    expect(LanguageSelect.isValidLang('de-CH-1901')).toBe(true);
    expect(LanguageSelect.isValidLang('de-DE-u-co-phonebk')).toBe(true);
    expect(LanguageSelect.isValidLang('en')).toBe(true);
    expect(LanguageSelect.isValidLang('en-t-jp')).toBe(true);
    expect(LanguageSelect.isValidLang('en-US-x-twain')).toBe(true);
    expect(LanguageSelect.isValidLang('es')).toBe(true);
    expect(LanguageSelect.isValidLang('es-419')).toBe(true);
    expect(LanguageSelect.isValidLang('fr')).toBe(true);
    expect(LanguageSelect.isValidLang('fr-CA')).toBe(true);
    expect(LanguageSelect.isValidLang('gsw-u-sd-chzh')).toBe(true);
    expect(LanguageSelect.isValidLang('he-IL-u-ca-hebrew-tz-jeruslm')).toBe(true);
    expect(LanguageSelect.isValidLang('nan-Hant-TW')).toBe(true);
    expect(LanguageSelect.isValidLang('pt-BR')).toBe(true);
    expect(LanguageSelect.isValidLang('rm-sursilv')).toBe(true);
    expect(LanguageSelect.isValidLang('sr-Cyrl')).toBe(true);
    expect(LanguageSelect.isValidLang('yue-Hant-HK')).toBe(true);
    expect(LanguageSelect.isValidLang('zh-CN')).toBe(true);
    expect(LanguageSelect.isValidLang('zh-Hans')).toBe(true);
    expect(LanguageSelect.isValidLang('zh-hans')).toBe(true);
    expect(LanguageSelect.isValidLang('zh-Hans-SG')).toBe(true);
    expect(LanguageSelect.isValidLang('zh-yue')).toBe(true);
  });

  test('returns false for invalid language codes', () => {
    expect(LanguageSelect.isValidLang('')).toBe(false);
    expect(LanguageSelect.isValidLang(null)).toBe(false);
    expect(LanguageSelect.isValidLang('123')).toBe(false);
    expect(LanguageSelect.isValidLang('en-')).toBe(false);
    expect(LanguageSelect.isValidLang('-US')).toBe(false);
    expect(LanguageSelect.isValidLang('_US')).toBe(false);
    expect(LanguageSelect.isValidLang('en_US')).toBe(false);
    expect(LanguageSelect.isValidLang('en US')).toBe(false);
    expect(LanguageSelect.isValidLang(undefined as unknown as string)).toBe(false);
  });
});

describe('cleanLangAttr', () => {
  test('returns correct language names for valid codes', () => {
    expect(LanguageSelect.cleanLangAttr('en')).toBe('en');
    expect(LanguageSelect.cleanLangAttr(' en ')).toBe('en');
    expect(LanguageSelect.cleanLangAttr('en_us')).toBe('en-US');
    expect(LanguageSelect.cleanLangAttr('en fr')).toBe('en');
    expect(LanguageSelect.cleanLangAttr('es-es')).toBe('es-ES');
    expect(LanguageSelect.cleanLangAttr(' es-es ')).toBe('es-ES');
    expect(LanguageSelect.cleanLangAttr(' es-mx ')).toBe('es-MX');
    expect(LanguageSelect.cleanLangAttr('zh-hans-sg')).toBe('zh-Hans-SG');
    expect(LanguageSelect.cleanLangAttr('sgn-be-fr')).toBe('sgn-BE-FR');
    expect(LanguageSelect.cleanLangAttr('kok-deva-in')).toBe('kok-Deva-IN');
    expect(LanguageSelect.cleanLangAttr('x-pig-latin')).toBe('x-pig-latin');
    expect(LanguageSelect.cleanLangAttr('x-klingon')).toBe('x-klingon');
  });
});

describe('baseLanguage', () => {
  test('returns correct base language for valid codes', () => {
    expect(LanguageSelect.baseLanguage('en')).toBe('en');
    expect(LanguageSelect.baseLanguage(' en ')).toBe('en');
    expect(LanguageSelect.baseLanguage('en_us')).toBe('en');
    expect(LanguageSelect.baseLanguage('en fr')).toBe('en');
    expect(LanguageSelect.baseLanguage('es-es')).toBe('es');
    expect(LanguageSelect.baseLanguage(' es-es ')).toBe('es');
    expect(LanguageSelect.baseLanguage(' es-mx ')).toBe('es');
    expect(LanguageSelect.baseLanguage('zh-hans-sg')).toBe('zh');
    expect(LanguageSelect.baseLanguage('sgn-be-fr')).toBe('sgn');
    expect(LanguageSelect.baseLanguage('kok-deva-in')).toBe('kok');
    expect(LanguageSelect.baseLanguage('x-pig-latin')).toBe('x');
    expect(LanguageSelect.baseLanguage('x-klingon')).toBe('x');
  });
});

describe('getLocaleParts', () => {
  test.each([
    // [ input, expected output ]
    ['en',               { language: 'en' }],
    ['fr-CA',            { language: 'fr', region: 'CA' }],
    ['zh-Hant',          { language: 'zh', script: 'hant' }],
    ['zh-Hans-CN',       { language: 'zh', script: 'hans', region: 'CN' }],
    ['ku-Arab-IQ',       { language: 'ku', script: 'arab', region: 'IQ' }],
    ['pa-Guru-IN',       { language: 'pa', script: 'guru', region: 'IN' }],
    ['az-Latn',          { language: 'az', script: 'latn' }],
    ['es-419',           { language: 'es', region: '419' }], // Latin America (UN M.49)
    ['fa-AF',            { language: 'fa', region: 'AF' }],
    ['und',              { language: 'und' }],
    ['xyz',              { language: 'xyz' }],
    ['abc-DEF-123',      { language: 'abc', region: '123' }],
    ['en-GB-oed',        { language: 'en', region: 'GB' }], // extension ignored
    ['fr-CA-u-ca-gregory', { language: 'fr', region: 'CA' }], // Unicode extension ignored
  ])('getLocaleParts("%s") should return %j', (input, expected) => {
    expect(LanguageSelect.getLocaleParts(input)).toEqual(expected);
  });

  test('returns language only for empty string', () => {
    expect(LanguageSelect.getLocaleParts('')).toEqual({ language: '' });
  });
});

describe('getTextDirection', () => {
  describe('returns "rtl" for right-to-left languages', () => {
    test.each([
      'ar',
      'fa',
      'he',
      'ur',
      'ps',
      'dv',
      'ckb',
      'yi',
      'fa-AF',
      'fa-IR',
      'ar-EG',
      'ku-Arab',
      'ku-Arab-IQ',
      'ku-arab',   // Function should be case insensitive
      'ku-arab-iq',
      'pa-Arab',
      'pa-Arab-PK',
      'ha-Arab',
      'az-Arab',
      'az-Arab-IR',
    ])('getTextDirection("%s") should return "rtl"', (lang) => {
      expect(LanguageSelect.getTextDirection(lang)).toBe('rtl');
    });
  });

  describe('returns "ltr" for left-to-right languages', () => {
    test.each([
      'en',
      'fr',
      'de',
      'zh',
      'ja',
      'ru',
      'hi',
      'en-US',
      'fr-CA',
      'ku-Latn',
      'ku-Latn-TR',
      'ku-latn',     // Function should be case insensitive
      'ku-latn-tr',
      'pa-Guru',
      'pa-Guru-IN',
      'zh-Hans',
      'ha-Latn',
      'az-Latn',
      'x-custom',
      '',           // empty
      'und',        // undefined language
      'zz',         // undefined language
      'xyz',        // unknown
      'fr-Unknown', // invalid region
      'abc-DEF-123', // junk tag
      ' en ',       // allows whitespace
      '\nen\n'      // allows whitespace
    ])('getTextDirection("%s") should return "ltr"', (lang) => {
      expect(LanguageSelect.getTextDirection(lang)).toBe('ltr');
    });
  });

  describe('returns "auto" for ambiguous language tags without a script', () => {
    test.each([
      'ku',
      'pa',
      'ha',
      'az',
      'ug'
    ])('getTextDirection("%s") should return "auto"', (lang) => {
      expect(LanguageSelect.getTextDirection(lang)).toBe('auto');
    });
  });
});
