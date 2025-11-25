/**
 * Copyright (C) 2012 The Trustees of Indiana University
 * SPDX-License-Identifier: GPL-3.0-only
 */

/* global alert, confirm, editor, tinymce */
"use strict";

import * as Types from './plugin_types';
declare const tinymce: any;
declare const tinyMCE: any;

class LanguageSelect {
  constructor(private editor: Types.TinyMCEEditor, private url: string) { }

  private static readonly CONFIG = {
    MAX_MENU_ITEMS: 6,
    DEFAULT_LANG: 'en',
    SET_DIR_WHEN_SETTING_LANG: true,
    LANG_ATTR_QA_ID: 'langAttrQA',
    DEFAULT_LANG_HOLDER_ID: 'defaultContentLangHolder'
  } as const;

  private isTinyMCE4: boolean = false;
  private menuIsRefreshing: boolean = false;
  private isWordPress: boolean = false;
  private hasDashIcons: boolean = false;
  private defaultLanguages: string[] = ["en", "es", "fr", "it", "de"];

  private iconName: string | null = "easyLangIcon";
  private showCurrentLanguage: boolean = false;
  private showCurrentLangCodeOnly: boolean = false;
  private enableKeyboardShortcuts: boolean = true;

  private keyboardShortCuts: string[] = ["meta+Shift+1", "meta+Shift+2", "meta+Shift+3", "meta+Shift+4", "meta+Shift+5", "meta+Shift+6"];

  private langColors: Record<string, string> = {
    "en-us": "#ddd",
    en: "#EEEEEE",
    es: "#E6B0AA",
    fr: "#AED6F1",
    it: "#ABEBC6",
    de: "#F9E79F",
  };

  private colorsAvailable: string[] = [
    "#aeb0b5",
    "#FF6BA7",
    "#1FC2EE",
    "#59C879",
    "#f9c642",
    "#F30707",
    "#949EFF",
    "#A0B463",
    "#EFAA1C",
  ];

  private readonly langFormatsRegistered: Record<string, boolean> = {};
  private editorLanguage: string = LanguageSelect.CONFIG.DEFAULT_LANG;
  private tsViewMarkup: boolean = false;
  private langMenuItems: string[] = [];
  private myButtonTextPtr: HTMLElement | null = null;

  /**
   * Checks if a value is a non-null string that contains at least one non-whitespace character.
   *
   * @param value - The value to check
   * @returns true if the value is a string with non-whitespace content, false otherwise
   *
   */
  static isNotBlank(value: any): value is string {
    return typeof value === 'string' && value.trim().length > 0;
  }

  /**
   * Extracts the base language code from the given language string.
   * For example:
   * - "en-US" -> "en"
   * - "en_us" -> "en"
   * - "en us" -> "en"
   * - " en "  -> "en"
   * - null or empty -> ""
   *
   * @param {string} langValue - The input language string.
   * @returns {string} - The base language code, or an empty string if input is null/undefined.
   */
  static baseLanguage(langValue: string): string {
    if (!langValue) return '';

    // Trim whitespace and remove any characters following a dash, underscore, or space
    return langValue.trim().replace(/[-_\s].*$/, '');
  }

  /**
   * Validates language codes according to BCP 47 specification
   * Supports formats like: en, en-US, zh-Hans, zh-Hans-CN, es-419, x-custom
   * @param {string} lang - Language code to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  static isValidLang(lang: string | null): boolean {
    if (!lang || typeof lang !== "string") return false;

    const trimmedLang = lang.trim();
    if (trimmedLang.length < 2 || trimmedLang.length > 35) return false;

    // BCP 47 compliant regex

    const bcp47Regex = /^(?:[a-z]{2,3}(?:-[A-Z][a-z]{3})?(?:-[A-Z]{2}|[0-9]{3})?|[a-z]{4}|[a-z]{5,8}|x-[a-z0-9]{1,8}(?:-[a-z0-9]{1,8})*)(?:-[a-z0-9]{1,8})*$/i;

    return bcp47Regex.test(trimmedLang);
  }

  // Helper function to get translation string
  // editor.translate returns key if key not found
  // editor.translate returns "" if the key's value is ""
  translate(key: string): string {
    const translated: string = this.editor.translate(key) || key;
    return translated;
  }

  /**
   * Helper function to translate strings with named parameters {{name}}, {{number}}, etc.
   * @param key - The translation key
   * @param replacements - Object with parameter names and values
   * @returns Translated string with parameters substituted
   */
  translateTemplate(key: string, replacements: Record<string, string | number>): string {
    let translated = this.translate(key) || key;

    // Replace {{key}} with values from replacements object
    Object.entries(replacements).forEach(([placeholder, value]) => {
      const regex = new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g');
      translated = translated.replace(regex, String(value));
    });

    return translated;
  }

  /**
   * Parses a BCP 47 language tag into its component parts: language, script, and region.
   * Uses Intl.Locale if available, with a manual fallback for older environments.
   * 
   * The HTML spec states that language tags in the lang attribute should follow BCP 47, 
   * but it doesn't enforce strict casing. The spec treats language tags as case-insensitive 
   * for matching purposes.
   * 
   * The returned values are normalized: language and script are lowercased; region is uppercased.
   *
   * @param {string} lang - The BCP 47 language tag (e.g., 'ku-Arab-IQ').
   * @returns {{ language: string, script?: string, region?: string }} An object with parsed locale components.
   */
  static getLocaleParts(lang: string): Types.LocaleParts {
    // Use native Intl.Locale if available
    if ('Intl' in window && 'Locale' in Intl) {
      try {
        const locale = new Intl.Locale(lang);
        return {
          language: locale.language.toLowerCase(),
          script: locale.script?.toLowerCase(),
          region: locale.region?.toUpperCase(),
        };
      } catch {
        // Fallback to manual parsing
      }
    }

    // Fallback BCP 47-style parser
    const parts = lang.split('-');
    const result: Types.LocaleParts = {
      language: parts[0].toLowerCase(),
    };

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (!result.script && /^[A-Za-z]{4}$/.test(part)) {
        result.script = part.toLowerCase(); // e.g., "Arab"
      } else if (!result.region && (/^[A-Z]{2}$/i.test(part) || /^[0-9]{3}$/.test(part))) {
        result.region = part.toUpperCase(); // e.g., "IQ" or "419"
      }
    }

