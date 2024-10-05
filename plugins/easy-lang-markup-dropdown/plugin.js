/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

/* global alert, confirm, tinyMCE */
tinyMCE.PluginManager.add("languageSelect", function (editor) {
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
  let defaultLangOfPageHoldingEditor = "";
  let langsUsedInEditorDocument = {};
  let tsViewMarkup = false;
  let lastCurrentLang = null;
  let langMenuItems = [];
  let myButtonTextPtr = null;

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
    "en-gb": "English (United Kingdom)",
    "en-in": "English (Indian)",
    "en-ie": "English (Ireland)",
    "en-tt": "English (Trinidad)",
    "en-us": "English (United States)",
    "en-za": "English (South Africa)",
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
   * Opens a dialog for selecting or entering a default language for the document.
   *
   * @param {string} currentLang - The current language code of the document (e.g., "en-US").
   * @param {Function} callBack - A callback function that is invoked with the new language code selected by the user.
   */
  const openChooseDefaultLangDialog = (currentLang = "", callBack) => {
    // Keep track of the currently active tab
    let currentTab = "listTab1";

    // Initialize an array to hold language options
    const languages = [];

    // Populate the languages array with sorted entries from langAtts (assumed to be a predefined object).
    Object.entries(langAtts)
      .sort(([codeA, descA], [codeB, descB]) => {
        // Compare language descriptions alphabetically, case-insensitive
        return descA.toLowerCase().localeCompare(descB.toLowerCase());
      })
      .forEach(([langCode, langDesc]) => {
        // Only add valid language attributes (though Object.entries ensures all are valid).
        if (Object.prototype.hasOwnProperty.call(langAtts, langCode)) {
          languages.push({
            value: langCode,
            text: `${langDesc} - (${cleanLangAttr(langCode)})`, // Show language description and cleaned code
          });
        }
      });

    // Open the dialog using TinyMCE's windowManager API
    editor.windowManager.open({
      title: "Select the document's default language.", // Dialog title
      body: {
        type: "tabpanel",
        tabs: [
          {
            name: "listTab1", // First tab for selecting a language from a list
            title: "Choose from list",
            items: [
              {
                type: "htmlpanel",
                html: `<div style="margin-bottom:10px">Current language: ${
                  langAtts[currentLang] || currentLang // Display current language or code if not in langAtts
                }</div>`,
              },
              {
                type: "selectbox",
                name: "language",
                label: "New Language:",
                items: languages, // Use the sorted languages array for options
              },
            ],
          },
          {
            name: "listTab2", // Second tab for manually entering a language code
            title: "Enter manually",
            items: [
              {
                type: "htmlpanel",
                html: `<div style="margin-bottom:10px">Current language: ${
                  langAtts[currentLang] || currentLang // Display current language or code
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
      initialData: { language: currentLang }, // Prepopulate with current language
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
      onTabChange(dialogApi, details) {
        currentTab = details.newTabName;
      },

      /**
       * Callback for when the user submits the dialog.
       * Validates and processes the selected or entered language code.
       *
       * @param {Object} api - The dialog's API for retrieving form data.
       */
      onSubmit(api) {
        const data = api.getData();
        let newLang =
          currentTab === "listTab2" ? data.manualLanguage : data.language;

        // Validate the new language code using a regex pattern
        if (regexValidLangValue.test(newLang.trim())) {
          newLang = cleanLangAttr(newLang); // Clean the language code for consistency
          editor.focus(); // Bring focus back to the editor
          callBack(newLang); // Invoke the callback with the new language
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
   * Opens a dialog to configure up to six languages, allowing the user to either select from a list or enter manually.
   *
   * @param {Array} langMenuItems - An array of pre-selected language codes (up to 6). If empty, no languages are pre-selected.
   * @param {Function} callBack - A callback function that is invoked with the updated list of languages after submission.
   */
  const openConfigureLanguagesOnSelectbox = (langMenuItems = [], callBack) => {
    // Create an array for select box items, with "None" and "Other" options.
    const languages = [
      { value: "-n-", text: "None" }, // Option to select "None"
      { value: "-o-", text: "Other - Enter manually" }, // Option to enter manually
    ];

    // Populate the language options by sorting langAtts alphabetically by description.
    Object.entries(langAtts)
      .sort(([codeA, descA], [codeB, descB]) =>
        descA.toLowerCase().localeCompare(descB.toLowerCase())
      )
      .forEach(([langCode, langDesc]) => {
        if (Object.prototype.hasOwnProperty.call(langAtts, langCode)) {
          languages.push({
            value: langCode,
            text: `${langDesc} - (${cleanLangAttr(langCode)})`, // Show description and cleaned language code
          });
        }
      });

    // Create the list of items for the dialog's language selection section.
    const languageChoiceItems = [
      {
        type: "htmlpanel",
        html: '<div style="margin-bottom:10px">Choose up to six languages</div>',
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
            label: `Language ${langCounter} Select box:`,
            items: languages, // Use the languages array for selection options
          },
          {
            type: "input",
            name: `langInput_${langCounter}`,
            label: `Language ${langCounter} - Manual entry:`,
            disabled: Object.prototype.hasOwnProperty.call(langAtts, lang), // Disable input if language is predefined
          },
        ],
      });
    });

    // Add additional empty language selectors up to the maximum (6 total).
    for (langCounter++; langCounter <= 6; langCounter++) {
      languageChoiceItems.push({
        type: "bar",
        items: [
          {
            type: "selectbox",
            name: `langSelect_${langCounter}`,
            label: `Language ${langCounter} Select box:`,
            items: languages,
          },
          {
            type: "input",
            name: `langInput_${langCounter}`,
            label: `Language ${langCounter} - Manual entry:`,
            disabled: true, // Initially disabled as no manual input is expected.
          },
        ],
      });
    }

    // Prepare initial data to pre-fill the selection boxes based on provided langMenuItems.
    const initData = {};
    langMenuItems.forEach((lang, index) => {
      const counter = index + 1;
      if (Object.prototype.hasOwnProperty.call(langAtts, lang)) {
        initData[`langSelect_${counter}`] = lang.toLowerCase();
      } else {
        initData[`langSelect_${counter}`] = "-o-"; // Mark as manual entry
        initData[`langInput_${counter}`] = cleanLangAttr(lang); // Pre-fill with cleaned manual language
      }
    });

    // Open the dialog for language configuration
    editor.windowManager.open({
      title: "Choose languages", // Dialog title
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
      onChange(dialogApi, details) {
        const data = dialogApi.getData(); // Get the current dialog data
        // Enable or disable manual input fields based on "Other" selection
        for (let i = 1; i <= 6; i++) {
          if (data[`langSelect_${i}`] === "-o-") {
            dialogApi.enable(`langInput_${i}`);
          } else {
            dialogApi.disable(`langInput_${i}`);
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
      onSubmit(dialogApi) {
        const data = dialogApi.getData();
        const selectedLangs = [];

        // Validate language selections and manual entries
        for (let i = 1; i <= 6; i++) {
          const selectedLang = data[`langSelect_${i}`];
          const manualLang = data[`langInput_${i}`]?.trim();

          if (selectedLang === "-o-" && !regexValidLangValue.test(manualLang)) {
            alert(
              "Enter a valid language code with no spaces. Or, press cancel."
            );
            return;
          }

          // Collect valid languages
          if (regexValidLangValue.test(selectedLang)) {
            selectedLangs.push(selectedLang);
          } else if (
            selectedLang === "-o-" &&
            regexValidLangValue.test(manualLang)
          ) {
            selectedLangs.push(manualLang);
          }
        }

        // Focus back on the editor and invoke the callback with the selected languages
        editor.focus();
        callBack(selectedLangs);
        dialogApi.close(); // Close the dialog after submission
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
   * Updates the text of the language selector button in the TinyMCE editor.
   * If the button has not been found, it searches the DOM for a button with the correct aria-label or title.
   * Once found, it updates the button's text based on the provided language.
   *
   * @param {string} newLang - The new language code to display on the button.
   */
  function updateLanguageSelector(newLang) {
    try {
      // If the button pointer is not yet set, search for the language button in the DOM
      if (!myButtonTextPtr) {
        const container = editor.getContainer();
        const buttons = container.querySelectorAll(
          "button[aria-haspopup=true]"
        );

        // Loop through buttons to find the one with the correct aria-label or title
        buttons.forEach((button) => {
          const isTextLanguageButton =
            button.getAttribute("aria-label") === "Set text language" ||
            button.getAttribute("title") === "Set text language";

          if (isTextLanguageButton) {
            // Store the reference to the text node inside the button
            myButtonTextPtr = button.firstElementChild;
            myButtonTextPtr.style = "width:10em;overflow:hidden;display:block";
          }
        });
      }

      // If the button was found, update its text with the new language or fallback to the default
      if (myButtonTextPtr) {
        myButtonTextPtr.innerText =
          langAtts[newLang.toLowerCase()] || newLang || "-Language Not Set-";
      }
    } catch (ex) {
      // ignore errors
    }
  }

  // Register a new menu button for selecting language in the TinyMCE editor
  editor.ui.registry.addMenuButton("languageSelector", {
    text: "-Language Not Set-", // Default text for the button when no language is set
    tooltip: "Set text language", // Tooltip for the button
    fetch: function (callback) {
      const items = []; // Array to hold menu items
      const sortedArrayOfLangs = analyzeEditorDocumentLangUsage(); // Analyze current language usage in the document

      // Initialize language menu items if they are not already populated
      if (langMenuItems.length < 1) {
        // Add the default language of the page holding the editor if valid
        if (regexValidLangValue.test(defaultLangOfPageHoldingEditor)) {
          langMenuItems.push(defaultLangOfPageHoldingEditor.toLowerCase());
        }

        // Populate the menu with up to 6 most-used languages in the document
        sortedArrayOfLangs.forEach((lang) => {
          if (langMenuItems.length < 6) {
            langMenuItems.push(lang);
          }
        });

        // Add configured default languages if not already in the list
        defaultLangsConfigured.forEach((lang) => {
          let found = false;
          if (langMenuItems.length < 5) {
            langMenuItems.forEach((l) => {
              if (l.toLowerCase().startsWith(lang.toLowerCase())) found = true;
            });
            if (!found) {
              langMenuItems.push(lang);
            }
          }
        });
      }

      // Create menu items for each language in langMenuItems
      langMenuItems.forEach((lang) => {
        items.push({
          type: "menuitem",
          text: langAtts[lang.toLowerCase()] || cleanLangAttr(lang), // Display language name
          onAction: function () {
            setDocLangTo(lang); // Set document language to selected value
          },
        });
      });

      // Add nested menu item for removing language markup
      items.push({
        type: "nestedmenuitem",
        text: "Remove Language Markup",
        icon: "remove",
        disabled: false,
        getSubmenuItems: function () {
          return [
            {
              type: "menuitem",
              text: "Remove current lang value",
              icon: "remove",
              onAction: function () {
                removeLangMarkupAtCursor(); // Remove language markup at cursor
              },
            },
            {
              type: "menuitem",
              text: "Remove All lang markup",
              icon: "warning",
              onAction: function () {
                removeAllLangSpans(); // Remove all language markup in the document
              },
            },
          ];
        },
      });

      // Add item to configure languages
      items.push({
        type: "menuitem",
        icon: "preferences",
        text: "Configure languages",
        onAction: function () {
          let currentLang = "";
          const editorBody = editor.getDoc().body;

          // Check if the body has a lang attribute and set currentLang accordingly
          if (
            editorBody.children.length === 1 &&
            editorBody.firstElementChild.hasAttribute("lang")
          ) {
            currentLang =
              cleanLangAttr(
                editorBody.firstElementChild.getAttribute("lang")
              ) || currentLang;
          }

          // Open the configuration dialog for languages
          openConfigureLanguagesOnSelectbox(
            langMenuItems,
            (newLangMenuItems) => {
              langMenuItems = newLangMenuItems;
            }
          );
        },
      });

      // Add item to set default document language
      items.push({
        type: "menuitem",
        icon: "document-properties",
        text: "Set default document language",
        onAction: function () {
          let currentLang = "";
          const editorBody = editor.getDoc().body;

          // Get current document language if set
          if (
            editorBody.children.length === 1 &&
            editorBody.firstElementChild.hasAttribute("lang")
          ) {
            currentLang =
              cleanLangAttr(
                editorBody.firstElementChild.getAttribute("lang")
              ) || currentLang;
          }

          // Open the default language dialog
          openChooseDefaultLangDialog(currentLang, (newLang) => {
            setDefaultDocumentLanguage(newLang);
            refreshQaStyles(); // Refresh styles after language change
          });
        },
      });

      // Toggle item for revealing/hiding language markup
      items.push({
        type: "togglemenuitem",
        text: "Reveal lang markup",
        icon: "preview",
        onAction: function () {
          tsViewMarkup = !tsViewMarkup;
          if (tsViewMarkup) {
            revealLangMarkUp(); // Reveal language markup
          } else {
            hideLangMarkUp(); // Hide language markup
          }
        },
        onSetup: function (api) {
          api.setActive(tsViewMarkup); // Set active state based on current view
          return function () {}; // Return a teardown function (optional)
        },
      });

      // Add help menu item for language attribute editing
      items.push({
        type: "menuitem",
        icon: "help",
        text: "Help with language (lang) attribute editing",
        onAction: function () {
          openLangAttsHelp(); // Open help dialog for language attribute editing
        },
      });

      callback(items); // Execute callback with the built menu items
    },

    // Setup event listeners for the button
    onSetup: function (buttonApi) {
      const editorEventCallback = function (eventApi) {
        let [lastCurrentLang] = getDocumentElementLang(eventApi.element); // Get current document language
        updateLanguageSelector(lastCurrentLang); // Update button text based on the current language
      };

      // Listen for content changes in the editor
      editor.on("NodeChange", editorEventCallback);
      editor.on("SetContent", editorEventCallback);
      editor.on("Focus", editorEventCallback);

      // Teardown event listeners when the button is removed
      return function (buttonApi) {
        editor.off("NodeChange", editorEventCallback);
        editor.off("SetContent", editorEventCallback);
        editor.off("Focus", editorEventCallback);
      };
    },
  });

  return {
    getMetadata() {
      return {
        name: "LanguageSelector plugin", // Name of the plugin
        version: "1.0.0", // Version number for better tracking of updates
        author: "Indiana University", // Add author or maintainer for clarity
        description:
          "A plugin to ease setting language (lang) attributes in TinyMCE editor document content.", // Brief description of the plugin
      };
    },
  };
});
