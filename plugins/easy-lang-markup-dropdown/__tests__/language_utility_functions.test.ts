import { LanguageSelect } from './plugin-for-tests';

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

describe('LanguageSelect.getTextDirection', () => {
  it('returns "rtl" for known right-to-left languages', () => {
    expect(LanguageSelect.getTextDirection('ar')).toBe('rtl');       // Arabic
    expect(LanguageSelect.getTextDirection('fa')).toBe('rtl');       // Persian
    expect(LanguageSelect.getTextDirection('he')).toBe('rtl');       // Hebrew
    expect(LanguageSelect.getTextDirection('ur')).toBe('rtl');       // Urdu
    expect(LanguageSelect.getTextDirection('ps')).toBe('rtl');       // Pashto
    expect(LanguageSelect.getTextDirection('dv')).toBe('rtl');       // Divehi
    expect(LanguageSelect.getTextDirection('ku')).toBe('rtl');       // Kurdish (Sorani)
    expect(LanguageSelect.getTextDirection('ar-EG')).toBe('rtl');    // Arabic (Egypt)
    expect(LanguageSelect.getTextDirection('FA-IR')).toBe('rtl');    // Case insensitivity
  });

  it('returns "ltr" for left-to-right or unknown languages', () => {
    expect(LanguageSelect.getTextDirection('en')).toBe('ltr');       // English
    expect(LanguageSelect.getTextDirection('fr')).toBe('ltr');       // French
    expect(LanguageSelect.getTextDirection('ja')).toBe('ltr');       // Japanese (neutral script)
    expect(LanguageSelect.getTextDirection('zh-Hans')).toBe('ltr');  // Chinese Simplified
    expect(LanguageSelect.getTextDirection('x-custom')).toBe('ltr'); // Private-use tag
    expect(LanguageSelect.getTextDirection('zz')).toBe('ltr');       // Unknown code
  });

  it('is robust to extra whitespace', () => {
    expect(LanguageSelect.getTextDirection('  ar  ')).toBe('rtl');
    expect(LanguageSelect.getTextDirection('\nfa\t')).toBe('rtl');
  });
});