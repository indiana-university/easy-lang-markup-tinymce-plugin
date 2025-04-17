/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: GPL-3.0-only
 */

/* global alert, confirm, tinyMCE */

tinyMCE.PluginManager.add("languageSidebar", function (editor) {
  "use strict";

  const regexValidLangValue = /^[^-\s]{2,5}(-[^-\s]{2,6})*$/;

  const defaultLangsConfigured = ["en", "es", "fr", "it", "de"];

  const langColors = {
    en: "#eee",
    "en-us": "#ddd",
    es: "#E6B0AA",
    fr: "#AED6F1",
    it: "#ABEBC6",
    de: "#F9E79F",
  };
  const colorsAvailable = [
    "#02bfe7",
    "#59C879",
    "#f9c642",
    "#00A3CF",
    "#3B8350",
    "#fdb81e",
    "#aeb0b5",
    "#EC0000",
  ];

  const langFormatsRegistered = {};

  let sidebarIsOpen = false;
  let defaultLangHolderEl = null;
  let currentLangHolderEl = null;
  let languageButtonsContainerEl = null;
  let defaultLangOfPageHoldingEditor = "";
  let langsUsedInEditorDocument = {};
  let lastDocElement = null;

  let tsViewMarkup = false;
  let langMenuItems = [];

  /**
   * Takes the first token in the string and returns it as a well-formatted lang attribute:
   * - "en" becomes "en"
   * - "en-us" becomes "en-US"
   * - "en_us" becomes "en-US"
   * - "en enu" becomes "en"
   *
   * @param {string} lang - The input language attribute string.
   * @returns {string} - The cleaned and formatted language attribute.
   */
  function cleanLangAttr(lang) {
    if (!lang) return lang;

    // Trim whitespace and split by spaces, taking only the first token
    const [firstToken] = lang.trim().split(/\s+/);

    // Match the token against the pattern and format it accordingly
    const matches = firstToken.match(/^(\w+)[_-](\w+)$/);
    if (matches) {
      // Convert to the correct format: "en-us" or "en_us" -> "en-US"
      return `${matches[1].toLowerCase()}-${matches[2].toUpperCase()}`;
    }

    // Return the first token as lowercase (e.g., "EN" -> "en")
    return firstToken.toLowerCase();
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
   * @param {string} lang - The input language string.
   * @returns {string} - The base language code, or an empty string if input is null/undefined.
   */
  function baseLanguage(lang) {
    if (!lang) return "";

    // Trim whitespace and remove any characters following a dash, underscore, or space
    return lang.trim().replace(/[-_\s].*$/, "");
  }

  /**
   * Detects the default human text language of the document holding the editor.
   * It checks in the following order:
   * 1. If `editor.settings.language` is defined.
   * 2. If the `document.body` element has a single child with a `lang` attribute.
   * 3. If the `document.body` element has a `lang` attribute.
   * 4. If the `document.documentElement` (HTML) element has a `lang` attribute.
   * 5. If none of the above, it uses the browser's language settings or defaults to 'en'.
   *
   * @returns {string} - The detected default language code.
   */
  function detectDefaultLangOfPageHoldingEditor() {
    const topDocument = window.top.document;
    const editorDocument = editor.getDoc();

    let defaultLang = "";

    // 1. Check if editor has a configured language setting
    if (editor.settings && editor.settings.language) {
      defaultLang = cleanLangAttr(editor.settings.language);
    }

    // 2. Check if the document body has one child with a lang attribute
    if (
      !regexValidLangValue.test(defaultLang) &&
      editorDocument.body.childElementCount === 1 &&
      editorDocument.body.children[0].hasAttribute("lang")
    ) {
      defaultLang = cleanLangAttr(
        editorDocument.body.children[0].getAttribute("lang")
      );
    }

    // 3. Check if the document body has a lang attribute
    if (
      !regexValidLangValue.test(defaultLang) &&
      editorDocument.body.hasAttribute("lang")
    ) {
      defaultLang = cleanLangAttr(editorDocument.body.getAttribute("lang"));
    }

    // 4. Check if the document root (HTML element) has a lang attribute
    if (
      !regexValidLangValue.test(defaultLang) &&
      topDocument.documentElement.hasAttribute("lang")
    ) {
      defaultLang = cleanLangAttr(
        topDocument.documentElement.getAttribute("lang")
      );
    }

    // 5. Fallback: Use browser language or default to 'en'
    if (!regexValidLangValue.test(defaultLang)) {
      defaultLang =
        baseLanguage(
          window.navigator.language || window.navigator.userLanguage
        ) || "en";
    }

    // Return the detected language or 'en' as a final fallback
    return regexValidLangValue.test(defaultLang) ? defaultLang : "en";
  }

  /**
   * Retrieves the default language from the document body of the editor.
   * This function pre-configures buttons and state based on the existing document.
   *
   * @returns {string} - The cleaned default language attribute, or an empty string if not found.
   */
  function getDocumentDefaultLang() {
    const editorBody = editor.getDoc()?.body;

    if (
      editorBody &&
      editorBody.children.length === 1 &&
      editorBody.firstElementChild.hasAttribute("lang")
    ) {
      return cleanLangAttr(editorBody.firstElementChild.getAttribute("lang"));
    }

    return "";
  }

  /**
   * Analyzes the usage of language attributes in the editor's document.
   * It returns a sorted array of detected language codes based on their frequency of use.
   *
   * @returns {string[]} - An array of language codes sorted by frequency of occurrence.
   */
  function analyzeEditorDocumentLangUsage() {
    defaultLangOfPageHoldingEditor = detectDefaultLangOfPageHoldingEditor();
    const topDocument = window.top.document;
    const editorDocument = editor.getDoc();
    const regexValidLangValue = /^[^\s-]{2,5}(-[^\s-]{2,6})*$/; // Assuming this is defined elsewhere

    let docContainer = null;

    // Determine the document container to analyze
    if (editorDocument && editorDocument.body) {
      docContainer = editorDocument.body;
    } else if (editor && editor.settings && editor.settings.selector) {
      docContainer = document.querySelector(editor.settings.selector);
    } else {
      docContainer = topDocument.body;
    }

    // Track the usage of languages in the document
    const langsUsed = {};

    // Include the default language if it is valid
    if (regexValidLangValue.test(defaultLangOfPageHoldingEditor)) {
      langsUsed[defaultLangOfPageHoldingEditor] = 1;
    }

    // Find all elements with a lang attribute
    const langElements = docContainer.querySelectorAll("[lang]");

    langElements.forEach((el) => {
      const foundLang = cleanLangAttr(el.getAttribute("lang"));
      if (regexValidLangValue.test(foundLang)) {
        langsUsed[foundLang] = (langsUsed[foundLang] || 0) + 1;
      }
    });

    // Check the document's inner HTML for any lang attributes if we didn't find any
    if (Object.keys(langsUsed).length === 0) {
      const langMatches = [
        ...docContainer.innerHTML.matchAll(/\slang="(.+?)"/g),
      ];
      langMatches.forEach((match) => {
        const foundLang = cleanLangAttr(match[1]);
        if (regexValidLangValue.test(foundLang)) {
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
   * TODO: Make sure this function's language is default detection makes sense. Seems flawed!
   *
   * @param {Element} el - The starting element to check for language attributes.
   * @returns {[string, boolean]} - A tuple containing the cleaned language attribute and a boolean
   *                                indicating if the language is set directly under the BODY element.
   */
  function getDocumentElementLang(el) {
    if (!el || !el.hasAttribute) return ["", false];

    let elLang = "";
    let currentLangIsDefault = false;

    // Traverse up the DOM tree to find the first ancestor with a `lang` attribute
    while (el && !elLang && el.nodeName !== "BODY") {
      if (el.hasAttribute("lang")) {
        elLang = cleanLangAttr(el.getAttribute("lang"));
        currentLangIsDefault = el.parentElement.nodeName === "BODY";
      }
      el = el.parentElement;
    }

    return [elLang, currentLangIsDefault];
  }

  /**
   * Keep language keys in langAtts all lower case for string comparison purposes.
   * The key will get correctly cased when used as an attribute value.
   */
  const langAtts = {
    af: "Afrikaans",
    ak: "Akan",
    ar: "Arabic (العربية)",
    az: "Azerbaijani",
    bg: "Bulgarian",
    bho: "Bhojpuri",
    bm: "Bambara",
    bn: "Bengali (Bangla)",
    bo: "Tibetan",
    bs: "Bosnian (Bosanski)",
    ca: "Catalan; Valencian (Català)",
    cs: "Czech (Čeština)",
    cu: "Bulgarian, Old (Church Slavic)",
    da: "Danish (Dansk)",
    de: "German (Deutsch)",
    el: "Greek (Ελληνικά)",
    en: "English",
    "en-au": "English (Australia)",
    "en-gb": "English (UK)",
    "en-in": "English (Indian)",
    "en-ie": "English (Ireland)",
    "en-tt": "English (Trinidad)",
    "en-us": "English (US)",
    "en-za": "English (S. Africa)",
    es: "Spanish (Español)",
    "es-ar": "Spanish (Argentinia)",
    "es-cl": "Spanish (Chile)",
    "es-co": "Spanish (Columbia)",
    "es-mx": "Spanish (Mexico)",
    "es-pe": "Spanish (Peru)",
    et: "Estonian (Eesti)",
    eu: "Basque (Euskera)",
    fa: "Persian",
    fi: "Finnish (Suomi)",
    fr: "French (Français)",
    "fr-ca": "French (Canadian)",
    gl: "Galician (Spain)",
    he: "Hebrew (עברית)",
    hi: "Hindi (हिन्दी)",
    hr: "Croatian",
    hu: "Hungarian (Magyar)",
    id: "Indonesian",
    it: "Italian (Italiano)",
    ja: "Japanese (日本語)",
    kk: "Kazakh",
    kn: "Kannada",
    ko: "Korean (한국어)",
    la: "Latin",
    lkt: "Lakota",
    mn: "Mongolian",
    mr: "Marathi",
    nb: "Norwegian Bokmål (Bokmål)",
    nl: "Dutch (Nederlands)",
    "nl-be": "Dutch (Belgium)",
    nn: "Norwegian Nynorsk (Nynorsk)",
    pl: "Polish (Polski)",
    ps: "Pashto",
    pt: "Portuguese, International",
    "pt-br": "Portuguese, Brazil (Português)",
    qu: "Quechua",
    ro: "Romanian (Română)",
    ru: "Russian (Русский)",
    sa: "Sanskrit",
    "sk-sk": "Slovak (Slovakia)",
    sl: "Slovenian (Slovenščina)",
    sma: "SMA",
    sme: "SME",
    smj: "SMJ",
    sr: "Serbian (Српски)",
    sv: "Swedish (Svenska)",
    sw: "Swahili",
    ta: "Tamil",
    te: "Telugu",
    tg: "Tajik",
    th: "Thai",
    tr: "Turkish (Türkçe)",
    ug: "Uyghur",
    uk: "Ukrainian (Українська)",
    ur: "Urdu",
    uz: "Uzbek",
    vi: "Vietnamese (Tiếng Việt)",
    wo: "Wolof",
    yi: "Yiddish",
    yo: "Yoruba",
    yua: "Yucatec Maya",
    zh: "Chinese",
    "zh-cn": "Chinese (China)",
    "zh-hk": "Chinese (Hong Kong)",
    "zh-tw": "Chinese (Taiwan)",
    "zh-hans": "Chinese, Simplified (简体中文)",
    "zh-hant": "Chinese, Traditional (繁體中文)",
    zu: "Zulu",
  };

  /**
   * Opens a dialog in TinyMCE to select or manually enter the document's default language.
   *
   * @param {Object} editor - The TinyMCE editor instance.
   * @param {Object} langAtts - An object mapping language codes to their descriptions.
   * @param {string} currentLang - The currently selected language code.
   * @param {Function} callBack - A callback function to handle the selected language.
   */
  function openLanguageSelectionDialog(
    editor,
    langAtts,
    currentLang,
    callBack
  ) {
    let currentTab = "listTab1";

    // Prepare the language options for the dropdown list
    const languages = Object.entries(langAtts)
      .sort((a, b) => a[1].toLowerCase().localeCompare(b[1].toLowerCase()))
      .map(([langCode, langDesc]) => ({
        value: langCode,
        text: `${langDesc} - (${cleanLangAttr(langCode)})`,
      }));

    // Open the TinyMCE dialog
    editor.windowManager.open({
      title: "Select the document's default language",
      body: {
        type: "tabpanel",
        tabs: [
          {
            name: "listTab1",
            title: "Choose from list",
            items: [
              {
                type: "htmlpanel",
                html: `<div style="margin-bottom:10px">Current default language: ${
                  langAtts[currentLang] || currentLang
                }</div>`,
              },
              {
                type: "selectbox",
                name: "language",
                label: "New Language:",
                items: languages,
              },
            ],
          },
          {
            name: "listTab2",
            title: "Enter manually",
            items: [
              {
                type: "htmlpanel",
                html: `<div style="margin-bottom:10px">Current language: ${
                  langAtts[currentLang] || currentLang
                }</div>`,
              },
              {
                type: "input",
                name: "manualLanguage",
                label: 'Enter new lang code (e.g., "en-US"):',
              },
            ],
          },
        ],
      },
      initialData: {
        language:
          currentLang.toLowerCase() ||
          defaultLangOfPageHoldingEditor.toLowerCase(),
      },
      buttons: [
        {
          type: "cancel",
          text: "Cancel",
        },
        {
          type: "submit",
          text: "Save",
          primary: true,
        },
      ],
      onTabChange(dialogApi, details) {
        currentTab = details.newTabName;
      },
      onSubmit(api) {
        const data = api.getData();
        let newLang =
          currentTab === "listTab2" ? data.manualLanguage : data.language;

        // Validate and clean the new language code
        if (regexValidLangValue.test(newLang.trim())) {
          newLang = cleanLangAttr(newLang);
          editor.focus();
          callBack(newLang); // Call the provided callback with the new language
          api.close(); // Close the dialog
        } else {
          alert(
            "Enter a valid language code with no spaces. Or, press cancel."
          );
        }
      },
    });
  }

  /**
   * Opens a TinyMCE dialog to configure up to six language options using select boxes or manual entry.
   *
   * @param {Array} langMenuItems - An array of language codes to pre-configure the dialog.
   * @param {Function} callBack - A callback function to handle the updated language selection.
   */
  const openConfigureLanguagesOnSelectbox = (langMenuItems, callBack) => {
    const regexValidLangValue = /^[^\s-]{2,5}(-[^\s-]{2,6})*$/; // Assuming this regex is defined elsewhere

    // Prepare the language options, including special options for "None" and "Other"
    const languages = [
      { value: "-n-", text: "None" },
      { value: "-o-", text: "Other - Enter manually" },
      ...Object.entries(langAtts)
        .sort((a, b) => a[1].toLowerCase().localeCompare(b[1].toLowerCase()))
        .map(([langCode, langDesc]) => ({
          value: langCode,
          text: `${langDesc} - (${cleanLangAttr(langCode)})`,
        })),
    ];

    // Create language choice items for the dialog, up to six selectboxes/inputs
    const languageChoiceItems = [
      {
        type: "htmlpanel",
        html: '<div style="margin-bottom:10px">Choose up to six languages</div>',
      },
    ];

    const addLanguageOption = (index, lang, isDisabled) => ({
      type: "bar",
      items: [
        {
          type: "selectbox",
          name: `langSelect_${index}`,
          label: `Language ${index} Select box:`,
          items: languages,
        },
        {
          type: "input",
          name: `langInput_${index}`,
          label: `Language ${index} - Manual entry:`,
          disabled: isDisabled,
        },
      ],
    });

    langMenuItems?.forEach((lang, index) => {
      languageChoiceItems.push(
        addLanguageOption(
          index + 1,
          lang,
          Object.prototype.hasOwnProperty.call(langAtts, lang)
        )
      );
    });

    for (let i = langMenuItems.length + 1; i <= 6; i++) {
      languageChoiceItems.push(addLanguageOption(i, "", true));
    }

    // Initialize the data for the dialog's select boxes and inputs
    const initData = langMenuItems.reduce((acc, lang, index) => {
      const langIndex = index + 1;
      if (Object.prototype.hasOwnProperty.call(langAtts, lang)) {
        acc[`langSelect_${langIndex}`] = lang.toLowerCase();
      } else {
        acc[`langSelect_${langIndex}`] = "-o-";
        acc[`langInput_${langIndex}`] = cleanLangAttr(lang);
      }
      return acc;
    }, {});

    // Open the dialog
    editor.windowManager.open({
      title: "Choose languages",
      body: {
        type: "panel",
        items: languageChoiceItems,
      },
      buttons: [
        { type: "cancel", text: "Cancel" },
        { type: "submit", text: "Save", primary: true },
      ],
      onChange(dialogApi, details) {
        const data = dialogApi.getData();
        for (let i = 1; i <= 6; i++) {
          const selectKey = `langSelect_${i}`;
          const inputKey = `langInput_${i}`;
          if (data[selectKey] === "-o-") {
            dialogApi.enable(inputKey);
          } else {
            dialogApi.disable(inputKey);
          }
        }
      },
      initialData: initData,
      onSubmit(dialogApi) {
        const data = dialogApi.getData();
        const updatedLangMenuItems = [];

        // Validate manual language inputs and collect all valid language selections
        for (let i = 1; i <= 6; i++) {
          const selectValue = data[`langSelect_${i}`];
          const inputValue = data[`langInput_${i}`]?.trim();

          if (selectValue === "-o-") {
            if (!regexValidLangValue.test(inputValue)) {
              alert(
                `Enter a valid language for language ${i}. Found: '${inputValue}'`
              );
              return;
            }
            updatedLangMenuItems.push(inputValue);
          } else if (regexValidLangValue.test(selectValue)) {
            updatedLangMenuItems.push(selectValue);
          }
        }

        editor.focus();
        callBack(updatedLangMenuItems);
        dialogApi.close();
      },
    });
  };

  /**
   * Opens a TinyMCE dialog to provide help information for editing language (lang) attributes.
   */
  const openLangAttsHelp = () => {
    editor.windowManager.open({
      title: "Help for Editing Language (lang) Attributes",
      body: {
        type: "panel",
        items: [
          {
            type: "htmlpanel",
            html: `
                <div>
                  <p><strong>Language (lang) Attribute Help</strong></p>
                  <p>
                    The <code>lang</code> attribute specifies the language of the content 
                    within an element. It helps screen readers and search engines 
                    to understand and process the content correctly.
                  </p>
                  <p>
                    To edit the language attributes in this document, you can use the 
                    provided tools in the editor. You can set the language attribute 
                    for specific sections or for the entire document.
                  </p>
                  <p>Here are some examples of language codes:</p>
                  <ul>
                    <li><code>en</code> - English</li>
                    <li><code>es</code> - Spanish</li>
                    <li><code>fr</code> - French</li>
                    <li><code>de</code> - German</li>
                    <li><code>zh-CN</code> - Chinese (Simplified)</li>
                  </ul>
                  <p>For more information, please refer to the <a href="https://www.w3.org/International/questions/qa-lang-why" target="_blank">W3C documentation</a>.</p>
                </div>
              `,
          },
        ],
      },
      buttons: [
        {
          type: "submit",
          text: "Ok",
          primary: true,
        },
      ],
      onSubmit(api) {
        editor.focus();
        api.close();
      },
    });
  };

  /**
   * Highlights elements with `lang` attributes in the TinyMCE editor document.
   * Applies different background colors and border styles to indicate language markup.
   */
  function revealLangMarkUp() {
    const doc = editor.getDoc();
    const languagesFound = {};

    // Remove any existing stylesheet for viewing lang markup
    const existingStyle = doc.getElementById("langAttrQA");
    if (existingStyle) existingStyle.parentElement.removeChild(existingStyle);

    // Initialize available colors for highlighting
    const availableColors = [...colorsAvailable];
    const defaultColor = "#e1f3f8";

    // Collect unique languages found in the document and assign colors
    const langElements = doc.querySelectorAll("*[lang]");
    langElements.forEach((el) => {
      const langFound = cleanLangAttr(el.getAttribute("lang").trim());
      if (langFound && !languagesFound.hasOwnProperty(langFound)) {
        languagesFound[langFound] =
          availableColors.length > 0 ? availableColors.shift() : defaultColor;
      }
    });

    // Merge predefined language colors into the found languages
    Object.keys(langColors).forEach((langCode) => {
      languagesFound[cleanLangAttr(langCode)] = langColors[langCode];
    });

    // Create and append a new stylesheet for language markup visualization
    const styleSheet = doc.createElement("style");
    styleSheet.setAttribute("id", "langAttrQA");

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
  }

  /**
   * Refreshes the language markup styles in the TinyMCE editor document.
   * Re-applies the styles if the `langAttrQA` stylesheet is present.
   */
  function refreshQaStyles() {
    const qaStyleElement = editor.getDoc().getElementById("langAttrQA");
    if (qaStyleElement) {
      revealLangMarkUp();
    }
  }

  /**
   * Removes the language markup stylesheet from the TinyMCE editor document.
   */
  function hideLangMarkUp() {
    const doc = editor.getDoc();

    // Remove the stylesheet for viewing lang markup if it exists
    const styleElement = doc.getElementById("langAttrQA");
    if (styleElement) {
      styleElement.parentElement.removeChild(styleElement);
    }
  }

  /**
   * Sets the default language for the document in the TinyMCE editor.
   * Updates or creates a `div` with the ID `defaultContentLangHolder` and applies the specified language.
   *
   * @param {string} lang - The language code to set as the default document language.
   */
  function setDefaultDocumentLanguage(lang) {
    const editorDoc = editor.getDoc();
    let defaultLangDiv = editorDoc.getElementById("defaultContentLangHolder");

    // Create or update the language holder div
    if (defaultLangDiv) {
      defaultLangDiv.setAttribute("lang", lang);
    } else {
      defaultLangDiv = editorDoc.createElement("div");
      defaultLangDiv.id = "defaultContentLangHolder";
      defaultLangDiv.setAttribute("lang", lang);
      editorDoc.body.insertBefore(defaultLangDiv, editorDoc.body.firstChild);
    }

    // Move all sibling elements into the default language div
    moveSiblingsIntoElement(defaultLangDiv);

    // Focus the editor after making changes
    editor.focus();
  }

  /**
   * Moves all sibling elements of the target element into the target element.
   *
   * @param {Element} targetElement - The element to collect all its siblings.
   */
  function moveSiblingsIntoElement(targetElement) {
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
  function removeLangMarkupAtCursor() {
    const doc = editor.getBody().ownerDocument;
    const selection = doc.getSelection();

    // Check if a single range is selected and the cursor is collapsed (no text selection)
    if (selection && selection.rangeCount === 1) {
      const range = selection.getRangeAt(0);

      if (range.collapsed) {
        let element =
          range.startContainer.nodeType === 3
            ? range.startContainer.parentElement
            : range.startContainer;

        // Traverse up the DOM to find the first ancestor with a `lang` attribute
        while (element && !element.hasAttribute("lang")) {
          element = element.parentElement;
        }

        // If a `lang` attribute is found, remove it and clean up the element if necessary
        if (element) {
          element.removeAttribute("lang");

          // If the element is a span with only the `langMarkUp` class and no other attributes, unwrap it
          if (
            element.nodeName.toLowerCase() === "span" &&
            isRemovableSpan(element)
          ) {
            unwrapElement(element);
          }
        }
      }
    }

    // Clean up any remaining empty `span.langMarkUp` elements
    const emptyLangSpans = doc.querySelectorAll("span.langMarkUp:not([lang])");
    emptyLangSpans.forEach((langEl) => {
      if (isRemovableSpan(langEl)) {
        unwrapElement(langEl);
      }
    });
  }

  /**
   * Checks if the `span` element is removable, i.e., it has no other attributes
   * and has only the `langMarkUp` class.
   *
   * @param {Element} element - The `span` element to check.
   * @returns {boolean} - True if the element can be removed; false otherwise.
   */
  function isRemovableSpan(element) {
    return (
      element.attributes.length === 1 &&
      element.classList.contains("langMarkUp") &&
      element.classList.length === 1
    );
  }

  /**
   * Unwraps the children of the specified element, removing the element itself.
   *
   * @param {Element} element - The element to be unwrapped and removed.
   */
  function unwrapElement(element) {
    while (element.firstChild) {
      element.parentElement.insertBefore(element.firstChild, element);
    }
    element.parentElement.removeChild(element);
  }

  /**
   * Removes all language markup from the document after user confirmation.
   * Unwraps and removes any `span` elements with only the `langMarkUp` class.
   */
  function removeAllLangSpans() {
    if (!confirm("Really remove all language markup from the document?"))
      return;

    const doc = editor.getDoc();

    // Remove `lang` attributes from all elements and clean up if necessary
    const langElements = doc.querySelectorAll("*[lang]");
    langElements.forEach((langEl) => {
      langEl.removeAttribute("lang");
      if (isRemovableSpan(langEl)) {
        unwrapElement(langEl);
      }
    });

    // Clean up any remaining empty `span.langMarkUp` elements
    const emptyLangSpans = doc.querySelectorAll("span.langMarkUp:not([lang])");
    emptyLangSpans.forEach((langEl) => {
      if (isRemovableSpan(langEl)) {
        unwrapElement(langEl);
      }
    });
  }

  /**
   * Registers a new format in the TinyMCE editor for applying a language attribute.
   *
   * @param {string} lang - The language code to be applied to the selected text.
   */
  function registerFormat(lang) {
    // Clean and standardize the language attribute value
    lang = cleanLangAttr(lang);

    // Define a unique format name based on the language code
    const formatToApply = "setLangTo_" + lang;

    // Register the new format with TinyMCE
    editor.formatter.register(formatToApply, {
      inline: "span",
      attributes: {
        lang: lang,
        class: "langMarkUp",
      },
    });

    // Track the registered format to avoid duplicate registrations
    langFormatsRegistered[formatToApply] = true;
  }

  /**
   * Applies a specified language format to the document in the TinyMCE editor.
   * If the language format is not registered, it registers and applies it.
   *
   * @param {string} lang - The language code to apply to the document.
   */
  function setDocLangTo(lang) {
    const formatToApply = `setLangTo_${lang}`;

    // Ensure the format is registered before applying
    if (!langFormatsRegistered.hasOwnProperty(formatToApply)) {
      registerFormat(lang);
    }

    editor.focus();

    // Apply the format within an undo transaction
    editor.undoManager.transact(() => {
      editor.formatter.apply(formatToApply);
    });

    // Refresh the QA styles to reflect the new language format
    refreshQaStyles();
  }

  /**
   * Removes all child nodes from the given parent element.
   *
   * @param {Element} parent - The parent element whose child nodes will be removed.
   */
  function removeAllChildNodes(parent) {
    if (!(parent instanceof Element)) {
      console.error(
        "Invalid parent element provided to removeAllChildNodes:",
        parent
      );
      return;
    }

    // Clear child nodes (optional)
    parent.textContent = "";
  }

  /**
   * Creates a new DOM element with specified attributes and text content.
   *
   * @param {string} elType - The type of the element to create (e.g., 'div', 'span').
   * @param {string} [text=''] - Optional text or HTML content to be added to the element.
   * @param {Object} [attributeValues={}] - An object representing attribute-value pairs to set on the element.
   * @param {Object} [config={}] - Configuration options for element creation.
   * @param {boolean} [config.html=false] - If true, text will be set as innerHTML; otherwise, as text content.
   * @returns {Element} The newly created DOM element.
   */
  function createElement(elType, text = "", attributeValues = {}, config = {}) {
    // Validate element type
    if (typeof elType !== "string" || !elType.trim()) {
      throw new Error("Invalid element type specified.");
    }

    // Create the element
    const el = document.createElement(elType);

    // Set attributes
    Object.entries(attributeValues).forEach(([attribute, value]) => {
      el.setAttribute(attribute, value);
    });

    // Set text or HTML content
    if (text) {
      if (config.html) {
        el.innerHTML = text;
      } else {
        el.appendChild(document.createTextNode(text));
      }
    }

    return el;
  }

  /**
   * Updates the language menu items and re-renders the language buttons in the sidebar if it is open.
   *
   * This function calls `openConfigureLanguagesOnSelectbox` to allow users to modify the list of languages
   * available in the menu. Once the languages are updated, it checks if the sidebar is open. If true,
   * it re-renders the language buttons to reflect the changes.
   *
   * @param {Array} langMenuItems - The current list of language menu items.
   * @param {Boolean} sidebarIsOpen - Indicates whether the language sidebar is currently open.
   * @param {Function} renderLanguageButtonsInSidebar - A function that re-renders the language buttons in the sidebar.
   * @param {Function} openConfigureLanguagesOnSelectbox - Opens a dialog or interface for configuring language options.
   */
  function configureLanguageButtons() {
    /**
     * Updates the language menu items and renders the language buttons in the sidebar if open.
     *
     * @param {Array} newLangMenuItems - The updated list of language menu items.
     */
    function updateLangMenuItems(newLangMenuItems) {
      langMenuItems = newLangMenuItems;
      if (sidebarIsOpen) {
        renderLanguageButtonsInSidebar();
      }
    }

    openConfigureLanguagesOnSelectbox(langMenuItems, updateLangMenuItems);
  }

  /**
   * Creates a language button element for the given language.
   *
   * This function generates a styled button with the language code or name as its label.
   * When clicked, the button changes the document's language attribute to the specified language
   * and handles focus indication for accessibility purposes.
   *
   * @param {String} lang - The language code (e.g., 'en', 'fr', 'es') to create a button for.
   * @returns {HTMLElement} The button element configured for the given language.
   */
  function createLangButton(lang) {
    // Get the button text, removing unnecessary parts for base languages.
    let buttonText = langAtts[lang.toLowerCase()] || cleanLangAttr(lang);
    if (lang.indexOf("-") < 0) {
      buttonText = buttonText.replace(/\s*\(.+$/, "");
    }

    const buttonStyle =
      "padding: 2px 8px; margin-right:3px; margin-bottom:3px; border: 1px solid #ccc";

    const button = createElement("BUTTON", buttonText, {
      type: "button",
      value: lang,
      class: "tox-button tox-button--secondary",
      style: buttonStyle,
    });

    // Add click event listener to set the document language.
    const handleButtonClick = () => {
      editor.undoManager.transact(() => {
        setDocLangTo(lang);
      });
    };
    button.addEventListener("click", handleButtonClick);

    // Attach focus indication for accessibility.
    addButtonFocusIndicationHandler(button);

    // Return the created button element.
    return button;
  }

  /**
   * Renders language buttons in the sidebar based on the editor document's language usage and default configurations.
   *
   * This function first analyzes the languages used in the editor document and, if the language menu items array
   * is empty, populates it with the most used languages. It ensures that up to six unique languages are added
   * to the menu, including those from a predefined list of default languages. Finally, it creates and displays
   * language buttons for each item in the language menu array.
   */
  function renderLanguageButtonsInSidebar() {
    const sortedArrayOfLangs = analyzeEditorDocumentLangUsage();

    // Populate the language menu items if they are not already configured.
    if (langMenuItems.length < 1) {
      populateLangMenuItems(sortedArrayOfLangs);
      addDefaultLangsToMenu();
    }

    // Clear the existing buttons and render new ones.
    removeAllChildNodes(languageButtonsContainerEl);
    langMenuItems.forEach((lang) => {
      languageButtonsContainerEl.appendChild(createLangButton(lang));
    });
  }

  /**
   * Populates the language menu items array with the most frequently used languages from the document.
   * Limits the menu to a maximum of 6 languages.
   *
   * @param {Array} sortedLangs - An array of languages sorted by usage in the document.
   */
  function populateLangMenuItems(sortedLangs) {
    sortedLangs.forEach((lang) => {
      if (langMenuItems.length < 6) {
        langMenuItems.push(lang);
      }
    });
  }

  /**
   * Adds default configured languages to the menu if they are not already included.
   * Ensures the total number of languages in the menu does not exceed 6.
   */
  function addDefaultLangsToMenu() {
    defaultLangsConfigured.forEach((defaultLang) => {
      const isLangAlreadyIncluded = langMenuItems.some((existingLang) =>
        existingLang.toLowerCase().startsWith(defaultLang.toLowerCase())
      );

      if (!isLangAlreadyIncluded && langMenuItems.length < 6) {
        langMenuItems.push(defaultLang);
      }
    });
  }

  /**
   * Adds focus and blur style handling to a button element for visual feedback.
   *
   * This function changes the button's border style when it is focused or blurred, using the provided
   * styles or default values. It also resets the border style after a mouse interaction (mouseup event)
   * to ensure consistent visual feedback.
   *
   * @param {HTMLElement} button - The button element to add the focus and blur indication handlers to.
   * @param {String} [focusStyle='1px solid #1B75BC'] - The CSS style to apply when the button is focused.
   * @param {String} [blurStyle='1px solid #ccc'] - The CSS style to apply when the button loses focus or on mouseup.
   */
  function addButtonFocusIndicationHandler(
    button,
    focusStyle = "1px solid #1B75BC",
    blurStyle = "1px solid #ccc"
  ) {
    // Apply focus style when the button is focused.
    button.addEventListener("focus", () => {
      button.style.border = focusStyle;
    });

    // Define a function to reset the style to the blurStyle.
    const resetStyle = () => {
      button.style.border = blurStyle;
    };

    // Apply blur style when the button loses focus or on mouseup.
    button.addEventListener("blur", resetStyle);
    button.addEventListener("mouseup", resetStyle);
  }

  /**
   * Creates a button element with an SVG icon and label.
   *
   * This function retrieves the specified icon from the TinyMCE IconManager, validates its format,
   * and creates a button element with the icon and label. It applies styles and accessibility attributes,
   * and sets up focus handling for the button.
   *
   * @param {String} iconName - The name of the icon to be displayed in the button.
   * @param {String} label - The label for the button, used for the 'title' and 'aria-label' attributes.
   * @returns {HTMLElement|null} The button element with the specified icon, or null if the icon is not valid.
   */
  function getIconButton(iconName, label) {
    // Get the default icon set from the TinyMCE IconManager.
    const defaultIcons = tinyMCE.IconManager.get("default").icons;

    // Retrieve the specified icon HTML, and validate it.
    const iconHTML = defaultIcons[iconName];
    if (!iconHTML || !iconHTML.startsWith("<svg")) return null;

    // Create a button element with the icon HTML and specified attributes.
    const iconButton = createElement(
      "button",
      iconHTML,
      {
        type: "button",
        title: label,
        "aria-label": label,
        style:
          "align-items: center; vertical-align: middle; border: 1px solid white",
      },
      { html: true }
    );

    // Apply additional styling and attributes to the SVG element if it exists.
    const svgElement = iconButton.firstElementChild;
    if (svgElement) {
      svgElement.style.verticalAlign = "middle";
      svgElement.setAttribute("role", "presentation");
    }

    // Add focus and blur style handling for the button.
    addButtonFocusIndicationHandler(iconButton, null, "1px solid white");

    return iconButton;
  }

  /**
   * Renders the initial layout and controls for the language markup sidebar.
   *
   * This function sets up the sidebar's structure, styles, and various controls, such as buttons
   * for configuring the default document language, viewing language markup, and removing language markup.
   * It also adds event listeners to these controls for handling user interactions.
   *
   * @param {HTMLElement} sidebar - The sidebar element to render the initial content into.
   */
  function renderInitialSidebar(sidebar) {
    // Set initial styles for the sidebar.
    Object.assign(sidebar.style, {
      border: "1px solid #ccc",
      display: "block",
      flexDirection: "column",
      padding: "0px",
    });

    // Create and append the sidebar header.
    sidebar.appendChild(createSidebarHeader("Language Markup Sidebar"));

    // Create and append the default document language section.
    sidebar.appendChild(createDefaultLanguageSection());

    // Create and append the current text language section.
    sidebar.appendChild(createCurrentLanguageSection());

    // Create and append the language buttons configuration section.
    sidebar.appendChild(createLanguageButtonsSection());

    // Create and append the toggle view language markup button.
    sidebar.appendChild(createToggleViewLangMarkupButton());

    // Create and append the remove language buttons.
    sidebar.appendChild(createRemoveLangButtons());
  }

  // Helper function to create the sidebar header.
  function createSidebarHeader(title) {
    return createElement(
      "h2",
      title,
      {
        style:
          "font-weight: bold; font-size: 1.0em; line-height: 1.4; padding: 2px; border-bottom: thin solid #ccc; text-align: center; margin: 0px",
      },
      { html: true }
    );
  }

  // Helper function to create the default document language section.
  function createDefaultLanguageSection() {
    const div = createElement("div", null, {
      style:
        "margin: 3px 3px 2px 3px; border: thin solid #ccc; border-radius: 5px;",
    });

    const header = createElement("div", null, {
      style:
        "display: flex; flex-direction: row; align-items: center; border-bottom: thin solid #ccc",
    });
    header.appendChild(
      createElement("h3", "Default doc. language", {
        style:
          "font-weight: bold; font-size: 0.85em; line-height: 1.4; padding: 0px 0px 1px 4px; width: 100%",
      })
    );

    const icon = getIconButton("preferences", "Set default text language");
    if (icon) {
      icon.style.marginRight = "4px";
      header.appendChild(icon);
      icon.addEventListener("click", () => {
        let currentLang = getCurrentLangFromEditor();
        openChooseDefaultLangDialog(currentLang, (newLang) => {
          editor.undoManager.transact(() => {
            setDefaultDocumentLanguage(newLang);
          });
          refreshQaStyles();
          updateDefaultDocLangStatus();
          try {
            if (lastDocElement) updateCurrentLangStatus(lastDocElement);
          } catch (ex) {}
        });
      });
    }

    div.appendChild(header);
    defaultLangHolderEl = createElement("p", "Not set", {
      id: "lmsDefaultDocumentLanguage",
      style: "padding-left: 5px; font-size: 0.85em; font-weight: 500",
    });
    div.appendChild(defaultLangHolderEl);

    return div;
  }

  // Helper function to get current language from editor.
  function getCurrentLangFromEditor() {
    const editorBody = editor.getDoc().body;
    let currentLang = "";
    if (
      editorBody.children.length === 1 &&
      editorBody.firstElementChild.hasAttribute("lang")
    ) {
      currentLang =
        cleanLangAttr(editorBody.firstElementChild.getAttribute("lang")) ||
        currentLang;
    }
    return currentLang;
  }

  // Helper function to create the current text language section.
  function createCurrentLanguageSection() {
    const div = createElement("div", null, {
      style: "margin: 2px 3px; border: thin solid #ccc; border-radius: 5px;",
    });

    div.appendChild(
      createElement("h3", "Current text language", {
        style:
          "font-weight: bold; font-size: 0.85em; line-height: 1.4; padding: 0px 0px 1px 4px; border-bottom: thin solid #ccc",
      })
    );

    currentLangHolderEl = createElement("p", "Not set", {
      id: "lmsCurrentLanguage",
      style: "padding-left: 5px; font-size: 0.85em; font-weight: 500",
    });
    div.appendChild(currentLangHolderEl);

    return div;
  }

  // Helper function to create the language buttons configuration section.
  function createLanguageButtonsSection() {
    const div = createElement("div", null, {
      style: "margin: 2px 3px; border: thin solid #ccc; border-radius: 5px;",
    });

    const header = createElement("div", null, {
      style:
        "display: flex; flex-direction: row; align-items: center; border-bottom: thin solid #ccc",
    });
    header.appendChild(
      createElement("h3", "Language Buttons", {
        style:
          "font-weight: bold; font-size: 0.85em; line-height: 1.4; padding: 0px 0px 1px 4px; width: 100%",
      })
    );

    const icon = getIconButton("preferences", "Configure language buttons");
    if (icon) {
      icon.style.marginRight = "4px";
      header.appendChild(icon);
      icon.addEventListener("click", () => {
        configureLanguageButtons();
      });
    }

    div.appendChild(header);

    languageButtonsContainerEl = createElement("div", "", {
      id: "lmsLanguageButtonsContainer",
      style: "padding: 5px 3px 3px 3px",
    });
    div.appendChild(languageButtonsContainerEl);

    return div;
  }

  // Helper function to create the toggle view language markup button.
  function createToggleViewLangMarkupButton() {
    let toggleViewLangMarkupButton;
    const iconHTML = tinyMCE.IconManager.get("default").icons.preview;

    if (iconHTML && iconHTML.startsWith("<svg")) {
      const buttonHTML = iconHTML + "<span> Langs Inspector</span>";
      toggleViewLangMarkupButton = createElement(
        "button",
        buttonHTML,
        {
          type: "button",
          class: "tox-button tox-button--secondary",
          style:
            "padding: 3px 12px; margin: 3px 3px 2px 3px; align-items: center; vertical-align: middle",
        },
        { html: true }
      );
      toggleViewLangMarkupButton.firstElementChild.setAttribute(
        "role",
        "presentation"
      );
      toggleViewLangMarkupButton.firstElementChild.style.verticalAlign =
        "middle";
    } else {
      toggleViewLangMarkupButton = createElement("button", "Langs Inspector", {
        type: "button",
        class: "tox-button tox-button--secondary",
        style: "padding: 3px 12px; margin: 3px 3px 2px 3px",
      });
    }

    toggleViewLangMarkupButton.addEventListener("click", () => {
      tsViewMarkup = !tsViewMarkup;
      toggleLangMarkupView(toggleViewLangMarkupButton);
    });

    addButtonFocusIndicationHandler(toggleViewLangMarkupButton);
    return toggleViewLangMarkupButton;
  }

  // Helper function to toggle the language markup view.
  function toggleLangMarkupView(button) {
    if (tsViewMarkup) {
      revealLangMarkUp();
      button.setAttribute("class", "tox-button tox-button--enabled");
      button.setAttribute("aria-pressed", "true");
      button.style.backgroundColor = "#C8CBCF";
      button.style.color = "#000";
    } else {
      hideLangMarkUp();
      button.setAttribute("class", "tox-button tox-button--secondary");
      button.setAttribute("aria-pressed", "false");
      button.style.backgroundColor = "#f0f0f0";
      button.style.color = "#000";
    }
  }

  // Helper function to create remove language buttons.
  function createRemoveLangButtons() {
    const fragment = document.createDocumentFragment();

    // Create and append the remove current language button.
    fragment.appendChild(
      createRemoveLangButton(
        "remove",
        "Remove current lang",
        removeLangMarkupAtCursor
      )
    );

    // Create and append the remove all language markup button.
    fragment.appendChild(
      createRemoveLangButton(
        "warning",
        "Remove all lang markup",
        removeAllLangSpans
      )
    );

    return fragment;
  }

  // Helper function to create a remove language button.
  function createRemoveLangButton(iconName, label, callback) {
    const iconHTML = tinyMCE.IconManager.get("default").icons[iconName];
    let button;

    if (iconHTML && iconHTML.startsWith("<svg")) {
      const buttonHTML = iconHTML + `<span> ${label}</span>`;
      button = createElement(
        "button",
        buttonHTML,
        {
          type: "button",
          class: "tox-button tox-button--secondary",
          style:
            "padding: 3px 12px; margin: 3px 3px 2px 3px; align-items: center; vertical-align: middle",
        },
        { html: true }
      );
      button.firstElementChild.setAttribute("role", "presentation");
      button.firstElementChild.style.verticalAlign = "middle";
    } else {
      button = createElement("button", label, {
        type: "button",
        class: "tox-button tox-button--secondary",
        style: "padding: 3px 12px; margin: 3px 3px 2px 3px",
      });
    }

    button.addEventListener("click", () => {
      editor.undoManager.transact(callback);
    });
    addButtonFocusIndicationHandler(button);
    return button;
  }

  /**
   * Updates the display and status of the default document language in the sidebar.
   *
   * This function retrieves the current default language of the document and updates the `defaultLangHolderEl`
   * element with the language code and description, if available. It also sets the background color of the
   * element to green if a language is set, and red if not.
   */
  function updateDefaultDocLangStatus() {
    const currentDefaultDocLang = getDocumentDefaultLang();

    if (!defaultLangHolderEl) return;

    try {
      // Determine the language description, if available.
      const langDescription = currentDefaultDocLang
        ? langAtts[currentDefaultDocLang.toLowerCase()] || ""
        : "";

      // Update the text content with the language code and description, if any.
      if (currentDefaultDocLang) {
        defaultLangHolderEl.innerText = `${currentDefaultDocLang} ${
          langDescription ? " - " + langDescription : ""
        }`;
        defaultLangHolderEl.style.backgroundColor = "#C1FFC1"; // Green for language set
      } else {
        defaultLangHolderEl.innerText = "- Not Set -";
        defaultLangHolderEl.style.backgroundColor = "#FF9191"; // Red for not set
      }
    } catch (ex) {
      console.error("Error updating default document language status:", ex);
    }
  }

  /**
   * Updates the display and status of the current language for a given document element.
   *
   * This function retrieves the language of the specified element and updates the `currentLangHolderEl`
   * element in the sidebar with this information. It also indicates if the current language is inherited
   * from the default language. If the element is not the document body or a direct child of the body, it
   * sets `lastDocElement` to the current element.
   *
   * @param {HTMLElement} el - The document element to get the language information from.
   */
  function updateCurrentLangStatus(el) {
    const [currentLang, currentLangIsDefault] = getDocumentElementLang(el);
    if (currentLangHolderEl && defaultLangHolderEl) {
      try {
        currentLangHolderEl.innerText = currentLang
          ? currentLang +
            (langAtts[currentLang.toLowerCase()]
              ? " - " + langAtts[currentLang.toLowerCase()]
              : "")
          : "- Not Set -";
        currentLangHolderEl.style.backgroundColor = currentLang
          ? "#C1FFC1"
          : "#FF9191";
        if (currentLangIsDefault) {
          const isDefaultSpan = createElement("span", " (from default)", {
            style: "font-style: italic;",
          });
          currentLangHolderEl.appendChild(isDefaultSpan);
        }
        if (
          el.tagName !== "BODY" &&
          !(el.parentElement.tagName === "BODY" && el.tagName === "DIV")
        )
          lastDocElement = el;
      } catch (ex) {}
    }
  }

  /**
   * Event handler to update the language status indicators in the sidebar.
   *
   * This function updates the status of the default document language and the language of the
   * element that triggered the event. It is typically called in response to an editor event
   * that affects language settings.
   *
   * @param {Object} eventApi - The event object containing details of the editor event.
   * @param {HTMLElement} eventApi.element - The HTML element associated with the event.
   */
  const editorEventHandlerUpdateLangStatusIndicators = function (eventApi) {
    updateDefaultDocLangStatus();
    updateCurrentLangStatus(eventApi.element);
  };

  //  editor.ui.registry.addIcon('langSidebar', '<svg width="24" height="24"><style type="text/css">.st0{font-family:"Arial Rounded MT Bold; font-weight: 700";} .st1{font-size:12px;}</style><g><text transform="matrix(0.9683 0 0 1 2.9541 10.4634)" class="st0 st1">&lt;&gt;</text><text transform="matrix(0.9683 0 0 1 -0.7642 20.3447)" class="st0 st1">lang</text></g></svg>')
  editor.ui.registry.addIcon(
    "langSidebar",
    '<svg width="24" height="24"><g><path d="M10.9,8.1v1.7L5.1,7.2V5.8l5.9-2.6v1.7L6.8,6.5L10.9,8.1z"/><path d="M18.9,7.2l-5.9,2.6V8.2l4.1-1.6l-4.1-1.6V3.3l5.9,2.5V7.2z"/></g><g><path d="M0.2,19.8v-6.9c0-0.3,0.1-0.6,0.2-0.7s0.3-0.2,0.6-0.2s0.4,0.1,0.6,0.2s0.2,0.4,0.2,0.7v6.9c0,0.3-0.1,0.6-0.2,0.7 S1.3,20.8,1,20.8c-0.2,0-0.4-0.1-0.6-0.3S0.2,20.2,0.2,19.8z"/><path d="M7.5,19.9c-0.4,0.3-0.8,0.5-1.1,0.7s-0.8,0.2-1.2,0.2c-0.4,0-0.8-0.1-1.1-0.2s-0.5-0.4-0.7-0.7S3.1,19.3,3.1,19 c0-0.4,0.1-0.8,0.4-1.1s0.7-0.5,1.1-0.6c0.1,0,0.4-0.1,0.8-0.2s0.7-0.2,1-0.2s0.6-0.2,0.9-0.2c0-0.4-0.1-0.7-0.3-0.9 s-0.5-0.3-0.9-0.3c-0.4,0-0.7,0.1-0.9,0.2s-0.4,0.3-0.5,0.5s-0.2,0.4-0.3,0.4s-0.2,0.1-0.4,0.1c-0.2,0-0.3-0.1-0.5-0.2 S3.4,16.2,3.4,16c0-0.3,0.1-0.6,0.3-0.8s0.5-0.5,0.9-0.7s0.9-0.3,1.6-0.3c0.7,0,1.3,0.1,1.7,0.2s0.7,0.4,0.9,0.8S9,16.2,9,16.8 c0,0.4,0,0.7,0,1s0,0.6,0,0.9c0,0.3,0,0.6,0.1,0.9s0.1,0.5,0.1,0.6c0,0.2-0.1,0.3-0.2,0.4s-0.3,0.2-0.5,0.2c-0.2,0-0.3-0.1-0.5-0.2 S7.7,20.2,7.5,19.9z M7.4,17.6c-0.2,0.1-0.6,0.2-1,0.3S5.7,18,5.5,18.1S5.1,18.2,5,18.3s-0.2,0.3-0.2,0.5c0,0.2,0.1,0.4,0.3,0.6 s0.4,0.3,0.7,0.3c0.3,0,0.6-0.1,0.9-0.2s0.5-0.3,0.6-0.5c0.1-0.2,0.2-0.6,0.2-1.2V17.6z"/><path d="M12.1,15.2v0.2c0.3-0.4,0.6-0.6,0.9-0.8s0.7-0.3,1.2-0.3c0.4,0,0.8,0.1,1.1,0.3s0.6,0.4,0.7,0.8c0.1,0.2,0.2,0.4,0.2,0.6 s0,0.5,0,0.9v3c0,0.3-0.1,0.6-0.2,0.7s-0.3,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.3s-0.2-0.4-0.2-0.7v-2.7c0-0.5-0.1-0.9-0.2-1.2 s-0.4-0.4-0.9-0.4c-0.3,0-0.5,0.1-0.8,0.3s-0.4,0.4-0.5,0.7c-0.1,0.2-0.1,0.7-0.1,1.3v2c0,0.3-0.1,0.6-0.2,0.7s-0.3,0.2-0.6,0.2 c-0.2,0-0.4-0.1-0.6-0.3s-0.2-0.4-0.2-0.7v-4.6c0-0.3,0.1-0.5,0.2-0.7s0.3-0.2,0.5-0.2c0.1,0,0.3,0,0.4,0.1s0.2,0.2,0.3,0.3 S12.1,15,12.1,15.2z"/><path d="M23.8,15.5v4.6c0,0.5-0.1,1-0.2,1.4s-0.3,0.7-0.5,0.9s-0.6,0.4-1,0.6s-0.9,0.2-1.5,0.2c-0.6,0-1-0.1-1.5-0.2 s-0.8-0.4-1-0.6s-0.4-0.5-0.4-0.8c0-0.2,0.1-0.4,0.2-0.5s0.3-0.2,0.5-0.2c0.2,0,0.4,0.1,0.6,0.3c0.1,0.1,0.2,0.2,0.3,0.3 s0.2,0.2,0.3,0.3S19.8,22,20,22s0.3,0.1,0.5,0.1c0.4,0,0.7-0.1,1-0.2s0.4-0.3,0.5-0.5s0.1-0.4,0.2-0.7s0-0.6,0-1.1 c-0.2,0.3-0.5,0.6-0.9,0.8s-0.7,0.3-1.2,0.3c-0.5,0-1-0.1-1.4-0.4s-0.7-0.7-0.9-1.1s-0.3-1.1-0.3-1.7c0-0.5,0.1-0.9,0.2-1.3 s0.3-0.7,0.6-1s0.5-0.5,0.8-0.6s0.7-0.2,1-0.2c0.5,0,0.8,0.1,1.2,0.3s0.6,0.4,0.9,0.8v-0.2c0-0.3,0.1-0.5,0.2-0.6s0.3-0.2,0.5-0.2 c0.3,0,0.5,0.1,0.6,0.3S23.8,15.1,23.8,15.5z M19.1,17.5c0,0.6,0.1,1.1,0.4,1.5s0.6,0.5,1.1,0.5c0.3,0,0.5-0.1,0.8-0.2 s0.4-0.4,0.6-0.6s0.2-0.6,0.2-1c0-0.7-0.1-1.2-0.4-1.5s-0.7-0.5-1.1-0.5c-0.5,0-0.8,0.2-1.1,0.5S19.1,16.9,19.1,17.5z"/></g></svg>'
  );

  /**
   * Registers a custom sidebar in the TinyMCE editor for managing language markup.
   *
   * This function registers a sidebar named 'mysidebar' in the TinyMCE editor UI. It includes a tooltip,
   * an icon, and event handlers for updating language status indicators when the sidebar is set up. The
   * sidebar also handles showing and hiding behavior, adjusting its size and rendering language buttons
   * accordingly.
   */
  editor.ui.registry.addSidebar("mysidebar", {
    tooltip: "Language Markup",
    icon: "langSidebar",
    onSetup: function (api) {
      renderInitialSidebar(api.element());
      editor.on("NodeChange", editorEventHandlerUpdateLangStatusIndicators);
      editor.on("SetContent", editorEventHandlerUpdateLangStatusIndicators);
      editor.on("Focus", editorEventHandlerUpdateLangStatusIndicators);

      /* onSetup should always return the unbind handlers */
      return function (api) {
        sidebarIsOpen = false;
        editor.off("NodeChange", editorEventHandlerUpdateLangStatusIndicators);
        editor.off("SetContent", editorEventHandlerUpdateLangStatusIndicators);
        editor.off("Focus", editorEventHandlerUpdateLangStatusIndicators);
      };
    },
    onShow: function (api) {
      sidebarIsOpen = true;
      api.element().style.maxWidth =
        api.element().firstChild.offsetWidth.toString() * 1.05 + "px";
      renderLanguageButtonsInSidebar();
    },
    onHide: function (api) {
      sidebarIsOpen = false;
    },
  });

  return {
    getMetadata() {
      return {
        name: "LanguageSidebar plugin",  // Name of the plugin
        version: "1.0.0",  // Version number for better tracking of updates
        author: "Indiana University",  // Add author or maintainer for clarity
        description: "A plugin to ease setting language (lang) attributes in TinyMCE editor document content.",
      };
    },
  };
});