    return result;
  }

  /**
   * Determines the text direction ('ltr', 'rtl', or 'auto') based on a BCP 47 language tag.
   * Considers both script and language subtags, with special handling for ambiguous languages.
   *
   * @param {string} lang - The BCP 47 language tag (e.g., 'ar', 'ku-Latn', 'pa').
   * @returns {'ltr' | 'rtl' | 'auto'} The inferred text direction.
   */
  static getTextDirection(lang: string): 'rtl' | 'ltr' | 'auto' {

    const rtlScripts = new Set([ // Scripts inherently written right-to-left
      'arab', 'hebr', 'syrc', 'thaa', 'nkoo', 'samr', 'phnx', 'mand', 'adlm',
      'rohg', 'yezi', 'elym', 'palm', 'nbat', 'armi'
    ]);

    const rtlLanguages = new Set([ // Languages always written RTL regardless of script tag
      'ar', 'fa', 'he', 'ur', 'ps', 'dv', 'ckb', 'yi', 'arc', 'azb',
      'bqi', 'glk', 'lrc', 'mzn', 'pnb', 'bal', 'syr', 'sam', 'nqo', 'phn',
      'rhg', 'skr', 'bgn'
    ]);

    const ambiguousLanguages = new Set([ // Direction depends on script, but script is not always specified
      'ku', 'pa', 'ha', 'az', 'ms', 'tg', 'ug', 'sd', 'ks', 'rhg', 'bft'
    ]);

    const locale: Types.LocaleParts = LanguageSelect.getLocaleParts(lang);

    if (LanguageSelect.isNotBlank(locale.script)) {
      if (rtlScripts.has(locale.script)) {
        return 'rtl';
      } else {
        return 'ltr';
      }
    }

    if (rtlLanguages.has(locale.language)) {
      return 'rtl';
    }

    if (ambiguousLanguages.has(locale.language)) {
      return 'auto';
    }

    return 'ltr';
  }

  /**
   * Takes the first token in the string and returns it as a well-formatted lang attribute:
   * - "en" becomes "en"
   * - "en-us" becomes "en-US"
   * - "en_us" becomes "en-US"
   * - "en enu" becomes "en"
   * - "es-es " becomes "es-ES"
   * - "es-mx " becomes "es-MX"
   * - "zh-hans-sg" becomes "zh-Hans-SG"
   * - "sgn-be-fr" becomes "sgn-BE-FR"
   * - "kok-deva-in" becomes "kok-Deva-IN"
   * - "x-pig-latin" becomes "x-pig-latin"
   * - "x-klingon" becomes "x-klingon"
   *
   * @param {string} langValue - The input language attribute string.
   * @returns {string} - The cleaned and formatted language attribute.
   */
  static cleanLangAttr(langValue: string | null): string {
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

  private getEditorDoc(): Document | null {
    try {
      return this.editor?.getDoc?.() ?? null;
    } catch (error) {
      console.warn('Failed to get editor document:', error);
      return null;
    }
  }

  /**
   * Gets the lang attribute from an element if it's valid
   * @param {Element} element - DOM element to check
   * @returns {string|null} - Valid lang attribute or null
   */
  private static getValidLangAttribute(element: Element | null): string | null {
    if (!element || !(element.getAttribute)) return null;
    const lang: string | null = (element as Element).getAttribute("lang");
    return lang && LanguageSelect.isValidLang(lang) ? lang.trim() : null;
  }

  /**
   * Gets the language to suggest as the default for the editor document
   */
  getTinymceDefaultDocumentLanguage(): string {
    const strategies = [
      () => this.getLanguageFromSingleChild(),
      () => this.getLanguageFromEditorBody(),
      () => this.getLanguageFromEditorDocumentElement(),
      () => this.getLanguageFromEditorSettings(),
      () => this.getLanguageFromTopDocument(),
      () => this.getLanguageFromMetaTag(),
      () => this.getLanguageFromBrowser()
    ];

    for (const strategy of strategies) {
      try {
        const lang = strategy();
        if (lang && LanguageSelect.isValidLang(lang)) { return lang; }
      } catch (error) {
        // Continue to next strategy
        console.debug('Language detection strategy failed:', error);
      }
    }

    return LanguageSelect.CONFIG.DEFAULT_LANG; // Final fallback
  }

  private getLanguageFromSingleChild(): string | null {
    if (this.editor && this.editor.getBody) {
      const editorBody = this.editor.getBody();
      if (editorBody?.children?.length === 1) {
        return LanguageSelect.getValidLangAttribute(editorBody.children[0]);
      }
    }
    if (this.editor && this.editor.getDoc) {
      const editorDoc = this.editor.getDoc();
      if (editorDoc?.body?.children.length === 1) {
        return LanguageSelect.getValidLangAttribute(editorDoc.body.children[0]);
      }
    }
    return null;
  }

  private getLanguageFromEditorBody(): string | null {
    if (this.editor && this.editor.getDoc) {
      const editorDoc = this.editor.getDoc();
      if (editorDoc) {
        return LanguageSelect.getValidLangAttribute(editorDoc.body);
      }
    }
    return null;
  }

  private getLanguageFromEditorDocumentElement(): string | null {
    if (this.editor && this.editor.getDoc) {
      const editorDoc = this.editor.getDoc();
      if (editorDoc) {
        return LanguageSelect.getValidLangAttribute(editorDoc.documentElement);
      }
    }
    return null;
  }

  private getLanguageFromEditorSettings(): string | null {
    let settingsLang = null;

    if (this.editor && this.editor.settings?.language && LanguageSelect.isNotBlank(this.editor.settings.language)) {
      settingsLang = LanguageSelect.cleanLangAttr(this.editor.settings.language);
    }
    if (!LanguageSelect.isValidLang(settingsLang) && this.editor?.options?.get && LanguageSelect.isNotBlank(this.editor.options.get('language'))) {
      settingsLang = LanguageSelect.cleanLangAttr(this.editor.options.get('language'));
    }
    if (LanguageSelect.isValidLang(settingsLang)) return settingsLang;

    return null;
  }

  getLanguageFromTopDocument(): string | null {
    if (!window || !window.top?.document) {
      return null;
    }

    if (window.top.document.body) {
      const bodyLang = LanguageSelect.getValidLangAttribute(window.top.document.body);
      if (LanguageSelect.isValidLang(bodyLang)) return bodyLang;
    }

    if (window.top.document.documentElement) {
      const docLang = LanguageSelect.getValidLangAttribute(window.top.document.documentElement);
      if (LanguageSelect.isValidLang(docLang)) return docLang;
    }

    return null;
  }

  private getLanguageFromMetaTag(): string | null {
    const metaLang = document.querySelector('meta[http-equiv="content-language"]');
    if (metaLang) {
      const content = metaLang.getAttribute('content');
      return LanguageSelect.isValidLang(content) ? content!.trim() : null;
    }
    return null;
  }

  private getLanguageFromBrowser(): string | null {
    if (navigator) {
      const browserLang = navigator.language || (navigator as any).userLanguage;
      return LanguageSelect.isValidLang(browserLang) ? browserLang.trim() : null;
    }
    return null;
  }

  /**
   * Gets the default document language from a single DIV wrapper element.
   *
   * This method checks if the TinyMCE editor's document body contains exactly one
   * child element that is a DIV. If found, it extracts and validates the lang
   * attribute from that DIV element. This is useful for documents that wrap all
   * content in a single container DIV with language markup.
   *
   * The method tries two approaches in order:
   * 1. Uses editor.getBody() to access the body element directly
   * 2. Falls back to editor.getDoc().body if getBody() is unavailable
   *
   * @returns {string | null} The valid language code (e.g., "en", "es-MX") if a
   *                          single DIV child with valid lang attribute is found,
   *                          null otherwise
   */
  private getDocumentDefaultLanguage(): string | null {
    // Try getBody() first
    if (this.editor?.getBody) {
      const result = this.checkSingleDivChild(this.editor.getBody());
      if (result) return result;
    }

    // Fallback to getDoc().body
    if (this.editor?.getDoc) {
      const editorDoc = this.editor.getDoc();
      if (editorDoc) {
        const result = this.checkSingleDivChild(editorDoc.body);
        if (result) return result;
      }
    }

    return null;
  }

  /**
   * Checks if a parent element has exactly one DIV child and extracts its lang attribute.
   *
   * This helper method examines a parent element to determine if it contains exactly
   * one child element that is a DIV tag. If this condition is met, it attempts to
   * extract and validate the lang attribute from that DIV element.
   *
   * @param {Element | null} parent - The parent element to examine. Can be null.
   *
   * @returns {string | null} The valid language code from the DIV's lang attribute
   *                          if exactly one DIV child exists with a valid lang attribute,
   *                          null otherwise
   */
  private checkSingleDivChild(parent: Element | null): string | null {
    if (parent?.children?.length === 1 &&
      parent.children[0]?.tagName === "DIV") {
      return LanguageSelect.getValidLangAttribute(parent.children[0]);
    }
    return null;
  }

  /**
   * Analyzes the usage of language attributes in the editor's document.
   * It returns a sorted array of detected language codes based on their frequency of use.
   *
   * @returns {string[]} - An array of language codes sorted by frequency of occurrence.
   */
  private analyzeEditorDocumentLangUsage() {
    const topDocument = window?.top?.document;
    const editorDocument = this.getEditorDoc();

    let docContainer = null;

    // Determine the document container to analyze
    if (editorDocument && editorDocument.body) {
      docContainer = editorDocument.body;
    } else if (this.editor && this.editor.settings && this.editor.settings.selector) {
      const editorSelector: string | null = this.editor.settings.selector;
      docContainer = document.querySelector(editorSelector);
    } else {
      docContainer = topDocument?.body;
    }

    // Track the usage of languages in the document
    const langsUsed: Record<string, number> = {};

    // Include the default language if it is valid
    if (LanguageSelect.isValidLang(this.editorLanguage)) {
      langsUsed[this.editorLanguage] = 1;
    }

    if (docContainer && docContainer.querySelectorAll) {
      // Find all elements with a lang attribute
      const langElements = docContainer.querySelectorAll("[lang]");

      langElements.forEach((el: Element) => {
        const foundLang = LanguageSelect.cleanLangAttr(el.getAttribute("lang"));
        if (LanguageSelect.isValidLang(foundLang)) {
          langsUsed[foundLang] = (langsUsed[foundLang] || 0) + 1;
        }
      });
    }

    // Sort languages by frequency of occurrence and return them
    return Object.entries(langsUsed)
      .sort((a, b) => b[1] - a[1])
      .map(([langCode]) => langCode);
  }

  /**
   * Retrieves the language attribute from the given element or its ancestors.
   * Traverses up the DOM tree until it finds an element with a `lang` attribute.
   *
   * @param {Element} el - The starting element to check for language attributes.
   * @returns {[string, boolean]} - A tuple containing the cleaned language attribute and a boolean
   *                                indicating if the language is set directly under the BODY element.
   */
  private getDocumentElementLang(el: Element | null): [string, boolean] {
    if (!el || !el.hasAttribute) return ["", false];

    let elLang: string = "";
    let currentLangIsDefault: boolean = false;

    // Traverse up the DOM tree to find the first ancestor with a `lang` attribute
    while (el && !elLang && el.nodeName !== "BODY") {
      if (el.hasAttribute("lang")) {
        elLang = LanguageSelect.cleanLangAttr(el.getAttribute("lang"));
        currentLangIsDefault = el.parentElement ? el.parentElement.nodeName === "BODY" && el.parentElement.children.length == 1 : false;
      }
      el = el.parentElement;
    }

    return [elLang, currentLangIsDefault];
  }

  /**
   * Keep language keys in langAtts all lower case for string comparison purposes.
   * The key will get correctly cased when used as an attribute value.
   * Language names are in the native language.
   */
  private static readonly languageTags: Record<string, string> = {
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

  /**
   * Get localized language name for a given language code.
   * The localized name will be translated to the user's current locale.
   * English names serve as both translation keys and default fallback values.
   * 
   * @param code - The language code (e.g., "az", "ja", "de")
   * @returns String with the localized language name, or the code itself if not found
   */
  public getTranslatedLanguageName(code: string): string {
    if (!code || !LanguageSelect.isNotBlank(code)) {
      return "";
    }

    code = code.trim().toLowerCase();

    // i18n scanner will extract all these literal English strings for translation
    // The English text is both the key and the default fallback value
    let localized: string;
    switch (code) {
      case "af": localized = this.translate("Afrikaans"); break;
      case "af-za": localized = this.translate("Afrikaans"); break;
      case "ak": localized = this.translate("Akan"); break;
      case "am": localized = this.translate("Amharic"); break;
      case "ar": localized = this.translate("Arabic"); break;
      case "ar-eg": localized = this.translate("Arabic (Egypt)"); break;
      case "ar-ma": localized = this.translate("Arabic (Morocco)"); break;
      case "ar-sa": localized = this.translate("Arabic (Saudi Arabia)"); break;
      case "az": localized = this.translate("Azerbaijani"); break;
      case "be": localized = this.translate("Belarusian"); break;
      case "bg": localized = this.translate("Bulgarian"); break;
      case "bg-bg": localized = this.translate("Bulgarian (Bulgaria)"); break;
      case "bho": localized = this.translate("Bhojpuri"); break;
      case "bm": localized = this.translate("Bambara"); break;
      case "bn": localized = this.translate("Bangla"); break;
      case "bo": localized = this.translate("Tibetan"); break;
      case "bs": localized = this.translate("Bosnian"); break;
      case "ca": localized = this.translate("Catalan"); break;
      case "cop": localized = this.translate("Coptic"); break;
      case "cr": localized = this.translate("Cree"); break;
      case "cs": localized = this.translate("Czech"); break;
      case "cu": localized = this.translate("Church Slavic"); break;
      case "cy": localized = this.translate("Welsh"); break;
      case "da": localized = this.translate("Danish"); break;
      case "de": localized = this.translate("German"); break;
      case "de-at": localized = this.translate("German (Austria)"); break;
      case "de-ch": localized = this.translate("German (Switzerland)"); break;
      case "de-de": localized = this.translate("German (Germany)"); break;
      case "dv": localized = this.translate("Divehi"); break;
      case "el": localized = this.translate("Greek"); break;
      case "en": localized = this.translate("English"); break;
      case "en-au": localized = this.translate("English (Australia)"); break;
      case "en-ca": localized = this.translate("English (Canada)"); break;
      case "en-gb": localized = this.translate("English (United Kingdom)"); break;
      case "en-ie": localized = this.translate("English (Ireland)"); break;
      case "en-in": localized = this.translate("English (India)"); break;
      case "en-tt": localized = this.translate("English (Trinidad)"); break;
      case "en-us": localized = this.translate("English (United States)"); break;
      case "en-za": localized = this.translate("English (South Africa)"); break;
      case "eo": localized = this.translate("Esperanto"); break;
      case "es": localized = this.translate("Spanish"); break;
      case "es-ar": localized = this.translate("Spanish (Argentina)"); break;
      case "es-cl": localized = this.translate("Spanish (Chile)"); break;
      case "es-co": localized = this.translate("Spanish (Colombia)"); break;
      case "es-cr": localized = this.translate("Spanish (Costa Rica)"); break;
      case "es-es": localized = this.translate("Spanish (Spain)"); break;
      case "es-mx": localized = this.translate("Spanish (Mexico)"); break;
      case "es-pe": localized = this.translate("Spanish (Peru)"); break;
      case "et": localized = this.translate("Estonian"); break;
      case "eu": localized = this.translate("Basque"); break;
      case "fa": localized = this.translate("Persian"); break;
      case "fa-af": localized = this.translate("Dari"); break;
      case "fa-ir": localized = this.translate("Persian (Iran)"); break;
      case "ff": localized = this.translate("Fula"); break;
      case "fi": localized = this.translate("Finnish"); break;
      case "fi-fi": localized = this.translate("Finnish (Finland)"); break;
      case "fil": localized = this.translate("Filipino"); break;
      case "fr": localized = this.translate("French"); break;
      case "fr-be": localized = this.translate("French (Belgium)"); break;
      case "fr-ca": localized = this.translate("French (Canada)"); break;
      case "fr-ch": localized = this.translate("French (Switzerland)"); break;
      case "ga": localized = this.translate("Irish"); break;
      case "gl": localized = this.translate("Galician"); break;
      case "grc": localized = this.translate("Greek (Ancient)"); break;
      case "ha": localized = this.translate("Hausa"); break;
      case "he": localized = this.translate("Hebrew"); break;
      case "he-il": localized = this.translate("Hebrew (Israel)"); break;
      case "hi": localized = this.translate("Hindi"); break;
      case "hr": localized = this.translate("Croatian"); break;
      case "hr-hr": localized = this.translate("Croatian (Croatia)"); break;
      case "ht": localized = this.translate("Haitian Creole"); break;
      case "hu": localized = this.translate("Hungarian"); break;
      case "hu-hu": localized = this.translate("Hungarian (Hungary)"); break;
      case "hy": localized = this.translate("Armenian"); break;
      case "id": localized = this.translate("Indonesian"); break;
      case "ig": localized = this.translate("Igbo"); break;
      case "is": localized = this.translate("Icelandic"); break;
      case "it": localized = this.translate("Italian"); break;
      case "it-it": localized = this.translate("Italian (Italy)"); break;
      case "iu": localized = this.translate("Inuktitut"); break;
      case "ja": localized = this.translate("Japanese"); break;
      case "ja-jp": localized = this.translate("Japanese (Japan)"); break;
      case "ka": localized = this.translate("Georgian"); break;
      case "kab": localized = this.translate("Kabyle"); break;
      case "kk": localized = this.translate("Kazakh"); break;
      case "km": localized = this.translate("Khmer"); break;
      case "kn": localized = this.translate("Kannada"); break;
      case "ko": localized = this.translate("Korean"); break;
      case "ko-kr": localized = this.translate("Korean (Korea)"); break;
      case "la": localized = this.translate("Latin"); break;
      case "lkt": localized = this.translate("Lakota"); break;
      case "lo": localized = this.translate("Lao"); break;
      case "lt": localized = this.translate("Lithuanian"); break;
      case "lv": localized = this.translate("Latvian"); break;
      case "mi": localized = this.translate("Māori"); break;
      case "mn": localized = this.translate("Mongolian"); break;
      case "mr": localized = this.translate("Marathi"); break;
      case "ms": localized = this.translate("Malay"); break;
      case "mt": localized = this.translate("Maltese"); break;
      case "my": localized = this.translate("Burmese"); break;
      case "nb": localized = this.translate("Norwegian (Bokmål)"); break;
      case "nb-no": localized = this.translate("Norwegian (Bokmål, Norway)"); break;
      case "ne": localized = this.translate("Nepali"); break;
      case "nl": localized = this.translate("Dutch"); break;
      case "nl-be": localized = this.translate("Flemish"); break;
      case "nn": localized = this.translate("Norwegian (Nynorsk)"); break;
      case "nv": localized = this.translate("Navajo"); break;
      case "ota": localized = this.translate("Turkish (Ottoman)"); break;
      case "pa": localized = this.translate("Punjabi"); break;
      case "peo": localized = this.translate("Persian (Old)"); break;
      case "pl": localized = this.translate("Polish"); break;
      case "ps": localized = this.translate("Pashto"); break;
      case "pt": localized = this.translate("Portuguese"); break;
      case "pt-br": localized = this.translate("Portuguese (Brazil)"); break;
      case "pt-pt": localized = this.translate("Portuguese (Portugal)"); break;
      case "qu": localized = this.translate("Quechua"); break;
      case "ro": localized = this.translate("Romanian"); break;
      case "ru": localized = this.translate("Russian"); break;
      case "rw": localized = this.translate("Kinyarwanda"); break;
      case "sa": localized = this.translate("Sanskrit"); break;
      case "se": localized = this.translate("Sami (Northern)"); break;
      case "si": localized = this.translate("Sinhala"); break;
      case "sk": localized = this.translate("Slovak"); break;
      case "sk-sk": localized = this.translate("Slovak (Slovakia)"); break;
      case "sl": localized = this.translate("Slovenian"); break;
      case "sl-si": localized = this.translate("Slovenian (Slovenia)"); break;
      case "sma": localized = this.translate("Sami (Southern)"); break;
      case "sme": localized = this.translate("Sami (Northern)"); break;
      case "smj": localized = this.translate("Sami (Lule)"); break;
      case "sn": localized = this.translate("Shona"); break;
      case "sr": localized = this.translate("Serbian"); break;
      case "sr-latn": localized = this.translate("Serbian (Latin)"); break;
      case "sv": localized = this.translate("Swedish"); break;
      case "sv-se": localized = this.translate("Swedish (Sweden)"); break;
      case "sw": localized = this.translate("Swahili"); break;
      case "sw-ke": localized = this.translate("Swahili (Kenya)"); break;
      case "sw-tz": localized = this.translate("Swahili (Tanzania)"); break;
      case "syc": localized = this.translate("Syriac (Classical)"); break;
      case "ta": localized = this.translate("Tamil"); break;
      case "te": localized = this.translate("Telugu"); break;
      case "tg": localized = this.translate("Tajik"); break;
      case "th": localized = this.translate("Thai"); break;
      case "th-th": localized = this.translate("Thai (Thailand)"); break;
      case "tk": localized = this.translate("Turkmen"); break;
      case "tl": localized = this.translate("Tagalog"); break;
      case "tr": localized = this.translate("Turkish"); break;
      case "tr-tr": localized = this.translate("Turkish (Turkey)"); break;
      case "tt": localized = this.translate("Tatar"); break;
      case "ug": localized = this.translate("Uyghur"); break;
      case "uk": localized = this.translate("Ukrainian"); break;
      case "ur": localized = this.translate("Urdu"); break;
      case "uz": localized = this.translate("Uzbek"); break;
      case "vi": localized = this.translate("Vietnamese"); break;
      case "wo": localized = this.translate("Wolof"); break;
      case "xh": localized = this.translate("Xhosa"); break;
      case "yi": localized = this.translate("Yiddish"); break;
      case "yo": localized = this.translate("Yoruba"); break;
      case "yua": localized = this.translate("Maya (Yucatec)"); break;
      case "zh": localized = this.translate("Chinese"); break;
      case "zh-cn": localized = this.translate("Chinese (Simplified)"); break;
      case "zh-hans": localized = this.translate("Chinese (Simplified)"); break;
      case "zh-hant": localized = this.translate("Chinese (Traditional)"); break;
      case "zh-hk": localized = this.translate("Chinese (Hong Kong)"); break;
      case "zh-sg": localized = this.translate("Chinese (Singapore)"); break;
      case "zh-tw": localized = this.translate("Chinese (Traditional)"); break;
      case "zu": localized = this.translate("Zulu"); break;
      case "zu-za": localized = this.translate("Zulu"); break;
      default: localized = code; break;
    }

    return localized;
  }

  // Helper function to get translation string with fallback hierarchy
  getLanguageNameForLocale(langCode: string | null): string {

    if (!LanguageSelect.isNotBlank(langCode)) return '';
    langCode = langCode.toLowerCase().trim();

    // Try the full language code first (e.g., 'es-MX')
    let languageName = this.getTranslatedLanguageName(langCode);
    if ((!LanguageSelect.isNotBlank(languageName) || languageName === langCode) && langCode.includes('-')) {
      // If not found and there's a hyphen, try the primary language code (e.g., 'es')
      langCode = LanguageSelect.baseLanguage(langCode);
      languageName = this.getTranslatedLanguageName(langCode);
      if (languageName === langCode || !LanguageSelect.isNotBlank(languageName)) {
        if (Object.prototype.hasOwnProperty.call(LanguageSelect.languageTags, langCode)) {
          languageName = LanguageSelect.languageTags[langCode];
        } else if (Object.prototype.hasOwnProperty.call(LanguageSelect.languageTags, LanguageSelect.baseLanguage(langCode))) {
          languageName = LanguageSelect.languageTags[LanguageSelect.baseLanguage(langCode)];
        } else {
          languageName = LanguageSelect.cleanLangAttr(langCode);
        }
      }
    }

    return languageName;
  }

  /* Get the native language name for a given language code.
   * The native name is the name of the language in that language itself.
   * E.g., "Deutsch" for "de", "Español" for "es", "日本語" for "ja".
   * 
   * @param langCode - The language code (e.g., "de", "es", "ja")
   * @returns String with the native language name, or empty string if not found
   */
  public static getNativeLanguageName(langCode: string | null): string {
    if (!LanguageSelect.isNotBlank(langCode)) return '';
    langCode = langCode.trim().toLowerCase();
    const nativeLangName: string = Object.prototype.hasOwnProperty.call(LanguageSelect.languageTags, langCode) ? LanguageSelect.languageTags[langCode] : langCode;
    return nativeLangName;
  }

  // Used for selector lists
  private getLanguageCodeDescription(langCode: string | null): string | null {
    if (!LanguageSelect.isNotBlank(langCode)) return null;

    let langCodeLanguageNameForLocale = this.getLanguageNameForLocale(langCode);
    let nativeLangName = LanguageSelect.getNativeLanguageName(langCode);

    if (langCodeLanguageNameForLocale && langCodeLanguageNameForLocale !== nativeLangName) {
      return `${langCodeLanguageNameForLocale} (${nativeLangName})`;
    } else if (nativeLangName) {
      return nativeLangName;
    }
    return langCode;
  }

  // Used for menu entries
  private getShortLanguageCodeDescription(langCode: string): string {
    let langCodeLanguageNameForLocale = this.getLanguageNameForLocale(langCode);
    let nativeLangName = LanguageSelect.getNativeLanguageName(langCode);

    if (langCodeLanguageNameForLocale && langCodeLanguageNameForLocale !== nativeLangName) {
      return langCodeLanguageNameForLocale;
    } else if (nativeLangName) {
      return nativeLangName;
    }
    return langCode;
  }

  /**
   * Builds a sorted list of languages for the TinyMCE dialog dropdown
   * @returns Array of language options in the format required by TinyMCE selectbox
   */
  private buildSortedLanguagesList(): Array<{ value: string; text: string }> {
    const editorLocale = this.editor?.settings?.language ||
      (this.editor?.options?.get ? this.editor.options.get('language') : 'en') || 'en';

    const languages: Array<{ value: string; text: string }> = [];

    // Iterate through all language tags
    for (const [langCode, nativeName] of Object.entries(LanguageSelect.languageTags)) {
      // Get the localized name for this language in the current editor locale
      const localizedName = this.getLanguageNameForLocale(langCode);

      if (!localizedName || localizedName === langCode || localizedName === nativeName) {
        languages.push({
          value: langCode.toLowerCase(),
          text: `${nativeName} (${langCode.toLowerCase()})`
        });
      } else {
        languages.push({
          value: langCode.toLowerCase(),
          text: `${localizedName} - ${nativeName} (${langCode.toLowerCase()})`
        });
      }
    }

    // Sort alphabetically by the localized language name (first part before the dash)
    languages.sort((a, b) => {
      const aLocalizedName = a.text.split(' - ')[0];
      const bLocalizedName = b.text.split(' - ')[0];
      return aLocalizedName.localeCompare(bLocalizedName, editorLocale, {
        sensitivity: 'base',
        numeric: true
      });
    });

    return languages;
  }

  private _cachedLanguagesList: Array<{ value: string; text: string }> | null = null;

  private getSortedLanguagesList(): Array<{ value: string; text: string }> {
    if (!this._cachedLanguagesList) {
      this._cachedLanguagesList = this.buildSortedLanguagesList();
    }
    return this._cachedLanguagesList;
  }

  /**
   * Opens a dialog for selecting or entering a default language for the document.
   *
   * @param {Function} callback - A callback function that is invoked with the new language code selected by the user.
   */
  private readonly openChooseDefaultLangDialog = (callback: (newLang: string) => any) => {
    const self: LanguageSelect = this;
    if(!self.isTinyMCE4) {
      self.openChooseDefaultLangDialogV5Plus(callback);
    } else {
      self.openChooseDefaultLangDialogV4(callback);
    }
  };

  /**
   * Opens a dialog for selecting or entering a default language for the document.
   *
   * @param {Function} callback - A callback function that is invoked with the new language code selected by the user.
   */
  private readonly openChooseDefaultLangDialogV4 = (callback: (newLang: string) => any) => {
    const self: LanguageSelect = this;

    const initialLanguageValue =
      self.getTinymceDefaultDocumentLanguage?.() || this.editorLanguage || LanguageSelect.CONFIG.DEFAULT_LANG;
    const currentDefaultDocLang = self.getDocumentDefaultLanguage();

    const languages = this.getSortedLanguagesList(); // [{ value, text }]

    // Build a little “current default” text block
    const currentDefaultHtml =
      `<div style="margin-bottom:10px">${this.translate('Current language:')} ${this.getLanguageCodeDescription(currentDefaultDocLang) || this.translate('None')}</div>`;

    // TinyMCE 4 windowManager.open uses body/bodyType instead of body:{type:"panel"/"tabpanel",…}
    if (this.editor?.windowManager?.open) this.editor.windowManager.open({
      title: this.translate(`Select the document's default language.`),

      // One simple form (no v5-style tabpanel); TinyMCE 4 will create OK/Cancel buttons for us
      body: [
        // v4 doesn’t have "htmlpanel", use "container" with html instead
        {
          type: 'container',
          html: currentDefaultHtml
        },
        // v4 doesn’t have "selectbox", use "listbox"
        {
          type: 'listbox',
          name: 'language',
          label: this.translate('New Language:'),
          values: languages,        // [{ text, value }]
          value: initialLanguageValue
        },
        // v4 doesn’t have "input", use "textbox"
        {
          type: 'textbox',
          name: 'manualLanguage',
          label: this.translate('Or enter a new lang code (e.g., "en-US"):'),
          value: ''
        }],

      /**
       * TinyMCE 4 uses "onsubmit" instead of "onSubmit" and passes an event with "data".
       */
      onsubmit: (e: any) => {
        const data = e.data || {};
        let newLang: string = '';

        // If the user typed something, prefer that; otherwise use the listbox value.
        if (data.manualLanguage && data.manualLanguage.trim().length > 0) {
          newLang = data.manualLanguage.trim();
        } else if (data.language && data.language.trim().length > 0) {
          newLang = data.language.trim();
        } else {
          newLang = initialLanguageValue;
        }

        // Validate & normalise
        if (!LanguageSelect.isValidLang(newLang)) {
          if (self.editor?.windowManager?.alert) self.editor.windowManager.alert(
            self.translate('The language code you entered is not valid. Please enter a valid BCP 47 language tag.')
          );
          // Prevent the dialog from closing: TinyMCE 4 just keeps it open if we don’t call close()
          if (e.preventDefault) {
            e.preventDefault();
          }
          return false;
        }

        newLang = LanguageSelect.cleanLangAttr(newLang);

        if (self?.editor?.focus) {
          self.editor.focus();
        }

        // Do whatever you already do in your callback (set doc lang, update elements, etc.)
        callback(newLang);

        // The dialog will close automatically after onsubmit returns.
      }
    });
  };

  /**
   * Opens a dialog for selecting or entering a default language for the document.
   *
   * @param {Function} callback - A callback function that is invoked with the new language code selected by the user.
   */
  private readonly openChooseDefaultLangDialogV5Plus = (callback: (newLang: string) => any) => {
    const self: LanguageSelect = this;

    const initialLanguageValue = self.getTinymceDefaultDocumentLanguage() || self.editorLanguage || LanguageSelect.CONFIG.DEFAULT_LANG;
    const currentDefaultDocLang = self.getDocumentDefaultLanguage();

    // Keep track of the currently active tab
    let currentTab = "listTab1";

    // Initialize an array to hold language options
    const languages = self.getSortedLanguagesList();

    // Open the dialog using TinyMCE's windowManager API
    if (self.editor?.windowManager?.open) self.editor.windowManager.open({
      title: self.translate(`Select the document's default language.`), // Dialog title
      body: {
        type: "tabpanel",
        tabs: [
          {
            name: "listTab1", // First tab for selecting a language from a list
            title: self.translate('Choose from list'),
            items: [
              {
                type: "htmlpanel",
                html: `<div style="margin-bottom:10px">${self.translate('Current language:')} ${self.getLanguageCodeDescription(currentDefaultDocLang) || self.translate('None')}</div>`,
              },
              {
                type: "selectbox",
                name: "language",
                label: self.translate('New Language:'),
                items: languages, // Use the sorted languages array for options
              },
            ],
          },
          {
            name: "listTab2", // Second tab for manually entering a language code
            title: self.translate('Manual language entry'),
            items: [
              {
                type: "htmlpanel",
                html: `<div style="margin-bottom:10px">${self.translate('Current language:')} ${self.getLanguageCodeDescription(currentDefaultDocLang) || self.translate('None')}</div>`,
              },
              {
                type: "input",
                name: "manualLanguage",
                label: self.translate('Enter new lang code (e.g., "en-US"):'),
              },
            ],
          },
        ],
      },
      initialData: { language: initialLanguageValue.toLowerCase() }, // Prepopulate with current language
      buttons: [
        { type: "cancel", text: "Cancel" },
        { type: "submit", text: "Save", primary: true }, // Highlight the save button as primary
      ],

      /**
       * Callback for when the user changes tabs.
       * Updates the current tab to track which input method is being used.
       *
       * @param {Object} dialogApi - The dialog's API for interacting with the current state.
       * @param {Object} details - Details about the tab change event.
       */
      onTabChange(dialogApi: any, details: any) {
        currentTab = details.newTabName;
      },

      /**
       * Callback for when the user submits the dialog.
       * Validates and processes the selected or entered language code.
       *
       * @param {Object} api - The dialog's API for retrieving form data.
       */
      onSubmit(api: any) {
        const data = api.getData();
        let newLang: string =
          currentTab === "listTab2" ? data.manualLanguage : data.language;

        // Validate the new language code using a regex pattern
        if (LanguageSelect.isValidLang(newLang.trim())) {
          newLang = LanguageSelect.cleanLangAttr(newLang); // Clean the language code for consistency
          if (self?.editor?.focus) self.editor.focus(); // Bring focus back to the editor
          callback(newLang); // Invoke the callback with the new language
          api.close(); // Close the dialog
        } else {
          // If validation fails, alert the user to correct the input
          alert(
            "Enter a valid language code with no spaces. Or, press cancel."
          );
        }
      },
    });
  };

  /**
   * Opens a dialog for selecting languages in the menu
   *
   * @param {Function} callback - A callback function that is invoked with the new language code selected by the user.
   */
  private readonly openConfigureLanguagesOnSelectbox = (
    langMenuItems: string[] = [],
    callback: ((langs: string[]) => void)
) => {
    const self: LanguageSelect = this;
    if(!self.isTinyMCE4) {
      self.openConfigureLanguagesOnSelectboxV5Plus(langMenuItems, callback);
    } else {
      self.openConfigureLanguagesOnSelectboxV4(langMenuItems, callback);
    }
  };

  private readonly openConfigureLanguagesOnSelectboxV4 = (
    langMenuItems: string[] = [],
    callback: ((langs: string[]) => void)
  ) => {
    const self: LanguageSelect = this;

    // Build list of languages for the listbox
    const languages = self.getSortedLanguagesList().slice(); // [{ value, text }]
    // Add "Other" and "None" options
    languages.unshift({ value: "-o-", text: self.translate("Other - Enter manually") });
    languages.unshift({ value: "-n-", text: self.translate("None") });

    const maxItems = LanguageSelect.CONFIG.MAX_MENU_ITEMS;

    // Pre-fill selections based on langMenuItems
    const initialSelect: Record<number, string> = {};
    const initialInput: Record<number, string> = {};

    langMenuItems.forEach((lang, index) => {
      const slot = index + 1;
      if (slot > maxItems) {
        return;
      }

      if (Object.prototype.hasOwnProperty.call(LanguageSelect.languageTags, lang)) {
        initialSelect[slot] = lang.toLowerCase();
      } else {
        initialSelect[slot] = "-o-";
        initialInput[slot] = LanguageSelect.cleanLangAttr(lang);
      }
    });

    // TinyMCE 4 body: array of controls, no panel/tabpanel types
    const body: any[] = [
      {
        type: "container",
        html: `<div style="margin-bottom:10px">${self.translate("Choose up to six languages")}</div>`
      }
    ];

    for (let i = 1; i <= maxItems; i++) {
      const selectName = `langSelect_${i}`;
      const inputName = `langInput_${i}`;

      body.push(
        {
          type: "listbox",             // v4 control type
          name: selectName,
          label: self.translateTemplate("Select language {{number}}:", { number: i }),
          values: languages,           // v4 uses "values" not "items"
          value: initialSelect[i] || "" // pre-select if we have one
        },
        {
          type: "textbox",             // v4 text input
          name: inputName,
          label: self.translateTemplate("Manually enter language {{number}}:", { number: i }),
          value: initialInput[i] || "" // pre-fill manual lang if relevant
        }
      );
    }

    // Open a legacy (v4-style) window. This works in TinyMCE 4 and 5.
    if (self.editor?.windowManager?.open) self.editor.windowManager.open({
      title: self.translate("Choose languages"),
      body,

      // v4 callback signature
      onsubmit(e: any) {
        const data = e.data || {};
        const selectedLangs: string[] = [];

        for (let i = 1; i <= LanguageSelect.CONFIG.MAX_MENU_ITEMS; i++) {
          const selectName = `langSelect_${i}`;
          const inputName = `langInput_${i}`;

          const selected = (data[selectName] || "").trim();
          const manual = (data[inputName] || "").trim();

          if (!selected && !manual) {
            continue; // nothing chosen in this slot
          }

          // Skip explicit "None"
          if (selected === "-n-") {
            continue;
          }

          // Manual entry path ("Other")
          if (selected === "-o-") {
            if (!LanguageSelect.isValidLang(manual)) {
              alert(
                self.translate(
                  "Enter a valid language code with no spaces. Or, press cancel."
                )
              );
              // Keep dialog open
              if (e.preventDefault) {
                e.preventDefault();
              }
              return false;
            }
            selectedLangs.push(LanguageSelect.cleanLangAttr(manual));
            continue;
          }

          // Normal list selection
          if (LanguageSelect.isValidLang(selected)) {
            selectedLangs.push(LanguageSelect.cleanLangAttr(selected));
          }
        }

        if (self?.editor?.focus) self.editor.focus(); // Bring focus back to the editor

        if (callback) {
          callback(selectedLangs);
        }
        // In v4 the dialog closes automatically after onsubmit returns
      }
    });
  };

  /**
   * Opens a dialog to configure up to six languages, allowing the user to either select from a list or enter manually.
   *
   * @param {Array} langMenuItems - An array of pre-selected language codes (up to 6). If empty, no languages are pre-selected.
   * @param {Function} callback - A callback function that is invoked with the updated list of languages after submission.
   */
  private readonly openConfigureLanguagesOnSelectboxV5Plus = (langMenuItems: string[] = [], callback: ((langs: string[]) => void)) => {
    const self: LanguageSelect = this;

    // Create an array for select box items, with "None" and "Other" options.
    const languages = self.getSortedLanguagesList();
    languages.unshift({ value: "-n-", text: self.translate('None') }); // Option to select "None"
    languages.unshift({ value: "-o-", text: self.translate('Other - Enter manually') }); // Option to enter manually

    // Create the list of items for the dialog's language selection section.
    const languageChoiceItems: any[] = [
      {
        type: "htmlpanel",
        html: `<div style="margin-bottom:10px">${self.translate('Choose up to six languages')}</div>`,
      },
    ];

    let langCounter = 0;

    // If langMenuItems are provided, create the selection interface for them.
    langMenuItems.forEach((lang) => {
      langCounter++;
      languageChoiceItems.push({
        type: "bar",
        items: [
          {
            type: "selectbox",
            name: `langSelect_${langCounter}`,
            label: `${self.translateTemplate('Select language {{number}}:', { number: langCounter })}`,
            items: languages, // Use the languages array for selection options
          },
          {
            type: "input",
            name: `langInput_${langCounter}`,
            label: `${self.translateTemplate('Manually enter language {{number}}:', { number: langCounter })}`,
            disabled: Object.prototype.hasOwnProperty.call(LanguageSelect.languageTags, lang), // Disable input if language is predefined (pre v7)
            enabled: !Object.prototype.hasOwnProperty.call(LanguageSelect.languageTags, lang), // Disable input if language is predefined
          },
        ],
      });
    });

    // Add additional empty language selectors up to the maximum (6 total).
    for (langCounter++; langCounter <= LanguageSelect.CONFIG.MAX_MENU_ITEMS; langCounter++) {
      languageChoiceItems.push({
        type: "bar",
        items: [
          {
            type: "selectbox",
            name: `langSelect_${langCounter}`,
            label: `${self.translateTemplate('Select language {{number}}:', { number: langCounter })}`,
            items: languages,
          },
          {
            type: "input",
            name: `langInput_${langCounter}`,
            label: `${self.translateTemplate('Manually enter language {{number}}:', { number: langCounter })}`,
            disabled: true, // Initially disabled as no manual input is expected. (pre v7)
            enabled: false,
          },
        ],
      });
    }

    // Prepare initial data to pre-fill the selection boxes based on provided langMenuItems.
    const initData: Record<string, string> = {};
    langMenuItems.forEach((lang: string, index: number) => {
      const counter = index + 1;
      if (Object.prototype.hasOwnProperty.call(LanguageSelect.languageTags, lang)) {
        initData[`langSelect_${counter}`] = lang.toLowerCase();
      } else {
        initData[`langSelect_${counter}`] = "-o-"; // Mark as manual entry
        initData[`langInput_${counter}`] = LanguageSelect.cleanLangAttr(lang); // Pre-fill with cleaned manual language
      }
    });

    // Open the dialog for language configuration
    if (self.editor?.windowManager?.open) self.editor.windowManager.open({
      title: self.translate('Choose languages'), // Dialog title
      body: { type: "panel", items: languageChoiceItems }, // Populate dialog with language choice items
      buttons: [
        { type: "cancel", text: "Cancel" },
        { type: "submit", text: "Save", primary: true }, // Highlight "Save" as the primary action
      ],

      /**
       * Callback to handle changes in the dialog, enabling/disabling manual input based on selection.
       *
       * @param {Object} dialogApi - The dialog's API for retrieving and modifying data.
       * @param {Object} details - Contains details about the change event.
       */
      onChange(dialogApi: any, details: any) {
        const data = dialogApi.getData(); // Get the current dialog data
        // Enable or disable manual input fields based on "Other" selection
        for (let i = 1; i <= LanguageSelect.CONFIG.MAX_MENU_ITEMS; i++) {
          if (data[`langSelect_${i}`] === "-o-") {
            if (dialogApi.setEnabled) {
              dialogApi.setEnabled(`langInput_${i}`, true);
            } else if (dialogApi.enable) {
              dialogApi.enable(`langInput_${i}`);
            }
          } else {
            if (dialogApi.setEnabled) {
              dialogApi.setEnabled(`langInput_${i}`, false);
            } else if (dialogApi.disable) {
              dialogApi.disable(`langInput_${i}`);
            }
          }
        }
      },

      initialData: initData, // Set the initial data for pre-selecting options

      /**
       * Callback for when the user submits the dialog.
       * Validates the selected or manually entered language codes.
       *
       * @param {Object} dialogApi - The dialog's API for retrieving form data.
       */
      onSubmit(dialogApi: any) {
        const data = dialogApi.getData();
        const selectedLangs = [];

        // Validate language selections and manual entries
        for (let i = 1; i <= LanguageSelect.CONFIG.MAX_MENU_ITEMS; i++) {
          const selectedLang = data[`langSelect_${i}`];
          const manualLang = data[`langInput_${i}`]?.trim();

          if (selectedLang === "-o-" && !LanguageSelect.isValidLang(manualLang)) {
            alert(
              self.translate('Enter a valid language code with no spaces. Or, press cancel.')
            );
            return;
          }

          // Collect valid languages
          if (LanguageSelect.isValidLang(selectedLang)) {
            selectedLangs.push(selectedLang);
          } else if (
            selectedLang === "-o-" &&
            LanguageSelect.isValidLang(manualLang)
          ) {
            selectedLangs.push(manualLang);
          }
        }

        // Focus back on the editor and invoke the callback with the selected languages
        if (self?.editor?.focus) self.editor.focus();
        if (callback) callback(selectedLangs);
        dialogApi.close(); // Close the dialog after submission
      },
    });
  };

  /**
   * Highlights elements with `lang` attributes in the TinyMCE editor document.
   * Applies different background colors and border styles to indicate language markup.
   */
  private revealLangMarkUp() {
    const self: LanguageSelect = this;
    const doc = self.getEditorDoc() || window.document;
    const languagesFound: Record<string, string> = {};

    // Remove any existing stylesheet for viewing lang markup
    const existingStyle = doc.getElementById(LanguageSelect.CONFIG.LANG_ATTR_QA_ID);
    if (existingStyle?.parentElement) existingStyle.parentElement.removeChild(existingStyle);

    // Initialize available colors for highlighting
    const availableColors = [...self.colorsAvailable];
    const defaultColor = "#e1f3f8";

    // Collect unique languages found in the document and assign colors
    const langElements = doc.querySelectorAll("*[lang]");
    langElements.forEach((el: Element) => {
      const langFound: string = LanguageSelect.cleanLangAttr(el.getAttribute("lang"));
      if (langFound && !languagesFound.hasOwnProperty(langFound)) {
        languagesFound[langFound] =
          (availableColors.length > 0 ? availableColors.shift() : defaultColor) || defaultColor;
      }
    });

    // Merge predefined language colors into the found languages
    Object.keys(self.langColors).forEach((langCode) => {
      languagesFound[LanguageSelect.cleanLangAttr(langCode)] = self.langColors[langCode];
    });

    // Create and append a new stylesheet for language markup visualization
    const styleSheet = doc.createElement("style");
    styleSheet.setAttribute("id", LanguageSelect.CONFIG.LANG_ATTR_QA_ID);

    Object.entries(languagesFound).forEach(([langCode, color]) => {
      styleSheet.appendChild(
        doc.createTextNode(`
          *[lang="${langCode}"] {
            padding: 3px;
            margin: 2px;
            background-color: ${color} !important;
            border: thin solid black;
          }
          *[lang="${langCode}"]:before {
            content: "[${langCode}]";
          }
          *[lang="${langCode}"]:after {
            content: "[/${langCode}]";
          }
        `)
      );
    });

    doc.head.appendChild(styleSheet);
    if (self?.editor?.focus) self.editor.focus(); // Bring focus back to the editor
  }

  /**
   * Refreshes the language markup styles in the TinyMCE editor document.
   * Re-applies the styles if the LanguageSelect.CONFIG.LANG_ATTR_QA_ID stylesheet is present.
   */
  private refreshQaStyles() {
    const self: LanguageSelect = this;
    const qaStyleElement = (self.getEditorDoc() || window.document).getElementById(LanguageSelect.CONFIG.LANG_ATTR_QA_ID);
    if (qaStyleElement) {
      self.revealLangMarkUp();
    }
  }

  /**
   * Removes the language markup stylesheet from the TinyMCE editor document.
   */
  private hideLangMarkUp() {
    const self: LanguageSelect = this;
    const doc = self.getEditorDoc() || window.document;

    // Remove the stylesheet for viewing lang markup if it exists
    const styleElement = doc.getElementById(LanguageSelect.CONFIG.LANG_ATTR_QA_ID);
    if (styleElement?.parentElement) {
      styleElement.parentElement.removeChild(styleElement);
    }
    if (self?.editor?.focus) self.editor.focus(); // Bring focus back to the editor
  }

  /**
   * Sets the default language for the document in the TinyMCE editor.
   * Updates or creates a `div` with the ID LanguageSelect.CONFIG.DEFAULT_LANG_HOLDER_ID and applies the specified language.
   *
   * @param {string} langValue - The language code to set as the default document language.
   */
  private setDefaultDocumentLanguage(langValue: string) {
    const self: LanguageSelect = this;
    const editorDoc = self.getEditorDoc();

    if (editorDoc && LanguageSelect.isNotBlank(langValue)) {

      if (self.editor?.undoManager?.transact) {
        self.editor.undoManager.transact(() => {

          const dir = LanguageSelect.getTextDirection(langValue);
          langValue = LanguageSelect.cleanLangAttr(langValue);
          let defaultLangDiv = editorDoc.getElementById(LanguageSelect.CONFIG.DEFAULT_LANG_HOLDER_ID);

          // Create or update the language holder div
          if (defaultLangDiv) {
            defaultLangDiv.setAttribute("lang", langValue);
            if (LanguageSelect.CONFIG.SET_DIR_WHEN_SETTING_LANG) defaultLangDiv.setAttribute("dir", dir);
          } else {
            defaultLangDiv = editorDoc.createElement("div");
            defaultLangDiv.id = LanguageSelect.CONFIG.DEFAULT_LANG_HOLDER_ID;
            defaultLangDiv.setAttribute("lang", langValue);
            if (LanguageSelect.CONFIG.SET_DIR_WHEN_SETTING_LANG) defaultLangDiv.setAttribute("dir", dir);
            editorDoc.body.insertBefore(defaultLangDiv, editorDoc.body.firstChild);
          }

          // Move all sibling elements into the default language div
          self.moveSiblingsIntoElement(defaultLangDiv);

        });
      }

    }

    if (self?.editor?.focus) self.editor.focus(); // Bring focus back to the editor
  }

  /**
   * Moves all sibling elements of the target element into the target element.
   *
   * @param {Element} targetElement - The element to collect all its siblings.
   */
  private moveSiblingsIntoElement(targetElement: Element) {
    // Append all next siblings to the target element
    while (targetElement.nextSibling) {
      targetElement.appendChild(targetElement.nextSibling);
    }

    // Insert all previous siblings before the target element's first child
    while (targetElement.previousSibling) {
      targetElement.insertBefore(
        targetElement.previousSibling,
        targetElement.firstChild
      );
    }
  }

  /**
   * Removes the `lang` attribute from the element at the current cursor position in the TinyMCE editor.
   * Also removes any empty `span` elements with only the class `langMarkUp`.
   */
  private removeLangMarkupAtCursor(): void {
    const self: LanguageSelect = this;
    const doc: Document | null = self.getEditorDoc();
    if (!doc) return;

    const selection: Selection | null = doc.getSelection();

    // Check if a single range is selected and the cursor is collapsed (no text selection)
    if (selection && selection.rangeCount === 1) {
      const range = selection.getRangeAt(0);

      if (range.collapsed) {
        let element: Element | null =
          range.startContainer.nodeType === 3
            ? range.startContainer.parentElement
            : range.startContainer as Element;

        // Traverse up the DOM to find the first ancestor with a `lang` attribute
        while (element && !(element.hasAttribute && element.hasAttribute("lang"))) {
          element = element.parentElement;
        }

        // If a `lang` attribute is found, remove it and clean up the element if necessary
        if (element?.removeAttribute) {
          element.removeAttribute("lang");

          // If the element is a span with only the `langMarkUp` class and no other attributes, unwrap it
          if (
            element.nodeName.toLowerCase() === "span" &&
            self.spanIsRemovable(element)
          ) {
            self.unwrapElement(element);
          }
        }
      }
    }

    // Clean up any remaining empty `span.langMarkUp` elements
    const emptyLangSpans: NodeListOf<Element> = doc.querySelectorAll("span.langMarkUp:not([lang])");
    emptyLangSpans.forEach((langEl: Element): void => {
      if (self.spanIsRemovable(langEl)) {
        self.unwrapElement(langEl);
      }
    });

    if (self?.editor?.focus) self.editor.focus(); // Bring focus back to the editor
  }

  /**
   * Checks if the `span` element is removable, i.e., it has no other attributes
   * and has only the `langMarkUp` class.
   *
   * @param {Element} el - The `span` element to check.
   * @returns {boolean} - True if the element can be removed; false otherwise.
   */
  private spanIsRemovable(el: Element) {
    return (
      el.attributes.length === 1 &&
      el.classList.contains("langMarkUp") &&
      el.classList.length === 1
    );
  }

  /**
   * Unwraps the children of the specified element, removing the element itself.
   *
   * @param {Element} el - The element to be unwrapped and removed.
   */
  private unwrapElement(el: Element) {
    while (el.firstChild && el.parentElement) {
      el.parentElement.insertBefore(el.firstChild, el);
    }
    if (el.parentElement) el.parentElement.removeChild(el);
  }

  /**
   * Removes all language markup from the document after user confirmation.
   * Unwraps and removes any `span` elements with only the `langMarkUp` class.
   */
  private removeAllLangSpans(): void {
    const self: LanguageSelect = this;
    if (!confirm(self.translate('Really remove all language markup from the document?')))
      return;

    const doc = self.getEditorDoc();

    if (doc) {
      // Remove `lang` attributes from all elements and clean up if necessary
      const langElements = doc.querySelectorAll("*[lang]");
      langElements.forEach((langEl: Element) => {
        langEl.removeAttribute("lang");
        if (self.spanIsRemovable(langEl)) {
          self.unwrapElement(langEl);
        }
      });

      // Clean up any remaining empty `span.langMarkUp` elements
      const emptyLangSpans = doc.querySelectorAll("span.langMarkUp:not([lang])");
      emptyLangSpans.forEach((langEl: Element) => {
        if (self.spanIsRemovable(langEl)) {
          self.unwrapElement(langEl);
        }
      });
    }
    if (self?.editor?.focus) self.editor.focus(); // Bring focus back to the editor
  }

  /**
   * Registers a new format in the TinyMCE editor for applying a language attribute.
   *
   * @param {string} lang - The language code to be applied to the selected text.
   */
  private registerFormat(langValue: string) {
    if (!(this.editor && this.editor.formatter && this.editor.formatter.register)) {
      console.warn('No editor');
      return;
    }
    if (!langValue || typeof langValue != 'string') return;

    // Clean and standardize the language attribute value
    langValue = LanguageSelect.cleanLangAttr(langValue);

    // Define a unique format name based on the language code
    const formatToApply: string = "setLangTo_" + langValue;
    const dir = LanguageSelect.getTextDirection(langValue);

    // Register the new format with TinyMCE
    if (LanguageSelect.CONFIG.SET_DIR_WHEN_SETTING_LANG) {
      this.editor.formatter.register(formatToApply, {
        inline: "span",
        attributes: {
          lang: langValue,
          dir: dir,
          class: "langMarkUp",
        },
      });
    } else {
      this.editor.formatter.register(formatToApply, {
        inline: "span",
        attributes: {
          lang: langValue,
          class: "langMarkUp",
        },
      });
    }

    // Track the registered format to avoid duplicate registrations
    this.langFormatsRegistered[formatToApply] = true;
  }

  /**
   * Applies a specified language format to the document in the TinyMCE editor.
   * If the language format is not registered, it registers and applies it.
   *
   * @param {string} langValue - The language code to apply to the document.
   */
  private setDocLangTo(langValue: string): void {
    langValue = LanguageSelect.cleanLangAttr(langValue);
    const formatToApply = `setLangTo_${langValue}`;


    // Ensure the format is registered before applying
    if (!this.langFormatsRegistered.hasOwnProperty(formatToApply)) {
      this.registerFormat(langValue);
    }

    // Apply the format within an undo transaction
    if (this.editor?.undoManager?.transact) {
      this.editor.undoManager.transact(() => {
        if (this.editor?.formatter?.apply) this.editor.formatter.apply(formatToApply);
      });
    }

    // Refresh the QA styles to reflect the new language format
    this.refreshQaStyles();
    if (this.editor?.focus) this.editor.focus();
  }

  /**
   * Updates the text of the language selector button in the TinyMCE editor.
   * If the button has not been found, it searches the DOM for a button with the correct aria-label or title.
   * Once found, it updates the button's text based on the provided language.
   *
   * @param {string} newLang - The new language code to display on the button.
   */
  private updateLanguageSelector(newLang: string | null = null) {
    try {
      // If the button pointer is not yet set, search for the language button in the DOM
      if (!this.myButtonTextPtr) {
        const container: Element | null = this.editor?.getContainer ? this.editor.getContainer() : null;
        if (container) {
          const buttons: NodeListOf<Element> = container.querySelectorAll(
            "button[aria-haspopup=true]"
          );

          // Loop through buttons to find the one with the correct aria-label or title
          buttons.forEach((button: Element) => {
            const isTextLanguageButton =
              button.getAttribute("aria-label") === this.translate('Set text language') ||
              button.getAttribute("title") === this.translate('Set text language');

            if (isTextLanguageButton && button.firstElementChild) {
              // Store the reference to the text node inside the button
              const firstChild = button.firstElementChild;
              if (firstChild instanceof HTMLElement) {
                this.myButtonTextPtr = firstChild;
                this.myButtonTextPtr.dataset.style = "width:10em;overflow:hidden;display:block";
                this.myButtonTextPtr.dataset.originalHTML = button.firstElementChild.innerHTML;
              }
            }
          });
        }
      }

      // If the button was found, update its text with the new language or fallback to the default
      if (this.myButtonTextPtr) {
        if (this.showCurrentLangCodeOnly) {
          if (LanguageSelect.isNotBlank(newLang)) {
            this.myButtonTextPtr.innerText = newLang;
          } else {
            this.myButtonTextPtr.innerHTML = this.myButtonTextPtr.dataset.originalHTML || '';
          }
        } else {
          if (LanguageSelect.isNotBlank(newLang)) {
            this.myButtonTextPtr.innerText =
              this.getShortLanguageCodeDescription(newLang.toLowerCase()) || newLang || this.translate('-Language Not Set-');
          } else {
            this.myButtonTextPtr.innerText = this.translate('-Language Not Set-');
          }
        }
      }
    } catch (ex) {
      // ignore errors
    }
  }

  private readonly initializeLanguageMenuEntriesList = () => {
    // Initialize language menu items if they are not already populated
    if (this.langMenuItems.length < 1) {
      const sortedArrayOfLangs = this.analyzeEditorDocumentLangUsage(); // Analyze current language usage in the document

      // Add the default language of the page holding the editor if valid
      if (
        LanguageSelect.isValidLang(this.editorLanguage) &&
        !this.langMenuItems.includes(this.editorLanguage.toLowerCase())
      ) {
        this.langMenuItems.push(this.editorLanguage.toLowerCase());
      }

      // Populate the menu with up to 6 most-used languages in the document
      sortedArrayOfLangs.forEach((lang: string) => {
        lang = lang.toLowerCase();
        if (this.langMenuItems.length < LanguageSelect.CONFIG.MAX_MENU_ITEMS && !this.langMenuItems.includes(lang)) {
          this.langMenuItems.push(lang);
        }
      });

      // Add configured default languages if not already in the list
      this.defaultLanguages.forEach((lang: string) => {
        lang = lang.toLowerCase();
        if (this.langMenuItems.length < LanguageSelect.CONFIG.MAX_MENU_ITEMS && !this.langMenuItems.includes(lang)) {
          this.langMenuItems.push(lang);
        }
      });
    }
  };

  private readonly buildEasyLangMenuItemsV4 = (): any[] => {
    const self: LanguageSelect = this;
    const items: any[] = [];

    self.initializeLanguageMenuEntriesList();

    // Per-language items (top level)
    self.langMenuItems.forEach((lang: string, index: number) => {
      const label =
        self.getShortLanguageCodeDescription(lang.toLowerCase()) ||
        LanguageSelect.cleanLangAttr(lang);

      items.push({
        text: label,
        // TinyMCE 4 uses `onclick` instead of `onAction`
        onclick: function () {
          // shortcuts are handled elsewhere in v4; menu items themselves
          // don't need shortcut metadata
          self.setDocLangTo(lang);
        }
      });
    });

    // --- Remove language markup submenu --------------------------------------
    items.push({
      text: self.translate('Remove Language Markup'),
      icon: self.hasDashIcons ? 'icon dashicons-editor-removeformatting' : 'remove',
      menu: [
        {
          text: self.translate('Remove current lang value'),
          icon: self.hasDashIcons ? 'icon dashicons-editor-removeformatting' : 'remove',
          onclick: function () {
            self.removeLangMarkupAtCursor();
            if (self?.editor?.focus) self.editor.focus();
          }
        },
        {
          text: self.translate('Remove All lang markup'),
          icon: self.hasDashIcons ? 'icon dashicons-warning' : 'warning',
          onclick: function () {
            self.removeAllLangSpans();
            if (self?.editor?.focus) self.editor.focus();
          }
        }
      ]
    });

    // --- Configure languages --------------------------------------------------
    items.push({
      text: self.translate('Configure languages'),
      icon: self.hasDashIcons ? 'icon dashicons-admin-generic' : 'preferences',
      onclick: function () {
        self.openConfigureLanguagesOnSelectbox(
          self.langMenuItems,
          (newLangMenuItems: string[]) => {
            self.langMenuItems = newLangMenuItems;
          }
        );
        if (self?.editor?.focus) self.editor.focus();
      }
    });

    // --- Set default document language ---------------------------------------
    items.push({
      text: self.translate('Set default document language'),
      icon: self.hasDashIcons ? 'icon dashicons-media-default' : 'document-properties',
      onclick: function () {
        self.openChooseDefaultLangDialog((newLang: string) => {
          self.setDefaultDocumentLanguage(newLang);
          self.refreshQaStyles();
        });
        if (self?.editor?.focus) self.editor.focus();
      }
    });

    // --- Toggle: Reveal lang markup ------------------------------------------
    items.push({
      text: self.translate('Reveal lang markup'),
      icon: self.hasDashIcons ? 'icon dashicons-visibility' : 'preview',
      onclick: function () {
        const menuItem = this as Types.TinyMCE4MenuItem;
        self.tsViewMarkup = !self.tsViewMarkup;
        if (self.tsViewMarkup) {
          self.revealLangMarkUp();
        } else {
          self.hideLangMarkUp();
        }
        menuItem.active(self.tsViewMarkup); 
        if (self?.editor?.focus) self.editor.focus();
      },
      onPostRender: function () {
        const menuItem = this as Types.TinyMCE4MenuItem;
        menuItem.active(self.tsViewMarkup); 
      }
    });

    // --- Toggle: Indicate current language -----------------------------------
    if (!self.showCurrentLanguage) {
      items.push({
        text: self.translate('Indicate current language'),
        icon: self.hasDashIcons ? 'icon dashicons-admin-site-alt3' : 'language',
        onclick: function () {
          const menuItem = this as Types.TinyMCE4MenuItem;
          self.showCurrentLanguage = !self.showCurrentLanguage;
          self.showCurrentLangCodeOnly = true;
          if (self.showCurrentLanguage) {
            self.updateLanguageSelector();
          }
          menuItem.active(self.showCurrentLanguage);
          if (self?.editor?.focus) self.editor.focus();
        },
        onPostRender: function () {
          const menuItem = this as Types.TinyMCE4MenuItem;
          menuItem.active(self.showCurrentLanguage); 
        }
      });
    }
    return items;
  };

  private readonly buildEasyLangMenuItems = (callback: Function | null = null) => {
    const self: LanguageSelect = this;
    const items: Types.LanguageMenuItem[] = []; // Array to hold menu items

    self.initializeLanguageMenuEntriesList();

    // Create menu items for each language in langMenuItems
    self.langMenuItems.forEach((lang: string, index: number) => {
      items.push({
        type: "menuitem",
        text: self.getShortLanguageCodeDescription(lang.toLowerCase()) || LanguageSelect.cleanLangAttr(lang), // Display language name
        shortcut: self.enableKeyboardShortcuts ? `meta+Shift+${index + 1}` : undefined,
        onAction: function () {
          self.setDocLangTo(lang); // Set document language to selected value
        },
      });
    });

    // Add nested menu item for removing language markup
    items.push({
      type: "nestedmenuitem",
      text: self.translate('Remove Language Markup'),
      icon: "remove",
      disabled: false,
      getSubmenuItems: (event1: Event) => {
        return [
          {
            type: "menuitem",
            text: self.translate('Remove current lang value'),
            icon: "remove",
            onAction: (event2: Event) => {
              self.removeLangMarkupAtCursor(); // Remove language markup at cursor
              if (self?.editor?.focus) self.editor.focus();
            },
          },
          {
            type: "menuitem",
            text: self.translate('Remove All lang markup'),
            icon: "warning",
            onAction: (event2: Event) => {
              self.removeAllLangSpans(); // Remove all language markup in the document
              if (self?.editor?.focus) self.editor.focus();
            },
          },
        ];
      },
    });

    // Add item to configure languages
    items.push({
      type: "menuitem",
      icon: "preferences",
      text: self.translate('Configure languages'),
      onAction: (event: Event) => {
        // Open the configuration dialog for languages
        self.openConfigureLanguagesOnSelectbox(self.langMenuItems, (newLangMenuItems: string[]) => {
          self.langMenuItems = newLangMenuItems;
        });
        if (self?.editor?.focus) self.editor.focus(); // Bring focus back to the editor
      },
    });

    // Add item to set default document language
    items.push({
      type: "menuitem",
      icon: "document-properties",
      text: self.translate('Set default document language'),
      onAction: (event: Event) => {
        // Open the default language dialog
        self.openChooseDefaultLangDialog((newLang: string) => {
          self.setDefaultDocumentLanguage(newLang);
          self.refreshQaStyles(); // Refresh styles after language change
        });
        if (self?.editor?.focus) self.editor.focus(); // Bring focus back to the editor
      },
    });

    // Toggle item for revealing/hiding language markup
    items.push({
      type: "togglemenuitem",
      text: self.translate('Reveal lang markup'),
      icon: "preview",
      onAction: (event: Event) => {
        self.tsViewMarkup = !self.tsViewMarkup;
        if (self.tsViewMarkup) {
          self.revealLangMarkUp(); // Reveal language markup
        } else {
          self.hideLangMarkUp(); // Hide language markup
        }
        if (self?.editor?.focus) self.editor.focus(); // Bring focus back to the editor
      },
      onSetup: function (api: any) {
        api.setActive(self.tsViewMarkup); // Set active state based on current view
        return function () { }; // Return a teardown function (optional)
      },
    });

    if (!self.showCurrentLanguage) {
      // Toggle item for revealing/hiding language markup
      items.push({
        type: "togglemenuitem",
        text: self.translate('Indicate current language'),
        icon: "language",
        onAction: (event2: Event) => {
          self.showCurrentLanguage = !self.showCurrentLanguage;
          self.showCurrentLangCodeOnly = true; // Not enough room to show language name
          if (self.showCurrentLanguage) {
            self.updateLanguageSelector(); // Show current language in toolbar
          } else {
            // self.updateLanguageSelector('');
          }
          if (self?.editor?.focus) self.editor.focus(); // Bring focus back to the editor
        },
        onSetup: function (api: any) {
          api.setActive(self.showCurrentLanguage); // Set active state based on current view
          return function () { }; // Return a teardown function (optional)
        },
      });
    }

    if (callback) {
      callback(items); // Execute callback with the built menu items
    } else {
      return items;
    }
  };

  private readonly addKeyboardShortcuts = () => {
    if (this.enableKeyboardShortcuts && this.keyboardShortCuts && this.keyboardShortCuts.length > 0) {
      this.keyboardShortCuts.forEach((shortcut, index) => {
        shortcut = shortcut.trim();
        if (shortcut > "") {
          const langNumber = index + 1;
          const commandName = `setLanguageShortcut${langNumber}`;
          // Define a custom command
          if (this.editor?.addCommand) this.editor.addCommand(commandName, (event: Event): void => {
            if (this.langMenuItems.length <= index) return; // No language defined for this shortcut
            this.setDocLangTo(this.langMenuItems[index]); // Set document language to selected value
          });

          // Assign the keyboard shortcut Ctrl+Shift+1 to the command
          if (this.editor?.addShortcut) this.editor.addShortcut(shortcut, `Apply Language ${langNumber}`, commandName);
        }
      });
    }
  }

  // TODO: the types for the editor probably need adjusted to handle version 4 vs version 5+
  // Initialize settings specific to TinyMCE version 4 as needed by WP/Pressbooks
  private initV4() {
    const self: LanguageSelect = this;

    if (!(self.editor && self.editor.getParam && self.editor.addButton)) throw new Error('No supported editor instance found');

    const new_icon_name = self.editor.getParam("easylang_icon");

    if (LanguageSelect.isNotBlank(new_icon_name)) {
      self.iconName = new_icon_name.trim();
    } else if (self.isWordPress && self.hasDashIcons) {
      self.iconName = 'icon dashicons-translation'
    } else {
      self.iconName = null;
    }

    self.editor.addButton('languageSelector', {
      type: 'menubutton',
      text: self.iconName ? null : 'Language',
      icon: self.iconName ? self.iconName : null,
      tooltip: self.translate('Set text language'), // Tooltip for the button
      menu: self.buildEasyLangMenuItemsV4(),    // now includes a submenu
      onPostRender: function (this: Types.TinyMCE4MenuButtonControl) {
        var ctrl = this;

        function refreshMenu() {
          if (self.menuIsRefreshing) return;
          const newMenu = self.buildEasyLangMenuItemsV4();

          // Compare only structural parts: text + submenu shapes.
          function menusAreEqual(a: any[], b: any[]): boolean {
            if (a === b) return true;
            if (!Array.isArray(a) || !Array.isArray(b)) return false;
            if (a.length !== b.length) return false;

            for (let i = 0; i < a.length; i++) {
              const ai = a[i];
              const bi = b[i];

              // If text differs, menu item differs.
              if (ai.text !== bi.text) return false;

              // If submenu existence differs, menu differs.
              const aHasMenu = Array.isArray(ai.menu);
              const bHasMenu = Array.isArray(bi.menu);
              if (aHasMenu !== bHasMenu) return false;

              // If both have submenus, recurse.
              if (aHasMenu && bHasMenu) {
                if (!menusAreEqual(ai.menu, bi.menu)) return false;
              }

              // NOTE: Intentionally ignoring onclick, because two functions
              // always compare unequal by reference — but they do not matter
              // for the “shape” and would cause false changes every time.
            }

            return true;
          }

          const currentMenu = ctrl.settings.menu;

          // Only update if changed otherwise menu will not toggle close on click
          if (!menusAreEqual(newMenu, currentMenu)) {
            self.menuIsRefreshing = true;
            setTimeout(() => {
              self.menuIsRefreshing = false;
            }, 100);

            ctrl.settings.menu = newMenu;
            ctrl.state.data.menu = newMenu;

            // Destroy existing TinyMCE 4 menu object so it regenerates
            if (ctrl.menu) {
              try {
                ctrl.menu.remove();
              } catch (e) {
                // ignore
              } finally {
                ctrl.menu = null;
              }
            }
          }
          self.menuIsRefreshing = false;
        }

        const editorContentChangeEventHandler = function () {
          let currentNode: Element | null = null;
          if (self.editor && self.editor.selection && self.editor.selection.getNode) {
            currentNode = self.editor.selection.getNode();
            let lastCurrentLang = '';
            [lastCurrentLang] = self.getDocumentElementLang(currentNode);

            // Update the visible label if you support “show current language” in V4
            if (self.showCurrentLanguage) {
              self.updateLanguageSelector(lastCurrentLang);
            }

            // Set the active state when a lang is present
            ctrl.active(LanguageSelect.isNotBlank(lastCurrentLang));
          }
        };

        // Initial sync
        editorContentChangeEventHandler();

        // Hook editor events
        if (self.editor && self.editor.on) {
          self.editor.on('NodeChange', editorContentChangeEventHandler);
          self.editor.on('SetContent', editorContentChangeEventHandler);
          self.editor.on('Focus', editorContentChangeEventHandler);
        }

        // Clean up when the control is removed
        ctrl.on('remove', function () {
          if (self.editor && self.editor.off) {
            self.editor.off('NodeChange', editorContentChangeEventHandler);
            self.editor.off('SetContent', editorContentChangeEventHandler);
            self.editor.off('Focus', editorContentChangeEventHandler);
          }
        });


        ctrl.on('mousedown', refreshMenu);
        ctrl.on('keydown', function (e: KeyboardEvent) {
          const key = e.key;
          if (key === 'Enter' || key === ' ' || key === 'Spacebar' || key === 'ArrowDown') {
            refreshMenu();
          }
        });
      }
    });

    if (self.enableKeyboardShortcuts) {
      self.addKeyboardShortcuts();
    }
  }

  private initPostV4() {
    const self: LanguageSelect = this;

    if (!(self.editor && self.editor.getParam && self.editor.ui?.registry?.addIcon)) throw new Error('No supported editor instance found');

    self.editor.ui.registry.addIcon(
      "easyLangIcon",
      '<svg width="24" height="24"><g><path d="M10.9,8.1v1.7L5.1,7.2V5.8l5.9-2.6v1.7L6.8,6.5L10.9,8.1z"/><path d="M18.9,7.2l-5.9,2.6V8.2l4.1-1.6l-4.1-1.6V3.3l5.9,2.5V7.2z"/></g><g><path d="M0.2,19.8v-6.9c0-0.3,0.1-0.6,0.2-0.7s0.3-0.2,0.6-0.2s0.4,0.1,0.6,0.2s0.2,0.4,0.2,0.7v6.9c0,0.3-0.1,0.6-0.2,0.7 S1.3,20.8,1,20.8c-0.2,0-0.4-0.1-0.6-0.3S0.2,20.2,0.2,19.8z"/><path d="M7.5,19.9c-0.4,0.3-0.8,0.5-1.1,0.7s-0.8,0.2-1.2,0.2c-0.4,0-0.8-0.1-1.1-0.2s-0.5-0.4-0.7-0.7S3.1,19.3,3.1,19 c0-0.4,0.1-0.8,0.4-1.1s0.7-0.5,1.1-0.6c0.1,0,0.4-0.1,0.8-0.2s0.7-0.2,1-0.2s0.6-0.2,0.9-0.2c0-0.4-0.1-0.7-0.3-0.9 s-0.5-0.3-0.9-0.3c-0.4,0-0.7,0.1-0.9,0.2s-0.4,0.3-0.5,0.5s-0.2,0.4-0.3,0.4s-0.2,0.1-0.4,0.1c-0.2,0-0.3-0.1-0.5-0.2 S3.4,16.2,3.4,16c0-0.3,0.1-0.6,0.3-0.8s0.5-0.5,0.9-0.7s0.9-0.3,1.6-0.3c0.7,0,1.3,0.1,1.7,0.2s0.7,0.4,0.9,0.8S9,16.2,9,16.8 c0,0.4,0,0.7,0,1s0,0.6,0,0.9c0,0.3,0,0.6,0.1,0.9s0.1,0.5,0.1,0.6c0,0.2-0.1,0.3-0.2,0.4s-0.3,0.2-0.5,0.2c-0.2,0-0.3-0.1-0.5-0.2 S7.7,20.2,7.5,19.9z M7.4,17.6c-0.2,0.1-0.6,0.2-1,0.3S5.7,18,5.5,18.1S5.1,18.2,5,18.3s-0.2,0.3-0.2,0.5c0,0.2,0.1,0.4,0.3,0.6 s0.4,0.3,0.7,0.3c0.3,0,0.6-0.1,0.9-0.2s0.5-0.3,0.6-0.5c0.1-0.2,0.2-0.6,0.2-1.2V17.6z"/><path d="M12.1,15.2v0.2c0.3-0.4,0.6-0.6,0.9-0.8s0.7-0.3,1.2-0.3c0.4,0,0.8,0.1,1.1,0.3s0.6,0.4,0.7,0.8c0.1,0.2,0.2,0.4,0.2,0.6 s0,0.5,0,0.9v3c0,0.3-0.1,0.6-0.2,0.7s-0.3,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.3s-0.2-0.4-0.2-0.7v-2.7c0-0.5-0.1-0.9-0.2-1.2 s-0.4-0.4-0.9-0.4c-0.3,0-0.5,0.1-0.8,0.3s-0.4,0.4-0.5,0.7c-0.1,0.2-0.1,0.7-0.1,1.3v2c0,0.3-0.1,0.6-0.2,0.7s-0.3,0.2-0.6,0.2 c-0.2,0-0.4-0.1-0.6-0.3s-0.2-0.4-0.2-0.7v-4.6c0-0.3,0.1-0.5,0.2-0.7s0.3-0.2,0.5-0.2c0.1,0,0.3,0,0.4,0.1s0.2,0.2,0.3,0.3 S12.1,15,12.1,15.2z"/><path d="M23.8,15.5v4.6c0,0.5-0.1,1-0.2,1.4s-0.3,0.7-0.5,0.9s-0.6,0.4-1,0.6s-0.9,0.2-1.5,0.2c-0.6,0-1-0.1-1.5-0.2 s-0.8-0.4-1-0.6s-0.4-0.5-0.4-0.8c0-0.2,0.1-0.4,0.2-0.5s0.3-0.2,0.5-0.2c0.2,0,0.4,0.1,0.6,0.3c0.1,0.1,0.2,0.2,0.3,0.3 s0.2,0.2,0.3,0.3S19.8,22,20,22s0.3,0.1,0.5,0.1c0.4,0,0.7-0.1,1-0.2s0.4-0.3,0.5-0.5s0.1-0.4,0.2-0.7s0-0.6,0-1.1 c-0.2,0.3-0.5,0.6-0.9,0.8s-0.7,0.3-1.2,0.3c-0.5,0-1-0.1-1.4-0.4s-0.7-0.7-0.9-1.1s-0.3-1.1-0.3-1.7c0-0.5,0.1-0.9,0.2-1.3 s0.3-0.7,0.6-1s0.5-0.5,0.8-0.6s0.7-0.2,1-0.2c0.5,0,0.8,0.1,1.2,0.3s0.6,0.4,0.9,0.8v-0.2c0-0.3,0.1-0.5,0.2-0.6s0.3-0.2,0.5-0.2 c0.3,0,0.5,0.1,0.6,0.3S23.8,15.1,23.8,15.5z M19.1,17.5c0,0.6,0.1,1.1,0.4,1.5s0.6,0.5,1.1,0.5c0.3,0,0.5-0.1,0.8-0.2 s0.4-0.4,0.6-0.6s0.2-0.6,0.2-1c0-0.7-0.1-1.2-0.4-1.5s-0.7-0.5-1.1-0.5c-0.5,0-0.8,0.2-1.1,0.5S19.1,16.9,19.1,17.5z"/></g></svg>'
    );


    const new_icon_name = self.editor.getParam("easylang_icon");
    if (new_icon_name) {
      const icons = self.editor.ui.registry.getAll().icons;
      if (icons.hasOwnProperty(new_icon_name)) {
        self.iconName = new_icon_name;
      }
    }

    if (self.enableKeyboardShortcuts) {
      self.addKeyboardShortcuts();
    }

    self.editor.ui.registry.addNestedMenuItem("easyLangMenu", {
      text: "Language",
      getSubmenuItems: function () {
        return self.buildEasyLangMenuItems();
      },
    });

    // Register a new menu button for selecting language in the TinyMCE editor
    self.editor.ui.registry.addMenuButton("languageSelector", {
      text: self.showCurrentLanguage ? self.translate('-Language Not Set-') : null, // Default text for the button when no language is set
      icon: self.showCurrentLanguage ? null : (self.iconName || "easyLangIcon"),
      tooltip: self.translate('Set text language'), // Tooltip for the button
      fetch: function (callback: Function) {
        self.buildEasyLangMenuItems(callback);
      },

      // Setup event listeners for the button
      onSetup: function (buttonApi: Types.ButtonApi) {
        const editorContentChangeEventHandler = function (eventArgs: any) {
          let currentNode: Element | null = null;
          if (self.editor && self.editor.selection && self.editor.selection.getNode) {
            currentNode = self.editor.selection.getNode();
            let lastCurrentLang: string = '';
            [lastCurrentLang] = self.getDocumentElementLang(currentNode); // Get current document language
            if (self.showCurrentLanguage) self.updateLanguageSelector(lastCurrentLang); // Update button text based on the current language
            buttonApi.setActive(lastCurrentLang > "");
          }
        };

        // Listen for content changes in the editor
        if (self.editor?.on) {
          self.editor.on("NodeChange", editorContentChangeEventHandler);
          self.editor.on("SetContent", editorContentChangeEventHandler);
          self.editor.on("Focus", editorContentChangeEventHandler);
        }

        // Teardown event listeners when the button is removed
        return function (buttonApi: Types.ButtonApi) {
          if (self.editor?.off) {
            self.editor.off("NodeChange", editorContentChangeEventHandler);
            self.editor.off("SetContent", editorContentChangeEventHandler);
            self.editor.off("Focus", editorContentChangeEventHandler);
          }
        };
      },
    });
  }

  public init() {
    const self: LanguageSelect = this;

    self.isTinyMCE4 = tinymce && tinymce.majorVersion && tinymce.majorVersion === '4';
    if (window && !!window.wp) self.isWordPress = true;
    self.hasDashIcons = Array.from(document.styleSheets).some(s => (s.href || "").includes("dashicons"));

    if (!(self.editor && self.editor.getParam)) throw new Error('No supported editor instance found');

    self.editorLanguage = self.getLanguageFromEditorSettings() || self.getLanguageFromTopDocument() || LanguageSelect.CONFIG.DEFAULT_LANG;
    self.showCurrentLanguage = self.editor.getParam('easylang_show_current_language') === true;
    self.enableKeyboardShortcuts = !(self.editor.getParam('easylang_enable_keyboard_shortcuts') === false);

    const content_langs: Types.ContentLanguage[] | null = self.editor.getParam("content_langs");
    if (content_langs && content_langs.length > 0) {
      const newDefaultLanguages: string[] = [];
      content_langs.forEach((language: Types.ContentLanguage) => {
        if (LanguageSelect.isValidLang(language.code)) {
          let newCode = language.code.toLowerCase();
          newDefaultLanguages.push(newCode);
          let newLanguageTitle = (language.title || "").trim();
          if (newLanguageTitle && !Object.prototype.hasOwnProperty.call(LanguageSelect.languageTags, newCode)) {
            LanguageSelect.languageTags[newCode] = newLanguageTitle || newCode;
          }
        }
      });
      if (newDefaultLanguages.length > 0) {
        self.defaultLanguages = newDefaultLanguages;
      }
    }

    if (self.isTinyMCE4) {
      self.initV4();
    } else {
      self.initPostV4();
    }
  }

}
