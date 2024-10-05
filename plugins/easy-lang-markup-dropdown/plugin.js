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

  function cleanLangAttr(lang) {
    if (lang != null) {
      lang = lang.trim();
      const tokenList = lang.split(/\s/);
      if (tokenList.length > 1) {
        lang = tokenList[0];
      }
      const matches = lang.match(/^(\w+)[_-](\w+)$/);
      if (matches) {
        lang = matches[1].toLowerCase() + "-" + matches[2].toUpperCase();
      }
    }
    return lang;
  }

  function baseLanguage(lang) {
    return lang ? lang.trim().replace(/[-_\s].*$/, "") : "";
  }

  function detectDefaultLangOfPageHoldingEditor() {
    defaultLangOfPageHoldingEditor = "";
    const topDoc = window.top.document;
    const docDoc = editor.getDoc();
    if (editor.settings && editor.settings.language) {
      defaultLangOfPageHoldingEditor = cleanLangAttr(editor.settings.language);
    }
    if (
      !regexValidLangValue.test(defaultLangOfPageHoldingEditor) &&
      docDoc.body.childElementCount === 1 &&
      docDoc.body.children[0].hasAttribute("lang")
    ) {
      defaultLangOfPageHoldingEditor = cleanLangAttr(
        docDoc.body.children[0].getAttribute("lang")
      );
    }
    if (
      !regexValidLangValue.test(defaultLangOfPageHoldingEditor) &&
      topDoc.body.hasAttribute("lang")
    ) {
      defaultLangOfPageHoldingEditor = cleanLangAttr(
        topDoc.body.getAttribute("lang")
      );
    }
    if (
      !regexValidLangValue.test(defaultLangOfPageHoldingEditor) &&
      topDoc.body.parentElement.hasAttribute("lang")
    ) {
      defaultLangOfPageHoldingEditor = cleanLangAttr(
        topDoc.body.parentElement.getAttribute("lang")
      );
    }
    if (!regexValidLangValue.test(defaultLangOfPageHoldingEditor))
      defaultLangOfPageHoldingEditor =
        baseLanguage(window.navigator.userLanguage) ||
        baseLanguage(window.navigator.language) ||
        "en";
    if (!regexValidLangValue.test(defaultLangOfPageHoldingEditor))
      defaultLangOfPageHoldingEditor = "en";
  }

  function analyzeEditorDocumentLangUsage() {
    detectDefaultLangOfPageHoldingEditor();
    const topDoc = window.top.document;
    const docDoc = editor.getDoc();
    let docContainer;
    if (docDoc && docDoc.body) {
      docContainer = docDoc.body;
    } else if (editor && editor.settings && editor.settings.selector) {
      docContainer = document.querySelector(editor.settings.selector);
    } else {
      docContainer = topDoc.body;
    }
    langsUsedInEditorDocument = {};
    const langsFound = docContainer.querySelectorAll("*[lang]");
    langsFound.forEach((el) => {
      if (el && el.getAttribute) {
        const foundLang = cleanLangAttr(el.getAttribute("lang"));
        if (regexValidLangValue.test(foundLang)) {
          if (
            Object.prototype.hasOwnProperty.call(
              langsUsedInEditorDocument,
              foundLang
            )
          ) {
            langsUsedInEditorDocument[foundLang] += 1;
          } else {
            langsUsedInEditorDocument[foundLang] = 1;
          }
        }
      }
    });
    if (Object.entries(langsUsedInEditorDocument).length < 1) {
      const langMatches = [
        ...docContainer.innerHTML.matchAll(/\slang="(.+?)"/g),
      ];
      langMatches.forEach((m) => {
        const foundLang = cleanLangAttr(m[1]);
        if (regexValidLangValue.test(foundLang)) {
          if (
            Object.prototype.hasOwnProperty.call(
              langsUsedInEditorDocument,
              foundLang
            )
          ) {
            langsUsedInEditorDocument[foundLang] += 1;
          } else {
            langsUsedInEditorDocument[foundLang] = 1;
          }
        }
      });
    }
    const sortedArrayOfLangs = [];
    Object.entries(langsUsedInEditorDocument)
      .sort((a, b) => {
        return b[1] - a[1];
      })
      .forEach(([langCode, count]) => {
        sortedArrayOfLangs.push(langCode);
      });
    return sortedArrayOfLangs;
  }

  function getDocumentElementLang(el) {
    let elLang = "";
    if (el != null && el.hasAttribute) {
      while (el && !elLang && el.nodeName !== "BODY") {
        if (el.hasAttribute("lang")) {
          elLang = cleanLangAttr(el.getAttribute("lang"));
        }
        el = el.parentElement;
      }
    }
    return elLang;
  }

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

  const openChooseDefaultLangDialog = (currentLang = "", callBack) => {
    let currentTab = "ListTab1";
    const languages = [];
    Object.entries(langAtts)
      .sort(function (a, b) {
        const x = a[1].toLowerCase();
        const y = b[1].toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      })
      .forEach(([langCode, langDesc]) => {
        if (Object.prototype.hasOwnProperty.call(langAtts, langCode)) {
          languages.push({
            value: langCode,
            text: `${langDesc} - (${cleanLangAttr(langCode)})`,
          });
        }
      });
    editor.windowManager.open({
      title: "Select the document's default language.",
      body: {
        type: "tabpanel",
        tabs: [
          {
            name: "listTab1",
            title: "Choose from list",
            items: [
              {
                type: "htmlpanel",
                html: `<div style="margin-bottom:10px">Current language: ${
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
      initialData: { language: currentLang },
      buttons: [
        { type: "cancel", text: "Cancel" },
        { type: "submit", text: "Save", primary: true },
      ],
      onTabChange(dialogApi, details) {
        currentTab = details.newTabName;
      },
      onSubmit(api) {
        const data = api.getData();
        let newLang =
          currentTab === "listTab2" ? data.manualLanguage : data.language;
        if (regexValidLangValue.test(newLang.trim())) {
          newLang = cleanLangAttr(newLang);
          editor.focus();
          callBack(newLang);
          api.close();
        } else {
          alert(
            "Enter a valid language code with no spaces. Or, press cancel."
          );
        }
      },
    });
  };

  const openConfigureLanguagesOnSelectbox = (langMenuItems, callBack) => {
    const languages = [];
    languages.push({ value: "-n-", text: "None" });
    languages.push({ value: "-o-", text: "Other - Enter manually" });
    Object.entries(langAtts)
      .sort(function (a, b) {
        const x = a[1].toLowerCase();
        const y = b[1].toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      })
      .forEach(([langCode, langDesc]) => {
        if (Object.prototype.hasOwnProperty.call(langAtts, langCode)) {
          languages.push({
            value: langCode,
            text: `${langDesc} - (${cleanLangAttr(langCode)})`,
          });
        }
      });
    const languageChoiceItems = [
      {
        type: "htmlpanel",
        html: '<div style="margin-bottom:10px">Choose up to six languages</div>',
      },
    ];
    let langCounter = 0;
    if (langMenuItems) {
      langMenuItems.forEach((lang) => {
        langCounter++;
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
              disabled: Object.prototype.hasOwnProperty.call(langAtts, lang),
            },
          ],
        });
      });
    }
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
            disabled: true,
          },
        ],
      });
    }
    const initData = {};
    if (langMenuItems) {
      let counter = 0;
      langMenuItems.forEach((lang) => {
        counter++;
        if (Object.prototype.hasOwnProperty.call(langAtts, lang)) {
          initData[`langSelect_${counter}`] = lang.toLowerCase();
        } else {
          initData[`langSelect_${counter}`] = "-o-";
          initData[`langInput_${counter}`] = cleanLangAttr(lang);
        }
      });
    }
    editor.windowManager.open({
      title: "Choose languages",
      body: { type: "panel", items: languageChoiceItems },
      buttons: [
        { type: "cancel", text: "Cancel" },
        { type: "submit", text: "Save", primary: true },
      ],
      onChange(dialogApi, details) {
        const data = dialogApi.getData();
        for (let i = 1; i <= 6; i++) {
          if (data[`langSelect_${i}`] === "-o-") {
            dialogApi.enable(`langInput_${i}`);
          } else {
            dialogApi.disable(`langInput_${i}`);
          }
        }
      },
      initialData: initData,
      onSubmit(dialogApi) {
        const data = dialogApi.getData();
        for (let i = 1; i <= 6; i++) {
          if (
            data[`langSelect_${i}`] === "-o-" &&
            regexValidLangValue.test(data[`langInput_${i}`].trim())
          ) {
            alert(
              "Enter a valid language code with no spaces. Or, press cancel."
            );
            return;
          }
        }
        langMenuItems = [];
        for (let i = 1; i <= 6; i++) {
          if (regexValidLangValue.test(data[`langSelect_${i}`])) {
            langMenuItems.push(data[`langSelect_${i}`]);
          } else if (
            data[`langSelect_${i}`] === "-o-" &&
            regexValidLangValue.test(data[`langInput_${i}`].trim())
          ) {
            langMenuItems.push(data[`langInput_${i}`].trim());
          }
        }
        editor.focus();
        callBack(langMenuItems);
        dialogApi.close();
      },
    });
  };

  const openLangAttsHelp = () => {
    editor.windowManager.open({
      title: "Help for editing language (lang) attributes",
      body: {
        type: "panel",
        items: [
          {
            type: "htmlpanel",
            html: "<div>This is were help would go....</div>",
          },
        ],
      },
      buttons: [{ type: "submit", text: "Ok", primary: true }],
      onSubmit(api) {
        editor.focus();
        api.close();
      },
    });
  };

  function revealLangMarkUp() {
    const doc = editor.getDoc();
    const languagesFound = {};
    let st = doc.getElementById("langAttrQA");
    if (st != null) st.parentElement.removeChild(st);
    const leftOverColors = colorsAvailable.slice();
    let langEls = doc.querySelectorAll("*[lang]");
    langEls.forEach((el) => {
      const langFound = el.getAttribute("lang").trim();
      if (
        el.length > 0 &&
        Object.prototype.hasOwnProperty.call(languagesFound, langFound) ===
          false
      ) {
        let newColor = "#e1f3f8";
        if (leftOverColors.length > 0) newColor = leftOverColors.shift();
        languagesFound[langFound] = newColor;
      }
    });
    for (const langCode in langColors) {
      languagesFound[cleanLangAttr(langCode)] = langColors[langCode];
    }
    langEls = doc.querySelectorAll("*[lang]");
    langEls.forEach((el) => {
      const langFound = el.getAttribute("lang").trim();
      if (
        langFound.length > 0 &&
        Object.prototype.hasOwnProperty.call(languagesFound, langFound) ===
          false
      ) {
        let newColor = "#e1f3f8";
        if (leftOverColors.length > 0) newColor = leftOverColors.shift();
        languagesFound[langFound] = newColor;
      }
    });
    st = doc.createElement("style");
    st.setAttribute("id", "langAttrQA");
    for (const langCode in languagesFound) {
      st.appendChild(
        doc.createTextNode(
          `*[lang=${langCode}] { padding: 5px; background-color: ${languagesFound[langCode]} !important; border: thin solid black;} `
        )
      );
      st.appendChild(
        doc.createTextNode(
          `*[lang=${langCode}]:before { content: "[${langCode}]"} `
        )
      );
      st.appendChild(
        doc.createTextNode(
          `*[lang=${langCode}]:after { content: "[/${langCode}]"} `
        )
      );
    }
    doc.head.appendChild(st);
  }

  function refreshQaStyles() {
    if (editor.getDoc().getElementById("langAttrQA")) {
      revealLangMarkUp();
    }
  }

  function hideLangMarkUp() {
    const doc = editor.getDoc();
    const st = doc.getElementById("langAttrQA");
    if (st != null) st.parentElement.removeChild(st);
  }

  function setDefaultDocumentLanguage(lang) {
    const editorDoc = editor.getDoc();
    let defaultLangDiv = editorDoc.getElementById("defaultContentLangHolder");
    if (defaultLangDiv != null) {
      defaultLangDiv.setAttribute("lang", lang);
    } else {
      defaultLangDiv = editorDoc.createElement("div");
      defaultLangDiv.id = "defaultContentLangHolder";
      defaultLangDiv.setAttribute("lang", lang);
      editorDoc.body.insertBefore(defaultLangDiv, editorDoc.body.firstChild);
    }
    while (defaultLangDiv.nextSibling) {
      defaultLangDiv.appendChild(defaultLangDiv.nextSibling);
    }
    while (defaultLangDiv.previousSibling) {
      defaultLangDiv.insertBefore(
        defaultLangDiv.previousSibling,
        defaultLangDiv.firstChild
      );
    }
    editor.focus();
  }

  function removeLangMarkupAtCursor() {
    const selObj = editor.getBody().ownerDocument.getSelection();
    if (selObj !== null && selObj.rangeCount === 1) {
      const r = selObj.getRangeAt(0);
      if (r.collapsed === true) {
        let el = r.startContainer;
        if (el.nodeType === 3) el = el.parentElement;
        while (el != null && el.hasAttribute("lang") === false) {
          el = el.parentElement;
        }
        if (el != null) {
          el.removeAttribute("lang");
          if (
            el.nodeName.toLowerCase() === "span" &&
            (el.attributes.length === 0 || el.className === "langMarkUp")
          ) {
            while (el.firstChild) {
              el.parentElement.insertBefore(el.firstChild, el);
            }
            el.parentElement.removeChild(el);
          }
        }
      }
    }
    const langs = editor
      .getBody()
      .ownerDocument.querySelectorAll("span.langMarkUp:not([lang])");
    langs.forEach(function (langEl) {
      if (langEl.attributes.length === 1) {
        while (langEl.firstChild) {
          langEl.parentElement.insertBefore(langEl.firstChild, langEl);
        }
        langEl.parentElement.removeChild(langEl);
      }
    });
  }

  function removeAllLangSpans() {
    if (
      confirm("Really remove all lang spans? This cannot be undone.") === true
    ) {
      const doc = editor.getDoc();
      let langs = doc.querySelectorAll("*[lang]");
      langs.forEach(function (langEl) {
        langEl.removeAttribute("lang");
        if (
          langEl.attributes.length === 0 ||
          (langEl.attributes.length === 1 && langEl.className === "langMarkUp")
        ) {
          while (langEl.firstChild) {
            langEl.parentElement.insertBefore(langEl.firstChild, langEl);
          }
          langEl.parentElement.removeChild(langEl);
        }
      });
      langs = doc.querySelectorAll("span.langMarkUp:not([lang])");
      langs.forEach(function (langEl) {
        if (langEl.attributes.length === 1) {
          while (langEl.firstChild) {
            langEl.parentElement.insertBefore(langEl.firstChild, langEl);
          }
          langEl.parentElement.removeChild(langEl);
        }
      });
    }
  }

  function registerFormat(lang) {
    lang = cleanLangAttr(lang);
    const formatToApply = "setLangTo_" + lang;
    editor.formatter.register(formatToApply, {
      inline: "span",
      attributes: { lang: lang, class: "langMarkUp" },
    });
    langFormatsRegistered[formatToApply] = true;
  }

  function setDocLangTo(lang) {
    const formatToApply = `setLangTo_${lang}`;
    if (
      !Object.prototype.hasOwnProperty.call(
        langFormatsRegistered,
        formatToApply
      )
    ) {
      registerFormat(lang);
    }
    editor.focus();
    editor.undoManager.transact(() => {
      editor.formatter.apply("setLangTo_" + lang);
    });
    refreshQaStyles();
  }

  function updateLanguageSelector(newLang) {
    if (!myButtonTextPtr) {
      const container = editor.getContainer();
      const buttons = container.querySelectorAll("button[aria-haspopup=true]");
      buttons.forEach((button) => {
        if (button.title === "Set text language") {
          myButtonTextPtr = button.firstElementChild;
          myButtonTextPtr.style = "width:10em;overflow:hidden;display:block";
        }
      });
    }
    if (myButtonTextPtr) {
      myButtonTextPtr.innerText =
        langAtts[newLang.toLowerCase()] || newLang || "-Langauge Not Set-";
    }
  }

  editor.ui.registry.addMenuButton("languageSelector", {
    text: "-Language Not Set-",
    tooltip: "Set text language",
    fetch: function (callback) {
      const items = [];
      const sortedArrayOfLangs = analyzeEditorDocumentLangUsage();
      if (langMenuItems.length < 1) {
        if (regexValidLangValue.test(defaultLangOfPageHoldingEditor)) {
          langMenuItems.push(defaultLangOfPageHoldingEditor.toLowerCase());
        }
        sortedArrayOfLangs.forEach((lang) => {
          if (langMenuItems.length < 6) {
            langMenuItems.push(lang);
          }
        });
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
      langMenuItems.forEach((lang) => {
        items.push({
          type: "menuitem",
          text: langAtts[lang.toLowerCase()] || cleanLangAttr(lang),
          onAction: function () {
            setDocLangTo(lang);
          },
        });
      });
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
                removeLangMarkupAtCursor();
              },
            },
            {
              type: "menuitem",
              text: "Remove All lang markup",
              icon: "warning",
              onAction: function () {
                removeAllLangSpans();
              },
            },
          ];
        },
      });
      items.push({
        type: "menuitem",
        icon: "preferences",
        text: "Configure languages",
        onAction: function () {
          let currentLang = "";
          const editorBody = editor.getDoc().body;
          if (
            editorBody.children.length === 1 &&
            editorBody.firstElementChild.hasAttribute("lang")
          ) {
            currentLang =
              cleanLangAttr(
                editorBody.firstElementChild.getAttribute("lang")
              ) || currentLang;
          }
          openConfigureLanguagesOnSelectbox(
            langMenuItems,
            (newLangMenuItems) => {
              langMenuItems = newLangMenuItems;
            }
          );
        },
      });
      items.push({
        type: "menuitem",
        icon: "document-properties",
        text: "Set default document language",
        onAction: function () {
          let currentLang = "";
          const editorBody = editor.getDoc().body;
          if (
            editorBody.children.length === 1 &&
            editorBody.firstElementChild.hasAttribute("lang")
          ) {
            currentLang =
              cleanLangAttr(
                editorBody.firstElementChild.getAttribute("lang")
              ) || currentLang;
          }
          openChooseDefaultLangDialog(currentLang, (newLang) => {
            setDefaultDocumentLanguage(newLang);
            refreshQaStyles();
          });
        },
      });
      items.push({
        type: "togglemenuitem",
        text: "Reveal lang markup",
        icon: "preview",
        onAction: function () {
          tsViewMarkup = !tsViewMarkup;
          if (tsViewMarkup) {
            revealLangMarkUp();
          } else {
            hideLangMarkUp();
          }
        },
        onSetup: function (api) {
          api.setActive(tsViewMarkup);
          return function () {};
        },
      });
      items.push({
        type: "menuitem",
        icon: "help",
        text: "Help with language (lang) attribute editing",
        onAction: function () {
          openLangAttsHelp();
        },
      });
      callback(items);
    },
    onSetup: function (buttonApi) {
      const editorEventCallback = function (eventApi) {
        lastCurrentLang = getDocumentElementLang(eventApi.element);
        updateLanguageSelector(lastCurrentLang);
      };
      editor.on("NodeChange", editorEventCallback);
      editor.on("SetContent", editorEventCallback);
      editor.on("Focus", editorEventCallback);
      return function (buttonApi) {
        editor.off("NodeChange", editorEventCallback);
        editor.off("SetContent", editorEventCallback);
        editor.off("Focus", editorEventCallback);
      };
    },
  });

  return {
    getMetadata() {
      return { name: "LanguageSelector plugin" };
    },
  };

});
