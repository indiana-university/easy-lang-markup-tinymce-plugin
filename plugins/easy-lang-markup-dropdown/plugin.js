/**
 * Copyright (C) 2012 The Trustees of Indiana University
 * SPDX-License-Identifier: GPL-3.0-only
 */


const i18n2 = {
  'en': {
    setTextLanguage: "Set text language",
    languageNotSet: "-Language Not Set-",
    chooseLanguages: "Choose languages",
    removeLanguageMarkup: "Remove Language Markup",
    removeCurrentLang: "Remove current lang value",
    removeAllLang: "Remove All lang markup",
    configureLanguages: "Configure languages",
    setDefaultDocLang: "Set default document language",
    revealLangMarkup: "Reveal lang markup",
    helpWithLang: "Help with language (lang) attribute editing",
    selectDocDefaultLang: "Select the document's default language.",
    chooseFromList: "Choose from list",
    enterManually: "Enter manually",
    none: "None",
    otherEnterManually: "Other - Enter manually",
    currentLanguage: "Current language:",
    newLanguage: "New Language:",
    enterLangCode: 'Enter new lang code (e.g., "en-US"):',
    chooseUpToSix: "Choose up to six languages",
    languageSelect: "Language select",
    manualLanguageEntry: "Manual language entry",
    confirmRemoveAll: "Really remove all language markup from the document?",
    invalidLangCode: "Enter a valid language code with no spaces. Or, press cancel.",
    helpTitle: "Help for Editing Language (lang) Attributes",
    helpContent: `
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
    `
  },
  'es': {
    setTextLanguage: "Establecer idioma del texto",
    languageNotSet: "-Idioma no establecido-",
    chooseLanguages: "Elegir idiomas",
    removeLanguageMarkup: "Eliminar marcado de idioma",
    removeCurrentLang: "Eliminar valor de idioma actual",
    removeAllLang: "Eliminar todo el marcado de idioma",
    configureLanguages: "Configurar idiomas",
    setDefaultDocLang: "Establecer idioma predeterminado del documento",
    revealLangMarkup: "Mostrar marcado de idioma",
    helpWithLang: "Ayuda con la edición de atributos de idioma (lang)",
    selectDocDefaultLang: "Seleccione el idioma predeterminado del documento.",
    chooseFromList: "Elegir de la lista",
    enterManually: "Ingresar manualmente",
    none: "Ninguno",
    otherEnterManually: "Otro - Ingresar manualmente",
    currentLanguage: "Idioma actual:",
    newLanguage: "Nuevo idioma:",
    enterLangCode: 'Ingrese el nuevo código de idioma (ej., "es-MX"):',
    chooseUpToSix: "Elija hasta seis idiomas",
    languageSelect: "Selección de idioma",
    manualLanguageEntry: "Entrada manual de idioma",
    confirmRemoveAll: "¿Realmente desea eliminar todo el marcado de idioma del documento?",
    invalidLangCode: "Ingrese un código de idioma válido sin espacios. O presione cancelar.",
    helpTitle: "Ayuda para editar atributos de idioma (lang)",
    helpContent: `
      <div>
        <p><strong>Ayuda con atributos de idioma (lang)</strong></p>
        <p>
          El atributo <code>lang</code> especifica el idioma del contenido 
          dentro de un elemento. Ayuda a los lectores de pantalla y motores de búsqueda 
          a entender y procesar el contenido correctamente.
        </p>
        <p>
          Para editar los atributos de idioma en este documento, puede usar las 
          herramientas proporcionadas en el editor. Puede establecer el atributo de idioma 
          para secciones específicas o para todo el documento.
        </p>
        <p>Aquí hay algunos ejemplos de códigos de idioma:</p>
        <ul>
          <li><code>en</code> - Inglés</li>
          <li><code>es</code> - Español</li>
          <li><code>fr</code> - Francés</li>
          <li><code>de</code> - Alemán</li>
          <li><code>zh-CN</code> - Chino (Simplificado)</li>
        </ul>
        <p>Para más información, consulte la <a href="https://www.w3.org/International/questions/qa-lang-why" target="_blank">documentación de W3C</a>.</p>
      </div>
    `
  },
  'fr': {
    setTextLanguage: "Définir la langue du texte",
    languageNotSet: "-Langue non définie-",
    chooseLanguages: "Choisir les langues",
    removeLanguageMarkup: "Supprimer le balisage de langue",
    removeCurrentLang: "Supprimer la valeur de langue actuelle",
    removeAllLang: "Supprimer tout le balisage de langue",
    configureLanguages: "Configurer les langues",
    setDefaultDocLang: "Définir la langue par défaut du document",
    revealLangMarkup: "Révéler le balisage de langue",
    helpWithLang: "Aide à l'édition des attributs de langue (lang)",
    selectDocDefaultLang: "Sélectionnez la langue par défaut du document.",
    chooseFromList: "Choisir dans la liste",
    enterManually: "Saisir manuellement",
    none: "Aucun",
    otherEnterManually: "Autre - Saisir manuellement",
    currentLanguage: "Langue actuelle :",
    newLanguage: "Nouvelle langue :",
    enterLangCode: 'Entrez le nouveau code de langue (ex., "fr-FR") :',
    chooseUpToSix: "Choisissez jusqu'à six langues",
    languageSelect: "Sélection de langue",
    manualLanguageEntry: "Saisie manuelle de langue",
    confirmRemoveAll: "Voulez-vous vraiment supprimer tout le balisage de langue du document ?",
    invalidLangCode: "Entrez un code de langue valide sans espaces. Ou appuyez sur annuler.",
    helpTitle: "Aide pour l'édition des attributs de langue (lang)",
    helpContent: `
      <div>
        <p><strong>Aide sur les attributs de langue (lang)</strong></p>
        <p>
          L'attribut <code>lang</code> spécifie la langue du contenu 
          à l'intérieur d'un élément. Il aide les lecteurs d'écran et les moteurs de recherche 
          à comprendre et traiter correctement le contenu.
        </p>
        <p>
          Pour modifier les attributs de langue dans ce document, vous pouvez utiliser les 
          outils fournis dans l'éditeur. Vous pouvez définir l'attribut de langue 
          pour des sections spécifiques ou pour l'ensemble du document.
        </p>
        <p>Voici quelques exemples de codes de langue :</p>
        <ul>
          <li><code>en</code> - Anglais</li>
          <li><code>es</code> - Espagnol</li>
          <li><code>fr</code> - Français</li>
          <li><code>de</code> - Allemand</li>
          <li><code>zh-CN</code> - Chinois (Simplifié)</li>
        </ul>
        <p>Pour plus d'informations, consultez la <a href="https://www.w3.org/International/questions/qa-lang-why" target="_blank">documentation W3C</a>.</p>
      </div>
    `
  },
  'de': {
    setTextLanguage: "Textsprache festlegen",
    languageNotSet: "-Sprache nicht festgelegt-",
    chooseLanguages: "Sprachen auswählen",
    removeLanguageMarkup: "Sprachmarkierung entfernen",
    removeCurrentLang: "Aktuelle Sprachwert entfernen",
    removeAllLang: "Alle Sprachmarkierungen entfernen",
    configureLanguages: "Sprachen konfigurieren",
    setDefaultDocLang: "Standardsprache des Dokuments festlegen",
    revealLangMarkup: "Sprachmarkierung anzeigen",
    helpWithLang: "Hilfe zur Bearbeitung von Sprachattributen (lang)",
    selectDocDefaultLang: "Wählen Sie die Standardsprache des Dokuments.",
    chooseFromList: "Aus Liste auswählen",
    enterManually: "Manuell eingeben",
    none: "Keine",
    otherEnterManually: "Andere - Manuell eingeben",
    currentLanguage: "Aktuelle Sprache:",
    newLanguage: "Neue Sprache:",
    enterLangCode: 'Geben Sie den neuen Sprachcode ein (z.B. "de-DE"):',
    chooseUpToSix: "Wählen Sie bis zu sechs Sprachen",
    languageSelect: "Sprachauswahl",
    manualLanguageEntry: "Manuelle Spracheingabe",
    confirmRemoveAll: "Möchten Sie wirklich alle Sprachmarkierungen aus dem Dokument entfernen?",
    invalidLangCode: "Geben Sie einen gültigen Sprachcode ohne Leerzeichen ein. Oder drücken Sie Abbrechen.",
    helpTitle: "Hilfe zum Bearbeiten von Sprachattributen (lang)",
    helpContent: `
      <div>
        <p><strong>Hilfe zu Sprachattributen (lang)</strong></p>
        <p>
          Das <code>lang</code>-Attribut gibt die Sprache des Inhalts 
          innerhalb eines Elements an. Es hilft Screenreadern und Suchmaschinen, 
          den Inhalt richtig zu verstehen und zu verarbeiten.
        </p>
        <p>
          Um die Sprachattribute in diesem Dokument zu bearbeiten, können Sie die 
          bereitgestellten Werkzeuge im Editor verwenden. Sie können das Sprachattribut 
          für bestimmte Abschnitte oder für das gesamte Dokument festlegen.
        </p>
        <p>Hier sind einige Beispiele für Sprachcodes:</p>
        <ul>
          <li><code>en</code> - Englisch</li>
          <li><code>es</code> - Spanisch</li>
          <li><code>fr</code> - Französisch</li>
          <li><code>de</code> - Deutsch</li>
          <li><code>zh-CN</code> - Chinesisch (Vereinfacht)</li>
        </ul>
        <p>Weitere Informationen finden Sie in der <a href="https://www.w3.org/International/questions/qa-lang-why" target="_blank">W3C-Dokumentation</a>.</p>
      </div>
    `
  },
  'ja': {
    setTextLanguage: "テキスト言語を設定",
    languageNotSet: "-言語未設定-",
    chooseLanguages: "言語を選択",
    removeLanguageMarkup: "言語マークアップを削除",
    removeCurrentLang: "現在の言語値を削除",
    removeAllLang: "すべての言語マークアップを削除",
    configureLanguages: "言語を設定",
    setDefaultDocLang: "文書のデフォルト言語を設定",
    revealLangMarkup: "言語マークアップを表示",
    helpWithLang: "言語属性の編集ヘルプ",
    selectDocDefaultLang: "文書のデフォルト言語を選択してください。",
    chooseFromList: "リストから選択",
    enterManually: "手動で入力",
    none: "なし",
    otherEnterManually: "その他 - 手動で入力",
    currentLanguage: "現在の言語：",
    newLanguage: "新しい言語：",
    enterLangCode: '新しい言語コードを入力（例："ja-JP"）：',
    chooseUpToSix: "最大6つの言語を選択",
    languageSelect: "言語選択",
    manualLanguageEntry: "言語の手動入力",
    confirmRemoveAll: "文書からすべての言語マークアップを削除してもよろしいですか？",
    invalidLangCode: "スペースを含まない有効な言語コードを入力してください。またはキャンセルを押してください。",
    helpTitle: "言語属性の編集ヘルプ",
    helpContent: `
      <div>
        <p><strong>言語（lang）属性のヘルプ</strong></p>
        <p>
          <code>lang</code> 属性は要素内のコンテンツの言語を指定します。
          スクリーンリーダーや検索エンジンが内容を正しく理解し処理するのに役立ちます。
        </p>
        <p>
          この文書の言語属性を編集するには、エディターで提供されているツールを使用できます。
          特定のセクションまたは文書全体の言語属性を設定できます。
        </p>
        <p>言語コードの例：</p>
        <ul>
          <li><code>en</code> - 英語</li>
          <li><code>es</code> - スペイン語</li>
          <li><code>fr</code> - フランス語</li>
          <li><code>de</code> - ドイツ語</li>
          <li><code>zh-CN</code> - 中国語（簡体字）</li>
        </ul>
        <p>詳細については、<a href="https://www.w3.org/International/questions/qa-lang-why" target="_blank">W3Cドキュメント</a>を参照してください。</p>
      </div>
    `
  },
  'zh-cn': {
    setTextLanguage: "设置文本语言",
    languageNotSet: "-未设置语言-",
    chooseLanguages: "选择语言",
    removeLanguageMarkup: "删除语言标记",
    removeCurrentLang: "删除当前语言值",
    removeAllLang: "删除所有语言标记",
    configureLanguages: "配置语言",
    setDefaultDocLang: "设置文档默认语言",
    revealLangMarkup: "显示语言标记",
    helpWithLang: "语言（lang）属性编辑帮助",
    selectDocDefaultLang: "选择文档的默认语言。",
    chooseFromList: "从列表中选择",
    enterManually: "手动输入",
    none: "无",
    otherEnterManually: "其他 - 手动输入",
    currentLanguage: "当前语言：",
    newLanguage: "新语言：",
    enterLangCode: '输入新的语言代码（例如："zh-CN"）：',
    chooseUpToSix: "最多选择六种语言",
    languageSelect: "语言选择",
    manualLanguageEntry: "手动语言输入",
    confirmRemoveAll: "确实要删除文档中的所有语言标记吗？",
    invalidLangCode: "请输入有效的语言代码，不含空格。或按取消。",
    helpTitle: "语言（lang）属性编辑帮助",
    helpContent: `
      <div>
        <p><strong>语言（lang）属性帮助</strong></p>
        <p>
          <code>lang</code>属性指定元素内容的语言。
          它帮助屏幕阅读器和搜索引擎正确理解和处理内容。
        </p>
        <p>
          要编辑此文档中的语言属性，您可以使用编辑器中提供的工具。
          您可以为特定部分或整个文档设置语言属性。
        </p>
        <p>以下是一些语言代码示例：</p>
        <ul>
          <li><code>en</code> - 英语</li>
          <li><code>es</code> - 西班牙语</li>
          <li><code>fr</code> - 法语</li>
          <li><code>de</code> - 德语</li>
          <li><code>zh-CN</code> - 中文（简体）</li>
        </ul>
        <p>更多信息，请参阅<a href="https://www.w3.org/International/questions/qa-lang-why" target="_blank">W3C文档</a>。</p>
      </div>
    `
  },
  'zh': {
    setTextLanguage: "设置文本语言",
    languageNotSet: "-未设置语言-",
    chooseLanguages: "选择语言",
    removeLanguageMarkup: "删除语言标记",
    removeCurrentLang: "删除当前语言值",
    removeAllLang: "删除所有语言标记",
    configureLanguages: "配置语言",
    setDefaultDocLang: "设置文档默认语言",
    revealLangMarkup: "显示语言标记",
    helpWithLang: "语言属性编辑帮助",
    selectDocDefaultLang: "选择文档的默认语言。",
    chooseFromList: "从列表中选择",
    enterManually: "手动输入",
    none: "无",
    otherEnterManually: "其他 - 手动输入",
    currentLanguage: "当前语言：",
    newLanguage: "新语言：",
    enterLangCode: '输入新的语言代码（例如："zh-CN"）：',
    chooseUpToSix: "最多选择六种语言",
    languageSelect: "语言选择",
    manualLanguageEntry: "手动语言输入",
    confirmRemoveAll: "确实要删除文档中的所有语言标记吗？",
    invalidLangCode: "请输入没有空格的有效语言代码。或按取消。",
    helpTitle: "语言属性编辑帮助",
    helpContent: `
      <div>
        <p><strong>语言（lang）属性帮助</strong></p>
        <p>
          <code>lang</code> 属性指定元素内容的语言。
          它帮助屏幕阅读器和搜索引擎正确理解和处理内容。
        </p>
        <p>
          要编辑此文档中的语言属性，您可以使用编辑器中提供的工具。
          您可以为特定部分或整个文档设置语言属性。
        </p>
        <p>以下是一些语言代码示例：</p>
        <ul>
          <li><code>en</code> - 英语</li>
          <li><code>es</code> - 西班牙语</li>
          <li><code>fr</code> - 法语</li>
          <li><code>de</code> - 德语</li>
          <li><code>zh-CN</code> - 中文（简体）</li>
        </ul>
        <p>更多信息，请参阅 <a href="https://www.w3.org/International/questions/qa-lang-why" target="_blank">W3C文档</a>。</p>
      </div>
    `
  }
};

/* global alert, confirm, tinyMCE */
tinyMCE.PluginManager.add("languageSelect", function (editor) {
  "use strict";
  const regexValidLangValue = /^[^-\s]{2,5}(-[^-\s]{2,6})*$/;

  let iconName = "easyLangIcon";
  let showCurrentLanguage = false;
  let showCurrentLangCodeOnly = false;
  let enableKeyboardShortcuts = true;

  let keyboardShortCuts = ["meta+Shift+1", "meta+Shift+2", "meta+Shift+3", "meta+Shift+4", "meta+Shift+5", "meta+Shift+6"];

  let defaultLanguages = ["en", "es", "fr", "it", "de"];
  let langColors = {
    en: "#eee",
    "en-us": "#ddd",
    es: "#E6B0AA",
    fr: "#AED6F1",
    it: "#ABEBC6",
    de: "#F9E79F",
  };
  let colorsAvailable = [
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
  let editorLanguage = 'en';
  let tsViewMarkup = false;
  let langMenuItems = [];
  let myButtonTextPtr = null;

  // Helper function to get the current editor language
  function getCurrentEditorLanguage() {
    // Get the full language code from editor settings or options, defaulting to 'en'
    const fullLangCode = (editor.settings?.language || editor.options?.get('language') || 'en').toLowerCase();
    return fullLangCode.replace('_','-').replaceAll(' ','').trim();
  }

  // Helper function to get translation string with fallback hierarchy
  function translate(key) {
    
    // Try the full language code first (e.g., 'es-MX')
    if (i18n2[editorLanguage]?.[key]) {
      return i18n2[editorLanguage][key];
    }
    
    // If not found and there's a hyphen, try the primary language code (e.g., 'es')
    const primaryLangCode = editorLanguage.split('-')[0];
    if (editorLanguage.includes('-') && i18n2[primaryLangCode]?.[key]) {
      return i18n2[primaryLangCode][key];
    }
    
    // Fall back to English if available
    if (i18n2['en']?.[key]) {
      return i18n2['en'][key];
    }
    
    // Last resort: return the key itself
    return key;
  }



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

    // See if the tinyMCE.init has a config value for easylang_default_document_language
    if(editor && editor.getParam) {
      const defaultLangFromConfig = editor.getParam("easylang_default_document_language");
      if (regexValidLangValue.test(defaultLangFromConfig)) {
        defaultLang = defaultLangFromConfig;
      }
    }

    // 1. Check if editor has a configured language setting
    if (!regexValidLangValue.test(defaultLang) && editor && editor.settings && editor.settings.language) {
      defaultLang = cleanLangAttr(editor.settings.language);
    }

    // 2. Check if the document body has one child with a lang attribute
    if (
      !regexValidLangValue.test(defaultLang) &&
      editorDocument &&
      editorDocument.body &&
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
      editorDocument &&
      editorDocument.body &&
      editorDocument.body.hasAttribute("lang")
    ) {
      defaultLang = cleanLangAttr(editorDocument.body.getAttribute("lang"));
    }

    // 4. Check if the document root (HTML element) has a lang attribute
    if (
      !regexValidLangValue.test(defaultLang) &&
      topDocument &&
      topDocument.documentElement &&
      topDocument.documentElement.hasAttribute("lang")
    ) {
      defaultLang = cleanLangAttr(
        topDocument.documentElement.getAttribute("lang")
      );
    }

    // 5. Fallback: Use browser language or default to 'en'
    if (!regexValidLangValue.test(defaultLang) && window && window.navigator) {
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
    if (regexValidLangValue.test(editorLanguage)) {
      langsUsed[editorLanguage] = 1;
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
    'af': 'Afrikaans',
    'ak': 'Akan',
    'ar': 'العربية',
    'az': 'Azerbaijani',
    'bg': 'Bulgarian',
    'bho': 'Bhojpuri',
    'bm': 'Bambara',
    'bn': 'Bengali (Bangla)',
    'bo': 'Tibetan',
    'bs': 'Bosnian (Bosanski)',
    'ca': 'Català',
    'cs': 'Čeština',
    'cu': 'Bulgarian, Old (Church Slavic)',
    'cy': 'Cymraeg',
    'da': 'Dansk',
    'de': 'Deutsch',
    'el': 'Ελληνικά',
    'en-au': 'English (Australia)',
    'en-AU': 'English (Australia)',
    'en-CA': 'English (Canada)',
    'en-gb': 'English (United Kingdom)',
    'en-GB': 'English (United Kingdom)',
    'en-ie': 'English (Ireland)',
    'en-in': 'English (Indian)',
    'en-tt': 'English (Trinidad)',
    'en-us': 'English (United States)',
    'en-US': 'English (United States)',
    'en-za': 'English (South Africa)',
    'en': 'English',
    'es-ar': 'Spanish (Argentinia)',
    'es-cl': 'Spanish (Chile)',
    'es-co': 'Spanish (Columbia)',
    'es-mx': 'Spanish (Mexico)',
    'es-pe': 'Spanish (Peru)',
    'es': 'Español',
    'et': 'Eesti',
    'eu': 'Euskera',
    'fa': 'فارسی',
    'fi': 'Suomi',
    'fr-ca': 'Français (Canada)',
    'fr': 'Français',
    'gl': 'Galician (Spain)',
    'he': 'עִברִית',
    'hi': 'हिन्दी',
    'hr': 'Croatian',
    'ht': 'Kreyòl Ayisyen',
    'hu': 'Magyar',
    'hy': 'Հայերեն',
    'id': 'Bahasa Indonesia',
    'is': 'Íslenska',
    'it': 'Italiano',
    'ja': '日本語',
    'kk': 'Kazakh',
    'kn': 'Kannada',
    'ko': '한국말',
    'la': 'Latin',
    'lkt': 'Lakota',
    'mi': 'Reo Māori',
    'mn': 'Mongolian',
    'mr': 'Marathi',
    'ms': 'Bahasa Melayu',
    'nb': 'Norsk Bokmål',
    'nl-be': 'Dutch (Belgium)',
    'nl': 'Nederlands',
    'nn': 'Norsk Nynorsk',
    'pl': 'Polski',
    'ps': 'Pashto',
    'pt-br': 'Português do Brasil',
    'pt': 'Português',
    'qu': 'Quechua',
    'ro': 'Română',
    'ru': 'Русский',
    'sa': 'Sanskrit',
    'se': 'Sámegiella',
    'sk-sk': 'Slovakia',
    'sl': 'Slovenščina',
    'sma': 'SMA',
    'sme': 'SME',
    'smj': 'SMJ',
    'sr': 'Српски',
    'sv': 'Svenska',
    'sw': 'Swahili',
    'ta': 'Tamil',
    'te': 'Telugu',
    'tg': 'Tajik',
    'th': 'ไทย',
    'tr': 'Türkçe',
    'ug': 'Uyghur',
    'uk': 'Українська',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vi': 'Tiếng Việt',
    'wo': 'Wolof',
    'yi': 'Yiddish',
    'yo': 'Yoruba',
    'yua': 'Yucatec Maya',
    'zh-cn': 'Chinese (China)',
    'zh-hans': '简体中文',
    'zh-hant': '繁體中文',
    'zh-hk': 'Chinese (Hong Kong)',
    'zh-tw': 'Chinese (Taiwan)',
    'zh': 'Chinese',
    'zu': 'Zulu',
  };

const languageNames = {
  'ar': {
    af: 'الأفريكانية',
    ak: 'الأكان',
    ar: 'العربية',
    az: 'الأذربيجانية',
    bg: 'البلغارية',
    bho: 'البهوجبورية',
    bm: 'البامبارا',
    bn: 'البنغالية',
    bo: 'التبتية',
    bs: 'البوسنية',
    ca: 'الكتالانية؛ الفالنسيانية',
    cs: 'التشيكية',
    cu: 'البلغارية القديمة',
    da: 'الدنماركية',
    de: 'الألمانية',
    el: 'اليونانية',
    en: 'الإنجليزية',
    'en-au': 'الإنجليزية (أستراليا)',
    'en-gb': 'الإنجليزية (المملكة المتحدة)',
    'en-in': 'الإنجليزية (الهندية)',
    'en-ie': 'الإنجليزية (أيرلندا)',
    'en-tt': 'الإنجليزية (ترينيداد)',
    'en-us': 'الإنجليزية (الولايات المتحدة)',
    'en-za': 'الإنجليزية (جنوب أفريقيا)',
    es: 'الإسبانية',
    'es-ar': 'الإسبانية (الأرجنتين)',
    'es-cl': 'الإسبانية (تشيلي)',
    'es-co': 'الإسبانية (كولومبيا)',
    'es-mx': 'الإسبانية (المكسيك)',
    'es-pe': 'الإسبانية (بيرو)',
    et: 'الإستونية',
    eu: 'الباسكية',
    fa: 'الفارسية',
    fi: 'الفنلندية',
    fr: 'الفرنسية',
    'fr-ca': 'الفرنسية (الكندية)',
    gl: 'الغاليسية (إسبانيا)',
    he: 'العبرية',
    hi: 'الهندية',
    hr: 'الكرواتية',
    hu: 'المجرية',
    id: 'الإندونيسية',
    it: 'الإيطالية',
    ja: 'اليابانية',
    kk: 'الكازاخية',
    kn: 'الكانادا',
    ko: 'الكورية',
    la: 'اللاتينية',
    lkt: 'اللاكوتا',
    mn: 'المنغولية',
    mr: 'الماراثية',
    nb: 'النرويجية بوكمال',
    nl: 'الهولندية',
    'nl-be': 'الهولندية (بلجيكا)',
    nn: 'النرويجية نينورسك',
    pl: 'البولندية',
    ps: 'البشتو',
    pt: 'البرتغالية الدولية',
    'pt-br': 'البرتغالية (البرازيل)',
    qu: 'الكيتشوا',
    ro: 'الرومانية',
    ru: 'الروسية',
    sa: 'السنسكريتية',
    'sk-sk': 'السلوفاكية',
    sl: 'السلوفينية',
    sma: 'السامية الجنوبية',
    smj: 'السامية لولي',
    sr: 'الصربية',
    sv: 'السويدية',
    sw: 'السواحيلية',
    ta: 'التاميلية',
    te: 'التيلوغو',
    tg: 'الطاجيكية',
    th: 'التايلاندية',
    tr: 'التركية',
    ug: 'الأويغورية',
    uk: 'الأوكرانية',
    ur: 'الأردية',
    uz: 'الأوزبكية',
    vi: 'الفيتنامية',
    wo: 'الولوف',
    yi: 'اليديشية',
    yo: 'اليوروبا',
    yua: 'المايا اليوكاتيكية',
    zh: 'الصينية',
    'zh-cn': 'الصينية (الصين)',
    'zh-hk': 'الصينية (هونغ كونغ)',
    'zh-tw': 'الصينية (تايوان)',
    'zh-hans': 'الصينية المبسطة',
    'zh-hant': 'الصينية التقليدية',
    zu: 'الزولو'
  },

'en': {
    af: 'Afrikaans',
    ak: 'Akan',
    ar: 'Arabic',
    az: 'Azerbaijani',
    bg: 'Bulgarian',
    bho: 'Bhojpuri',
    bm: 'Bambara',
    bn: 'Bengali',
    bo: 'Tibetan',
    bs: 'Bosnian',
    ca: 'Catalan; Valencian',
    cs: 'Czech',
    cu: 'Bulgarian, Old',
    da: 'Danish',
    de: 'German',
    el: 'Greek',
    en: 'English',
    'en-au': 'English (Australia)',
    'en-gb': 'English (United Kingdom)',
    'en-in': 'English (Indian)',
    'en-ie': 'English (Ireland)',
    'en-tt': 'English (Trinidad)',
    'en-us': 'English (United States)',
    'en-za': 'English (South Africa)',
    es: 'Spanish',
    'es-ar': 'Spanish (Argentinia)',
    'es-cl': 'Spanish (Chile)',
    'es-co': 'Spanish (Columbia)',
    'es-mx': 'Spanish (Mexico)',
    'es-pe': 'Spanish (Peru)',
    et: 'Estonian',
    eu: 'Basque',
    fa: 'Persian',
    fi: 'Finnish',
    fr: 'French',
    'fr-ca': 'French (Canadian)',
    gl: 'Galician (Spain)',
    he: 'Hebrew',
    hi: 'Hindi',
    hr: 'Croatian',
    hu: 'Hungarian',
    id: 'Indonesian',
    it: 'Italian',
    ja: 'Japanese',
    kk: 'Kazakh',
    kn: 'Kannada',
    ko: 'Korean',
    la: 'Latin',
    lkt: 'Lakota',
    mn: 'Mongolian',
    mr: 'Marathi',
    nb: 'Norwegian Bokmål',
    nl: 'Dutch',
    'nl-be': 'Dutch (Belgium)',
    nn: 'Norwegian Nynorsk',
    pl: 'Polish',
    ps: 'Pashto',
    pt: 'Portuguese, International',
    'pt-br': 'Portuguese, Brazil',
    qu: 'Quechua',
    ro: 'Romanian',
    ru: 'Russian',
    sa: 'Sanskrit',
    'sk-sk': 'Slovak',
    sl: 'Slovenian',
    sma: 'Southern Sami',
    smj: 'Lule Sami',
    sr: 'Serbian',
    sv: 'Swedish',
    sw: 'Swahili',
    ta: 'Tamil',
    te: 'Telugu',
    tg: 'Tajik',
    th: 'Thai',
    tr: 'Turkish',
    ug: 'Uyghur',
    uk: 'Ukrainian',
    ur: 'Urdu',
    uz: 'Uzbek',
    vi: 'Vietnamese',
    wo: 'Wolof',
    yi: 'Yiddish',
    yo: 'Yoruba',
    yua: 'Yucatec Maya',
    zh: 'Chinese',
    'zh-cn': 'Chinese (China)',
    'zh-hk': 'Chinese (Hong Kong)',
    'zh-tw': 'Chinese (Taiwan)',
    'zh-hans': 'Chinese, Simplified',
    'zh-hant': 'Chinese, Traditional',
    zu: 'Zulu'},

  'es': {
    af: 'Afrikáans',
    ak: 'Akano',
    ar: 'Árabe',
    az: 'Azerí',
    bg: 'Búlgaro',
    bho: 'Bhojpuri',
    bm: 'Bambara',
    bn: 'Bengalí',
    bo: 'Tibetano',
    bs: 'Bosnio',
    ca: 'Catalán; Valenciano',
    cs: 'Checo',
    cu: 'Búlgaro antiguo',
    da: 'Danés',
    de: 'Alemán',
    el: 'Griego',
    en: 'Inglés',
    'en-au': 'Inglés (Australia)',
    'en-gb': 'Inglés (Reino Unido)',
    'en-in': 'Inglés (India)',
    'en-ie': 'Inglés (Irlanda)',
    'en-tt': 'Inglés (Trinidad)',
    'en-us': 'Inglés (Estados Unidos)',
    'en-za': 'Inglés (Sudáfrica)',
    es: 'Español',
    'es-ar': 'Español (Argentina)',
    'es-cl': 'Español (Chile)',
    'es-co': 'Español (Colombia)',
    'es-mx': 'Español (México)',
    'es-pe': 'Español (Perú)',
    et: 'Estonio',
    eu: 'Vasco',
    fa: 'Persa',
    fi: 'Finés',
    fr: 'Francés',
    'fr-ca': 'Francés (Canadá)',
    gl: 'Gallego',
    he: 'Hebreo',
    hi: 'Hindi',
    hr: 'Croata',
    hu: 'Húngaro',
    id: 'Indonesio',
    it: 'Italiano',
    ja: 'Japonés',
    kk: 'Kazajo',
    kn: 'Canarés',
    ko: 'Coreano',
    la: 'Latín',
    lkt: 'Lakota',
    mn: 'Mongol',
    mr: 'Maratí',
    nb: 'Noruego Bokmål',
    nl: 'Neerlandés',
    'nl-be': 'Neerlandés (Bélgica)',
    nn: 'Nynorsk noruego',
    pl: 'Polaco',
    ps: 'Pastún',
    pt: 'Portugués internacional',
    'pt-br': 'Portugués (Brasil)',
    qu: 'Quechua',
    ro: 'Rumano',
    ru: 'Ruso',
    sa: 'Sánscrito',
    'sk-sk': 'Eslovaco',
    sl: 'Esloveno',
    sma: 'Sami meridional',
    smj: 'Sami de Lule',
    sr: 'Serbio',
    sv: 'Sueco',
    sw: 'Suajili',
    ta: 'Tamil',
    te: 'Telugu',
    tg: 'Tayiko',
    th: 'Tailandés',
    tr: 'Turco',
    ug: 'Uigur',
    uk: 'Ucraniano',
    ur: 'Urdu',
    uz: 'Uzbeko',
    vi: 'Vietnamita',
    wo: 'Wolof',
    yi: 'Yidis',
    yo: 'Yoruba',
    yua: 'Maya yucateco',
    zh: 'Chino',
    'zh-cn': 'Chino (China)',
    'zh-hk': 'Chino (Hong Kong)',
    'zh-tw': 'Chino (Taiwán)',
    'zh-hans': 'Chino simplificado',
    'zh-hant': 'Chino tradicional',
    zu: 'Zulú'
  },

  'fr': {
    af: 'Afrikaans',
    ak: 'Akan',
    ar: 'Arabe',
    az: 'Azerbaïdjanais',
    bg: 'Bulgare',
    bho: 'Bhojpuri',
    bm: 'Bambara',
    bn: 'Bengali',
    bo: 'Tibétain',
    bs: 'Bosniaque',
    ca: 'Catalan; Valencien',
    cs: 'Tchèque',
    cu: 'Vieux bulgare',
    da: 'Danois',
    de: 'Allemand',
    el: 'Grec',
    en: 'Anglais',
    'en-au': 'Anglais (Australie)',
    'en-gb': 'Anglais (Royaume-Uni)',
    'en-in': 'Anglais (Indien)',
    'en-ie': 'Anglais (Irlande)',
    'en-tt': 'Anglais (Trinité)',
    'en-us': 'Anglais (États-Unis)',
    'en-za': 'Anglais (Afrique du Sud)',
    es: 'Espagnol',
    'es-ar': 'Espagnol (Argentine)',
    'es-cl': 'Espagnol (Chili)',
    'es-co': 'Espagnol (Colombie)',
    'es-mx': 'Espagnol (Mexique)',
    'es-pe': 'Espagnol (Pérou)',
    et: 'Estonien',
    eu: 'Basque',
    fa: 'Persan',
    fi: 'Finnois',
    fr: 'Français',
    'fr-ca': 'Français (Canadien)',
    gl: 'Galicien',
    he: 'Hébreu',
    hi: 'Hindi',
    hr: 'Croate',
    hu: 'Hongrois',
    id: 'Indonésien',
    it: 'Italien',
    ja: 'Japonais',
    kk: 'Kazakh',
    kn: 'Kannada',
    ko: 'Coréen',
    la: 'Latin',
    lkt: 'Lakota',
    mn: 'Mongol',
    mr: 'Marathi',
    nb: 'Norvégien bokmål',
    nl: 'Néerlandais',
    'nl-be': 'Néerlandais (Belgique)',
    nn: 'Norvégien nynorsk',
    pl: 'Polonais',
    ps: 'Pachto',
    pt: 'Portugais international',
    'pt-br': 'Portugais (Brésil)',
    qu: 'Quechua',
    ro: 'Roumain',
    ru: 'Russe',
    sa: 'Sanskrit',
    'sk-sk': 'Slovaque',
    sl: 'Slovène',
    sma: 'Same du Sud',
    smj: 'Same de Lule',
    sr: 'Serbe',
    sv: 'Suédois',
    sw: 'Swahili',
    ta: 'Tamoul',
    te: 'Telugu',
    tg: 'Tadjik',
    th: 'Thaï',
    tr: 'Turc',
    ug: 'Ouïghour',
    uk: 'Ukrainien',
    ur: 'Ourdou',
    uz: 'Ouzbek',
    vi: 'Vietnamien',
    wo: 'Wolof',
    yi: 'Yiddish',
    yo: 'Yoruba',
    yua: 'Maya yucatèque',
    zh: 'Chinois',
    'zh-cn': 'Chinois (Chine)',
    'zh-hk': 'Chinois (Hong Kong)',
    'zh-tw': 'Chinois (Taïwan)',
    'zh-hans': 'Chinois simplifié',
    'zh-hant': 'Chinois traditionnel',
    zu: 'Zoulou'
  },

  'de': {
    af: 'Afrikaans',
    ak: 'Akan',
    ar: 'Arabisch',
    az: 'Aserbaidschanisch',
    bg: 'Bulgarisch',
    bho: 'Bhojpuri',
    bm: 'Bambara',
    bn: 'Bengalisch',
    bo: 'Tibetisch',
    bs: 'Bosnisch',
    ca: 'Katalanisch; Valencianisch',
    cs: 'Tschechisch',
    cu: 'Altbulgarisch',
    da: 'Dänisch',
    de: 'Deutsch',
    el: 'Griechisch',
    en: 'Englisch',
    'en-au': 'Englisch (Australien)',
    'en-gb': 'Englisch (Großbritannien)',
    'en-in': 'Englisch (Indien)',
    'en-ie': 'Englisch (Irland)',
    'en-tt': 'Englisch (Trinidad)',
    'en-us': 'Englisch (Vereinigte Staaten)',
    'en-za': 'Englisch (Südafrika)',
    es: 'Spanisch',
    'es-ar': 'Spanisch (Argentinien)',
    'es-cl': 'Spanisch (Chile)',
    'es-co': 'Spanisch (Kolumbien)',
    'es-mx': 'Spanisch (Mexiko)',
    'es-pe': 'Spanisch (Peru)',
    et: 'Estnisch',
    eu: 'Baskisch',
    fa: 'Persisch',
    fi: 'Finnisch',
    fr: 'Französisch',
    'fr-ca': 'Französisch (Kanadisch)',
    gl: 'Galicisch',
    he: 'Hebräisch',
    hi: 'Hindi',
    hr: 'Kroatisch',
    hu: 'Ungarisch',
    id: 'Indonesisch',
    it: 'Italienisch',
    ja: 'Japanisch',
    kk: 'Kasachisch',
    kn: 'Kannada',
    ko: 'Koreanisch',
    la: 'Lateinisch',
    lkt: 'Lakota',
    mn: 'Mongolisch',
    mr: 'Marathi',
    nb: 'Norwegisch (Bokmål)',
    nl: 'Niederländisch',
    'nl-be': 'Niederländisch (Belgien)',
    nn: 'Norwegisch (Nynorsk)',
    pl: 'Polnisch',
    ps: 'Paschtu',
    pt: 'Portugiesisch, International',
    'pt-br': 'Portugiesisch (Brasilien)',
    qu: 'Quechua',
    ro: 'Rumänisch',
    ru: 'Russisch',
    sa: 'Sanskrit',
    'sk-sk': 'Slowakisch',
    sl: 'Slowenisch',
    sma: 'Südsaamisch',
    smj: 'Lulesaamisch',
    sr: 'Serbisch',
    sv: 'Schwedisch',
    sw: 'Suaheli',
    ta: 'Tamil',
    te: 'Telugu',
    tg: 'Tadschikisch',
    th: 'Thailändisch',
    tr: 'Türkisch',
    ug: 'Uigurisch',
    uk: 'Ukrainisch',
    ur: 'Urdu',
    uz: 'Usbekisch',
    vi: 'Vietnamesisch',
    wo: 'Wolof',
    yi: 'Jiddisch',
    yo: 'Yoruba',
    yua: 'Maya (Yucatán)',
    zh: 'Chinesisch',
    'zh-cn': 'Chinesisch (China)',
    'zh-hk': 'Chinesisch (Hongkong)',
    'zh-tw': 'Chinesisch (Taiwan)',
    'zh-hans': 'Chinesisch (Vereinfacht)',
    'zh-hant': 'Chinesisch (Traditionell)',
    zu: 'Zulu'
  },

  'it': {
    af: 'Afrikaans',
    ak: 'Akan',
    ar: 'Arabo',
    az: 'Azerbaigiano',
    bg: 'Bulgaro',
    bho: 'Bhojpuri',
    bm: 'Bambara',
    bn: 'Bengalese',
    bo: 'Tibetano',
    bs: 'Bosniaco',
    ca: 'Catalano; Valenciano',
    cs: 'Ceco',
    cu: 'Bulgaro antico',
    da: 'Danese',
    de: 'Tedesco',
    el: 'Greco',
    en: 'Inglese',
    'en-au': 'Inglese (Australia)',
    'en-gb': 'Inglese (Regno Unito)',
    'en-in': 'Inglese (India)',
    'en-ie': 'Inglese (Irlanda)',
    'en-tt': 'Inglese (Trinidad)',
    'en-us': 'Inglese (Stati Uniti)',
    'en-za': 'Inglese (Sudafrica)',
    es: 'Spagnolo',
    'es-ar': 'Spagnolo (Argentina)',
    'es-cl': 'Spagnolo (Cile)',
    'es-co': 'Spagnolo (Colombia)',
    'es-mx': 'Spagnolo (Messico)',
    'es-pe': 'Spagnolo (Perù)',
    et: 'Estone',
    eu: 'Basco',
    fa: 'Persiano',
    fi: 'Finlandese',
    fr: 'Francese',
    'fr-ca': 'Francese (Canada)',
    gl: 'Galiziano',
    he: 'Ebraico',
    hi: 'Hindi',
    hr: 'Croato',
    hu: 'Ungherese',
    id: 'Indonesiano',
    it: 'Italiano',
    ja: 'Giapponese',
    kk: 'Kazako',
    kn: 'Kannada',
    ko: 'Coreano',
    la: 'Latino',
    lkt: 'Lakota',
    mn: 'Mongolo',
    mr: 'Marathi',
    nb: 'Norvegese Bokmål',
    nl: 'Olandese',
    'nl-be': 'Olandese (Belgio)',
    nn: 'Norvegese Nynorsk',
    pl: 'Polacco',
    ps: 'Pashto',
    pt: 'Portoghese, Internazionale',
    'pt-br': 'Portoghese, Brasile',
    qu: 'Quechua',
    ro: 'Rumeno',
    ru: 'Russo',
    sa: 'Sanscrito',
    'sk-sk': 'Slovacco',
    sl: 'Sloveno',
    sma: 'Sami del Sud',
    smj: 'Sami di Lule',
    sr: 'Serbo',
    sv: 'Svedese',
    sw: 'Swahili',
    ta: 'Tamil',
    te: 'Telugu',
    tg: 'Tagiko',
    th: 'Thailandese',
    tr: 'Turco',
    ug: 'Uiguro',
    uk: 'Ucraino',
    ur: 'Urdu',
    uz: 'Uzbeco',
    vi: 'Vietnamita',
    wo: 'Wolof',
    yi: 'Yiddish',
    yo: 'Yoruba',
    yua: 'Maya Yucateco',
    zh: 'Cinese',
    'zh-cn': 'Cinese (Cina)',
    'zh-hk': 'Cinese (Hong Kong)',
    'zh-tw': 'Cinese (Taiwan)',
    'zh-hans': 'Cinese semplificato',
    'zh-hant': 'Cinese tradizionale',
    zu: 'Zulu'
  },

  'ja': {
    af: 'アフリカーンス語',
    ak: 'アカン語',
    ar: 'アラビア語',
    az: 'アゼルバイジャン語',
    bg: 'ブルガリア語',
    bho: 'ボージュプリー語',
    bm: 'バンバラ語',
    bn: 'ベンガル語',
    bo: 'チベット語',
    bs: 'ボスニア語',
    ca: 'カタルーニャ語・バレンシア語',
    cs: 'チェコ語',
    cu: '古代ブルガリア語',
    da: 'デンマーク語',
    de: 'ドイツ語',
    el: 'ギリシャ語',
    en: '英語',
    'en-au': '英語（オーストラリア）',
    'en-gb': '英語（イギリス）',
    'en-in': '英語（インド）',
    'en-ie': '英語（アイルランド）',
    'en-tt': '英語（トリニダード）',
    'en-us': '英語（アメリカ）',
    'en-za': '英語（南アフリカ）',
    es: 'スペイン語',
    'es-ar': 'スペイン語（アルゼンチン）',
    'es-cl': 'スペイン語（チリ）',
    'es-co': 'スペイン語（コロンビア）',
    'es-mx': 'スペイン語（メキシコ）',
    'es-pe': 'スペイン語（ペルー）',
    et: 'エストニア語',
    eu: 'バスク語',
    fa: 'ペルシャ語',
    fi: 'フィンランド語',
    fr: 'フランス語',
    'fr-ca': 'フランス語（カナダ）',
    gl: 'ガリシア語（スペイン）',
    he: 'ヘブライ語',
    hi: 'ヒンディー語',
    hr: 'クロアチア語',
    hu: 'ハンガリー語',
    id: 'インドネシア語',
    it: 'イタリア語',
    ja: '日本語',
    kk: 'カザフ語',
    kn: 'カンナダ語',
    ko: '韓国語',
    la: 'ラテン語',
    lkt: 'ラコタ語',
    mn: 'モンゴル語',
    mr: 'マラーティー語',
    nb: 'ノルウェー語（ブークモール）',
    nl: 'オランダ語',
    'nl-be': 'オランダ語（ベルギー）',
    nn: 'ノルウェー語（ニーノシュク）',
    pl: 'ポーランド語',
    ps: 'パシュトー語',
    pt: 'ポルトガル語（国際）',
    'pt-br': 'ポルトガル語（ブラジル）',
    qu: 'ケチュア語',
    ro: 'ルーマニア語',
    ru: 'ロシア語',
    sa: 'サンスクリット語',
    'sk-sk': 'スロバキア語',
    sl: 'スロベニア語',
    sma: '南サーミ語',
    smj: 'ルレ・サーミ語',
    sr: 'セルビア語',
    sv: 'スウェーデン語',
    sw: 'スワヒリ語',
    ta: 'タミル語',
    te: 'テルグ語',
    tg: 'タジク語',
    th: 'タイ語',
    tr: 'トルコ語',
    ug: 'ウイグル語',
    uk: 'ウクライナ語',
    ur: 'ウルドゥー語',
    uz: 'ウズベク語',
    vi: 'ベトナム語',
    wo: 'ウォロフ語',
    yi: 'イディッシュ語',
    yo: 'ヨルバ語',
    yua: 'ユカテク・マヤ語',
    zh: '中国語',
    'zh-cn': '中国語（中国）',
    'zh-hk': '中国語（香港）',
    'zh-tw': '中国語（台湾）',
    'zh-hans': '中国語（簡体字）',
    'zh-hant': '中国語（繁体字）',
    zu: 'ズールー語'
  },

  'ko': {
    af: '아프리칸스어',
    ak: '아칸어',
    ar: '아랍어',
    az: '아제르바이잔어',
    bg: '불가리아어',
    bho: '호즈푸리어',
    bm: '밤바라어',
    bn: '벵골어',
    bo: '티베트어',
    bs: '보스니아어',
    ca: '카탈로니아어; 발렌시아어',
    cs: '체코어',
    cu: '고대 불가리아어',
    da: '덴마크어',
    de: '독일어',
    el: '그리스어',
    en: '영어',
    'en-au': '영어 (호주)',
    'en-gb': '영어 (영국)',
    'en-in': '영어 (인도)',
    'en-ie': '영어 (아일랜드)',
    'en-tt': '영어 (트리니다드)',
    'en-us': '영어 (미국)',
    'en-za': '영어 (남아프리카)',
    es: '스페인어',
    'es-ar': '스페인어 (아르헨티나)',
    'es-cl': '스페인어 (칠레)',
    'es-co': '스페인어 (콜롬비아)',
    'es-mx': '스페인어 (멕시코)',
    'es-pe': '스페인어 (페루)',
    et: '에스토니아어',
    eu: '바스크어',
    fa: '페르시아어',
    fi: '핀란드어',
    fr: '프랑스어',
    'fr-ca': '프랑스어 (캐나다)',
    gl: '갈리시아어 (스페인)',
    he: '히브리어',
    hi: '힌디어',
    hr: '크로아티아어',
    hu: '헝가리어',
    id: '인도네시아어',
    it: '이탈리아어',
    ja: '일본어',
    kk: '카자흐어',
    kn: '칸나다어',
    ko: '한국어',
    la: '라틴어',
    lkt: '라코타어',
    mn: '몽골어',
    mr: '마라티어',
    nb: '노르웨이어 (부크몰)',
    nl: '네덜란드어',
    'nl-be': '네덜란드어 (벨기에)',
    nn: '노르웨이어 (뉘노르스크)',
    pl: '폴란드어',
    ps: '파슈토어',
    pt: '포르투갈어 (국제)',
    'pt-br': '포르투갈어 (브라질)',
    qu: '케추아어',
    ro: '루마니아어',
    ru: '러시아어',
    sa: '산스크리트어',
    'sk-sk': '슬로바키아어',
    sl: '슬로베니아어',
    sma: '남부 사미어',
    smj: '룰레 사미어',
    sr: '세르비아어',
    sv: '스웨덴어',
    sw: '스와힐리어',
    ta: '타밀어',
    te: '텔루구어',
    tg: '타지크어',
    th: '태국어',
    tr: '터키어',
    ug: '위구르어',
    uk: '우크라이나어',
    ur: '우르두어',
    uz: '우즈베크어',
    vi: '베트남어',
    wo: '월로프어',
    yi: '이디시어',
    yo: '요루바어',
    yua: '유카텍 마야어',
    zh: '중국어',
    'zh-cn': '중국어 (중국)',
    'zh-hk': '중국어 (홍콩)',
    'zh-tw': '중국어 (대만)',
    'zh-hans': '중국어 (간체)',
    'zh-hant': '중국어 (번체)',
    zu: '줄루어'
  },

  'pt': {
    af: 'Africâner',
    ak: 'Akan',
    ar: 'Árabe',
    az: 'Azerbaijano',
    bg: 'Búlgaro',
    bho: 'Bhojpuri',
    bm: 'Bambara',
    bn: 'Bengali',
    bo: 'Tibetano',
    bs: 'Bósnio',
    ca: 'Catalão; Valenciano',
    cs: 'Tcheco',
    cu: 'Búlgaro Antigo',
    da: 'Dinamarquês',
    de: 'Alemão',
    el: 'Grego',
    en: 'Inglês',
    'en-au': 'Inglês (Austrália)',
    'en-gb': 'Inglês (Reino Unido)',
    'en-in': 'Inglês (Índia)',
    'en-ie': 'Inglês (Irlanda)',
    'en-tt': 'Inglês (Trinidad)',
    'en-us': 'Inglês (Estados Unidos)',
    'en-za': 'Inglês (África do Sul)',
    es: 'Espanhol',
    'es-ar': 'Espanhol (Argentina)',
    'es-cl': 'Espanhol (Chile)',
    'es-co': 'Espanhol (Colômbia)',
    'es-mx': 'Espanhol (México)',
    'es-pe': 'Espanhol (Peru)',
    et: 'Estoniano',
    eu: 'Basco',
    fa: 'Persa',
    fi: 'Finlandês',
    fr: 'Francês',
    'fr-ca': 'Francês (Canadá)',
    gl: 'Galego',
    he: 'Hebraico',
    hi: 'Hindi',
    hr: 'Croata',
    hu: 'Húngaro',
    id: 'Indonésio',
    it: 'Italiano',
    ja: 'Japonês',
    kk: 'Cazaque',
    kn: 'Canarês',
    ko: 'Coreano',
    la: 'Latim',
    lkt: 'Lakota',
    mn: 'Mongol',
    mr: 'Marati',
    nb: 'Norueguês Bokmål',
    nl: 'Holandês',
    'nl-be': 'Holandês (Bélgica)',
    nn: 'Norueguês Nynorsk',
    pl: 'Polonês',
    ps: 'Pashto',
    pt: 'Português, Internacional',
    'pt-br': 'Português, Brasil',
    qu: 'Quíchua',
    ro: 'Romeno',
    ru: 'Russo',
    sa: 'Sânscrito',
    'sk-sk': 'Eslovaco',
    sl: 'Esloveno',
    sma: 'Sami do Sul',
    smj: 'Sami de Lule',
    sr: 'Sérvio',
    sv: 'Sueco',
    sw: 'Suaíli',
    ta: 'Tâmil',
    te: 'Telugu',
    tg: 'Tajique',
    th: 'Tailandês',
    tr: 'Turco',
    ug: 'Uigur',
    uk: 'Ucraniano',
    ur: 'Urdu',
    uz: 'Uzbeque',
    vi: 'Vietnamita',
    wo: 'Wolof',
    yi: 'Iídiche',
    yo: 'Iorubá',
    yua: 'Maia Iucateco',
    zh: 'Chinês',
    'zh-cn': 'Chinês (China)',
    'zh-hk': 'Chinês (Hong Kong)',
    'zh-tw': 'Chinês (Taiwan)',
    'zh-hans': 'Chinês Simplificado',
    'zh-hant': 'Chinês Tradicional',
    zu: 'Zulu'
  },

  'ru': {
    af: 'Африкаанс',
    ak: 'Акан',
    ar: 'Арабский',
    az: 'Азербайджанский',
    bg: 'Болгарский',
    bho: 'Бходжпури',
    bm: 'Бамбара',
    bn: 'Бенгальский',
    bo: 'Тибетский',
    bs: 'Боснийский',
    ca: 'Каталанский; Валенсийский',
    cs: 'Чешский',
    cu: 'Древнеболгарский',
    da: 'Датский',
    de: 'Немецкий',
    el: 'Греческий',
    en: 'Английский',
    'en-au': 'Английский (Австралия)',
    'en-gb': 'Английский (Великобритания)',
    'en-in': 'Английский (Индия)',
    'en-ie': 'Английский (Ирландия)',
    'en-tt': 'Английский (Тринидад)',
    'en-us': 'Английский (США)',
    'en-za': 'Английский (ЮАР)',
    es: 'Испанский',
    'es-ar': 'Испанский (Аргентина)',
    'es-cl': 'Испанский (Чили)',
    'es-co': 'Испанский (Колумбия)',
    'es-mx': 'Испанский (Мексика)',
    'es-pe': 'Испанский (Перу)',
    et: 'Эстонский',
    eu: 'Баскский',
    fa: 'Персидский',
    fi: 'Финский',
    fr: 'Французский',
    'fr-ca': 'Французский (Канада)',
    gl: 'Галисийский (Испания)',
    he: 'Иврит',
    hi: 'Хинди',
    hr: 'Хорватский',
    hu: 'Венгерский',
    id: 'Индонезийский',
    it: 'Итальянский',
    ja: 'Японский',
    kk: 'Казахский',
    kn: 'Каннада',
    ko: 'Корейский',
    la: 'Латинский',
    lkt: 'Лакота',
    mn: 'Монгольский',
    mr: 'Маратхи',
    nb: 'Норвежский букмол',
    nl: 'Нидерландский',
    'nl-be': 'Нидерландский (Бельгия)',
    nn: 'Норвежский нюнорск',
    pl: 'Польский',
    ps: 'Пушту',
    pt: 'Португальский, международный',
    'pt-br': 'Португальский, Бразилия',
    qu: 'Кечуа',
    ro: 'Румынский',
    ru: 'Русский',
    sa: 'Санскрит',
    'sk-sk': 'Словацкий',
    sl: 'Словенский',
    sma: 'Южносаамский',
    smj: 'Луле-саамский',
    sr: 'Сербский',
    sv: 'Шведский',
    sw: 'Суахили',
    ta: 'Тамильский',
    te: 'Телугу',
    tg: 'Таджикский',
    th: 'Тайский',
    tr: 'Турецкий',
    ug: 'Уйгурский',
    uk: 'Украинский',
    ur: 'Урду',
    uz: 'Узбекский',
    vi: 'Вьетнамский',
    wo: 'Волоф',
    yi: 'Идиш',
    yo: 'Йоруба',
    yua: 'Юкатекский майя',
    zh: 'Китайский',
    'zh-cn': 'Китайский (Китай)',
    'zh-hk': 'Китайский (Гонконг)',
    'zh-tw': 'Китайский (Тайвань)',
    'zh-hans': 'Китайский, упрощенный',
    'zh-hant': 'Китайский, традиционный',
    zu: 'Зулу'
  },

  'zh': {
    af: '南非荷兰语',
    ak: '阿坎语',
    ar: '阿拉伯语',
    az: '阿塞拜疆语',
    bg: '保加利亚语',
    bho: '博杰普尔语',
    bm: '班巴拉语',
    bn: '孟加拉语',
    bo: '藏语',
    bs: '波斯尼亚语',
    ca: '加泰罗尼亚语；瓦伦西亚语',
    cs: '捷克语',
    cu: '古保加利亚语',
    da: '丹麦语',
    de: '德语',
    el: '希腊语',
    en: '英语',
    'en-au': '英语（澳大利亚）',
    'en-gb': '英语（英国）',
    'en-in': '英语（印度）',
    'en-ie': '英语（爱尔兰）',
    'en-tt': '英语（特立尼达）',
    'en-us': '英语（美国）',
    'en-za': '英语（南非）',
    es: '西班牙语',
    'es-ar': '西班牙语（阿根廷）',
    'es-cl': '西班牙语（智利）',
    'es-co': '西班牙语（哥伦比亚）',
    'es-mx': '西班牙语（墨西哥）',
    'es-pe': '西班牙语（秘鲁）',
    et: '爱沙尼亚语',
    eu: '巴斯克语',
    fa: '波斯语',
    fi: '芬兰语',
    fr: '法语',
    'fr-ca': '法语（加拿大）',
    gl: '加利西亚语（西班牙）',
    he: '希伯来语',
    hi: '印地语',
    hr: '克罗地亚语',
    hu: '匈牙利语',
    id: '印度尼西亚语',
    it: '意大利语',
    ja: '日语',
    kk: '哈萨克语',
    kn: '卡纳达语',
    ko: '韩语',
    la: '拉丁语',
    lkt: '拉科塔语',
    mn: '蒙古语',
    mr: '马拉地语',
    nb: '书面挪威语',
    nl: '荷兰语',
    'nl-be': '荷兰语（比利时）',
    nn: '新挪威语',
    pl: '波兰语',
    ps: '普什图语',
    pt: '葡萄牙语（国际）',
    'pt-br': '葡萄牙语（巴西）',
    qu: '克丘亚语',
    ro: '罗马尼亚语',
    ru: '俄语',
    sa: '梵语',
    'sk-sk': '斯洛伐克语',
    sl: '斯洛文尼亚语',
    sma: '南萨米语',
    smj: '律勒萨米语',
    sr: '塞尔维亚语',
    sv: '瑞典语',
    sw: '斯瓦希里语',
    ta: '泰米尔语',
    te: '泰卢固语',
    tg: '塔吉克语',
    th: '泰语',
    tr: '土耳其语',
    ug: '维吾尔语',
    uk: '乌克兰语',
    ur: '乌尔都语',
    uz: '乌兹别克语',
    vi: '越南语',
    wo: '沃洛夫语',
    yi: '意第绪语',
    yo: '约鲁巴语',
    yua: '尤卡坦玛雅语',
    zh: '中文',
    'zh-cn': '中文（中国）',
    'zh-hk': '中文（香港）',
    'zh-tw': '中文（台湾）',
    'zh-hans': '中文（简体）',
    'zh-hant': '中文（繁体）',
    zu: '祖鲁语'
  },

  'zh-hans': {
    af: '南非荷兰语',
    ak: '阿坎语',
    ar: '阿拉伯语',
    az: '阿塞拜疆语',
    bg: '保加利亚语',
    bho: '博杰普尔语',
    bm: '班巴拉语',
    bn: '孟加拉语',
    bo: '藏语',
    bs: '波斯尼亚语',
    ca: '加泰罗尼亚语；瓦伦西亚语',
    cs: '捷克语',
    cu: '古保加利亚语',
    da: '丹麦语',
    de: '德语',
    el: '希腊语',
    en: '英语',
    'en-au': '英语（澳大利亚）',
    'en-gb': '英语（英国）',
    'en-in': '英语（印度）',
    'en-ie': '英语（爱尔兰）',
    'en-tt': '英语（特立尼达）',
    'en-us': '英语（美国）',
    'en-za': '英语（南非）',
    es: '西班牙语',
    'es-ar': '西班牙语（阿根廷）',
    'es-cl': '西班牙语（智利）',
    'es-co': '西班牙语（哥伦比亚）',
    'es-mx': '西班牙语（墨西哥）',
    'es-pe': '西班牙语（秘鲁）',
    et: '爱沙尼亚语',
    eu: '巴斯克语',
    fa: '波斯语',
    fi: '芬兰语',
    fr: '法语',
    'fr-ca': '法语（加拿大）',
    gl: '加利西亚语（西班牙）',
    he: '希伯来语',
    hi: '印地语',
    hr: '克罗地亚语',
    hu: '匈牙利语',
    id: '印度尼西亚语',
    it: '意大利语',
    ja: '日语',
    kk: '哈萨克语',
    kn: '卡纳达语',
    ko: '韩语',
    la: '拉丁语',
    lkt: '拉科塔语',
    mn: '蒙古语',
    mr: '马拉地语',
    nb: '书面挪威语',
    nl: '荷兰语',
    'nl-be': '荷兰语（比利时）',
    nn: '新挪威语',
    pl: '波兰语',
    ps: '普什图语',
    pt: '葡萄牙语（国际）',
    'pt-br': '葡萄牙语（巴西）',
    qu: '克丘亚语',
    ro: '罗马尼亚语',
    ru: '俄语',
    sa: '梵语',
    'sk-sk': '斯洛伐克语',
    sl: '斯洛文尼亚语',
    sma: '南萨米语',
    smj: '律勒萨米语',
    sr: '塞尔维亚语',
    sv: '瑞典语',
    sw: '斯瓦希里语',
    ta: '泰米尔语',
    te: '泰卢固语',
    tg: '塔吉克语',
    th: '泰语',
    tr: '土耳其语',
    ug: '维吾尔语',
    uk: '乌克兰语',
    ur: '乌尔都语',
    uz: '乌兹别克语',
    vi: '越南语',
    wo: '沃洛夫语',
    yi: '意第绪语',
    yo: '约鲁巴语',
    yua: '尤卡坦玛雅语',
    zh: '中文',
    'zh-cn': '中文（中国）',
    'zh-hk': '中文（香港）',
    'zh-tw': '中文（台湾）',
    'zh-hans': '简体中文',
    'zh-hant': '繁体中文',
    zu: '祖鲁语'
  },

  'zh-tw': {
    af: '南非荷蘭語',
    ak: '阿坎語',
    ar: '阿拉伯語',
    az: '亞塞拜然語',
    bg: '保加利亞語',
    bho: '博傑普爾語',
    bm: '班巴拉語',
    bn: '孟加拉語',
    bo: '藏語',
    bs: '波士尼亞語',
    ca: '加泰羅尼亞語；瓦倫西亞語',
    cs: '捷克語',
    cu: '古保加利亞語',
    da: '丹麥語',
    de: '德語',
    el: '希臘語',
    en: '英語',
    'en-au': '英語（澳大利亞）',
    'en-gb': '英語（英國）',
    'en-in': '英語（印度）',
    'en-ie': '英語（愛爾蘭）',
    'en-tt': '英語（特立尼達）',
    'en-us': '英語（美國）',
    'en-za': '英語（南非）',
    es: '西班牙語',
    'es-ar': '西班牙語（阿根廷）',
    'es-cl': '西班牙語（智利）',
    'es-co': '西班牙語（哥倫比亞）',
    'es-mx': '西班牙語（墨西哥）',
    'es-pe': '西班牙語（秘魯）',
    et: '愛沙尼亞語',
    eu: '巴斯克語',
    fa: '波斯語',
    fi: '芬蘭語',
    fr: '法語',
    'fr-ca': '法語（加拿大）',
    gl: '加利西亞語（西班牙）',
    he: '希伯來語',
    hi: '印地語',
    hr: '克羅埃西亞語',
    hu: '匈牙利語',
    id: '印尼語',
    it: '義大利語',
    ja: '日語',
    kk: '哈薩克語',
    kn: '坎納達語',
    ko: '韓語',
    la: '拉丁語',
    lkt: '拉科塔語',
    mn: '蒙古語',
    mr: '馬拉地語',
    nb: '挪威語書面語',
    nl: '荷蘭語',
    'nl-be': '荷蘭語（比利時）',
    nn: '挪威語新挪威語',
    pl: '波蘭語',
    ps: '普什圖語',
    pt: '葡萄牙語（國際）',
    'pt-br': '葡萄牙語（巴西）',
    qu: '克丘亞語',
    ro: '羅馬尼亞語',
    ru: '俄語',
    sa: '梵語',
    'sk-sk': '斯洛伐克語',
    sl: '斯洛維尼亞語',
    sma: '南薩米語',
    smj: '呂勒薩米語',
    sr: '塞爾維亞語',
    sv: '瑞典語',
    sw: '斯瓦希里語',
    ta: '泰米爾語',
    te: '泰盧固語',
    tg: '塔吉克語',
    th: '泰語',
    tr: '土耳其語',
    ug: '維吾爾語',
    uk: '烏克蘭語',
    ur: '烏爾都語',
    uz: '烏茲別克語',
    vi: '越南語',
    wo: '沃洛夫語',
    yi: '意第緒語',
    yo: '約魯巴語',
    yua: '尤卡坦馬雅語',
    zh: '中文',
    'zh-cn': '中文（中國）',
    'zh-hk': '中文（香港）',
    'zh-tw': '中文（台灣）',
    'zh-hans': '中文（簡體）',
    'zh-hant': '中文（繁體）',
    zu: '祖魯語'
  },

  'zh-hant': {
    af: '南非語',
    ak: '阿坎語',
    ar: '阿拉伯語',
    az: '亞塞拜然語',
    bg: '保加利亞語',
    bho: '博杰普爾語',
    bm: '班巴拉語',
    bn: '孟加拉語',
    bo: '藏語',
    bs: '波斯尼亞語',
    ca: '加泰羅尼亞語；瓦倫西亞語',
    cs: '捷克語',
    cu: '古保加利亞語',
    da: '丹麥語',
    de: '德語',
    el: '希臘語',
    en: '英語',
    'en-au': '英語（澳大利亞）',
    'en-gb': '英語（英國）',
    'en-in': '英語（印度）',
    'en-ie': '英語（愛爾蘭）',
    'en-tt': '英語（特立尼達）',
    'en-us': '英語（美國）',
    'en-za': '英語（南非）',
    es: '西班牙語',
    'es-ar': '西班牙語（阿根廷）',
    'es-cl': '西班牙語（智利）',
    'es-co': '西班牙語（哥倫比亞）',
    'es-mx': '西班牙語（墨西哥）',
    'es-pe': '西班牙語（秘魯）',
    et: '愛沙尼亞語',
    eu: '巴斯克語',
    fa: '波斯語',
    fi: '芬蘭語',
    fr: '法語',
    'fr-ca': '法語（加拿大）',
    gl: '加利西亞語（西班牙）',
    he: '希伯來語',
    hi: '印地語',
    hr: '克羅地亞語',
    hu: '匈牙利語',
    id: '印尼語',
    it: '義大利語',
    ja: '日語',
    kk: '哈薩克語',
    kn: '卡納達語',
    ko: '韓語',
    la: '拉丁語',
    lkt: '拉科塔語',
    mn: '蒙古語',
    mr: '馬拉地語',
    nb: '書面挪威語',
    nl: '荷蘭語',
    'nl-be': '荷蘭語（比利時）',
    nn: '新挪威語',
    pl: '波蘭語',
    ps: '普什圖語',
    pt: '葡萄牙語（國際）',
    'pt-br': '葡萄牙語（巴西）',
    qu: '克丘亞語',
    ro: '羅馬尼亞語',
    ru: '俄語',
    sa: '梵語',
    'sk-sk': '斯洛伐克語',
    sl: '斯洛維尼亞語',
    sma: '南薩米語',
    smj: '律勒薩米語',
    sr: '塞爾維亞語',
    sv: '瑞典語',
    sw: '斯瓦希里語',
    ta: '泰米爾語',
    te: '泰盧固語',
    tg: '塔吉克語',
    th: '泰語',
    tr: '土耳其語',
    ug: '維吾爾語',
    uk: '烏克蘭語',
    ur: '烏爾都語',
    uz: '烏茲別克語',
    vi: '越南語',
    wo: '沃洛夫語',
    yi: '意第緒語',
    yo: '約魯巴語',
    yua: '尤卡坦瑪雅語',
    zh: '中文',
    'zh-cn': '中文（中國）',
    'zh-hk': '中文（香港）',
    'zh-tw': '中文（台灣）',
    'zh-hans': '簡體中文',
    'zh-hant': '繁體中文',
    zu: '祖魯語'
  }
};

   // Helper function to get translation string with fallback hierarchy
  function getLanguageNameForLocale(langCode, localeLangCode=editorLanguage) {
    
    if(!langCode) return '';
    langCode=langCode.toLowerCase().trim();

    // Try the full language code first (e.g., 'es-MX')
    if (languageNames[localeLangCode]?.[langCode]) {
      return languageNames[localeLangCode][langCode];
    }
    
    // If not found and there's a hyphen, try the primary language code (e.g., 'es')
    const primaryLangCode = localeLangCode.split('-')[0];
    if (localeLangCode.includes('-') && languageNames[primaryLangCode]?.[langCode]) {
      return languageNames[primaryLangCode][langCode];
    }
    
    // Fall back to English if available
    if (languageNames['en']?.[langCode]) {
      return languageNames['en'][langCode];
    }
    
    return '';
  }

  // Used for selector lists
  function getLanguageCodeDescription(langCode, localeLangCode=editorLanguage) {
    let langCodeLanguageNameForLocale = getLanguageNameForLocale(langCode, localeLangCode);
    let nativeLangName = langAtts[langCode];

    console.log(`GLCD: ${langCode} ${localeLangCode} ${langCodeLanguageNameForLocale} ${nativeLangName}`);


    if(langCodeLanguageNameForLocale && langCodeLanguageNameForLocale !== nativeLangName) {
      return `${nativeLangCodeLanguageName} (${nativeLangName})`;
    } else if(nativeLangName) {
      return nativeLangName;
    }
    return langCode;
  }

  // Used for menu entries
  function getShortLanguageCodeDescription(langCode, localeLangCode=editorLanguage) {
    let langCodeLanguageNameForLocale = getLanguageNameForLocale(langCode, localeLangCode);
    let nativeLangName = langAtts[langCode];

    console.log(`GSLCD: ${langCode} ${localeLangCode} ${langCodeLanguageNameForLocale} ${nativeLangName}`);
    
    if(langCodeLanguageNameForLocale && langCodeLanguageNameForLocale !== nativeLangName) {
      return langCodeLanguageNameForLocale;
    } else if(nativeLangName) {
      return nativeLangName;
    }
    return langCode;
  }

  /**
   * Opens a dialog for selecting or entering a default language for the document.
   *
   * @param {string} currentLang - The current language code of the document (e.g., "en-US").
   * @param {Function} callBack - A callback function that is invoked with the new language code selected by the user.
   */
  const openChooseDefaultLangDialog = (currentLang = "", callBack) => {
    let initialLanguageValue = currentLang || editorLanguage;
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
        let langCodeLanguageNameForLocale = getLanguageNameForLocale(langCode, editorLanguage);

        if(langCodeLanguageNameForLocale && langCodeLanguageNameForLocale !== langDesc) {
          langDesc = `${langCodeLanguageNameForLocale} (${langDesc})`
        } 
        if (Object.prototype.hasOwnProperty.call(langAtts, langCode)) {
          languages.push({
            value: langCode,
            text: `${langDesc}: "${cleanLangAttr(langCode)}"`, // Show language description and cleaned code
          });
        }
      });

    // Open the dialog using TinyMCE's windowManager API
    editor.windowManager.open({
      title: translate('selectDocDefaultLang'), // Dialog title
      body: {
        type: "tabpanel",
        tabs: [
          {
            name: "listTab1", // First tab for selecting a language from a list
            title: translate('chooseFromList'),
            items: [
              {
                type: "htmlpanel",
                html: `<div style="margin-bottom:10px">Current language: ${
                  getLanguageCodeDescription(currentLang) // Display current language or code if not in langAtts
                }</div>`,
              },
              {
                type: "selectbox",
                name: "language",
                label: translate('newLanguage'),
                items: languages, // Use the sorted languages array for options
              },
            ],
          },
          {
            name: "listTab2", // Second tab for manually entering a language code
            title: translate('enterManually'),
            items: [
              {
                type: "htmlpanel",
                html: `<div style="margin-bottom:10px">Current language: ${
                  getLanguageCodeDescription(currentLang) // Display current language or code
                }</div>`,
              },
              {
                type: "input",
                name: "manualLanguage",
                label: translate('enterLangCode'),
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
      { value: "-n-", text: translate('none') }, // Option to select "None"
      { value: "-o-", text: translate('otherEnterManually') }, // Option to enter manually
    ];

    // Populate the language options by sorting langAtts alphabetically by description.
    Object.entries(langAtts)
      .sort(([codeA, descA], [codeB, descB]) =>
        descA.toLowerCase().localeCompare(descB.toLowerCase())
      )
      .forEach(([langCode, langDesc]) => {
        if (Object.prototype.hasOwnProperty.call(langAtts, langCode)) {
          let langCodeLanguageNameForLocale = getLanguageNameForLocale(langCode, editorLanguage);
          if(langCodeLanguageNameForLocale && langCodeLanguageNameForLocale !== langDesc) {
            langDesc = `${langCodeLanguageNameForLocale} (${langDesc})`
          } 
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
        html: `<div style="margin-bottom:10px">${translate('chooseUpToSix')}</div>`,
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
            label: `${translate('languageSelect')} ${langCounter}:`,
            items: languages, // Use the languages array for selection options
          },
          {
            type: "input",
            name: `langInput_${langCounter}`,
            label: `${translate('manualLanguageEntry')} ${langCounter}:`,
            disabled: Object.prototype.hasOwnProperty.call(langAtts, lang), // Disable input if language is predefined (pre v7)
            enabled: !Object.prototype.hasOwnProperty.call(langAtts, lang), // Disable input if language is predefined
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
            label: `${translate('languageSelect')} ${langCounter}:`,
            items: languages,
          },
          {
            type: "input",
            name: `langInput_${langCounter}`,
            label: `${translate('manualLanguageEntry')} ${langCounter}:`,
            disabled: true, // Initially disabled as no manual input is expected. (pre v7)
            enabled: false,
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
      title: translate('chooseLanguages'), // Dialog title
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
      onSubmit(dialogApi) {
        const data = dialogApi.getData();
        const selectedLangs = [];

        // Validate language selections and manual entries
        for (let i = 1; i <= 6; i++) {
          const selectedLang = data[`langSelect_${i}`];
          const manualLang = data[`langInput_${i}`]?.trim();

          if (selectedLang === "-o-" && !regexValidLangValue.test(manualLang)) {
            alert(
              translate('invalidLangCode')
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
      title: translate('helpTitle'),
      body: {
        type: "panel",
        items: [
          {
            type: "htmlpanel",
            html: translate('helpContent'),
          },
        ],
      },
      buttons: [
        {
          type: "submit",
          text: "OK",
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
    if (!confirm(translate('confirmRemoveAll')))
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
    console.log(`registerFormat: received "${lang}"`);
    lang = cleanLangAttr(lang);
    console.log(`registerFormat: cleaned to "${lang}"`);

    // Define a unique format name based on the language code
    const formatToApply = "setLangTo_" + lang;
    console.log(`registerFormat: formatToApply is "${formatToApply}", now register it`);

    // Register the new format with TinyMCE
    editor.formatter.register(formatToApply, {
      inline: "span",
      attributes: {
        lang: lang,
        class: "langMarkUp",
      },
    });
    console.log(`registerFormat: registered "${formatToApply}"`);

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
    console.log(`setDocLangTo: received lang: ${lang}`);
    lang = cleanLangAttr(lang);
    console.log(`setDocLangTo: cleaned lang: ${lang}`);
    const formatToApply = `setLangTo_${lang}`;

    console.log(`setDocLangTo: formatToApply: ${formatToApply}`);

    // Ensure the format is registered before applying
    if (!langFormatsRegistered.hasOwnProperty(formatToApply)) {
       console.log(`setDocLangTo: registerFormat: ${lang}`);
      registerFormat(lang);
    }

    console.log(`setDocLangTo: editor.focus`);
    editor.focus();

    console.log(`setDocLangTo: enter undo transaction`);

    // Apply the format within an undo transaction
    editor.undoManager.transact(() => {
      console.log(`setDocLangTo: apply format ${formatToApply}`);
      editor.formatter.apply(formatToApply);
    });

    console.log(`setDocLangTo: post apply, refreshQaStyles`);

    // Refresh the QA styles to reflect the new language format
    refreshQaStyles();
    console.log(`setDocLangTo: post refreshQaStyles, exit`);
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
            button.getAttribute("aria-label") === translate('setTextLanguage') ||
            button.getAttribute("title") === translate('setTextLanguage');

          if (isTextLanguageButton) {
            // Store the reference to the text node inside the button
            myButtonTextPtr = button.firstElementChild;
            myButtonTextPtr.style = "width:10em;overflow:hidden;display:block";
            myButtonTextPtr.originalHTML = button.firstElementChild.innerHTML;
          }
        });
      }

      // If the button was found, update its text with the new language or fallback to the default
      if (myButtonTextPtr) {
        if(showCurrentLangCodeOnly) {
          if(newLang) {
            myButtonTextPtr.innerText = newLang || null;
          } else {
            myButtonTextPtr.innerHTML = myButtonTextPtr.originalHTML;
          }
        } else {
          myButtonTextPtr.innerText =
          getShortLanguageCodeDescription(newLang.toLowerCase()) || newLang || translate('languageNotSet');
        }
      }
    } catch (ex) {
      // ignore errors
    }
  }

  const initializeLanguageMenuEntriesList = () => {
    // Initialize language menu items if they are not already populated
    if (langMenuItems.length < 1) {
      const sortedArrayOfLangs = analyzeEditorDocumentLangUsage(); // Analyze current language usage in the document

      // Add the default language of the page holding the editor if valid
      if (
        regexValidLangValue.test(editorLanguage) &&
        !langMenuItems.includes(editorLanguage.toLowerCase())
      ) {
        langMenuItems.push(editorLanguage.toLowerCase());
      }

      // Populate the menu with up to 6 most-used languages in the document
      sortedArrayOfLangs.forEach((lang) => {
        lang = lang.toLowerCase();
        if (langMenuItems.length < 6 && !langMenuItems.includes(lang)) {
          langMenuItems.push(lang);
        }
      });

      // Add configured default languages if not already in the list
      defaultLanguages.forEach((lang) => {
        lang = lang.toLowerCase();
        if (langMenuItems.length < 6 && !langMenuItems.includes(lang)) {
          langMenuItems.push(lang);
        }
      });
    }
  };

  const buildEasyLangMenuItems = (callback) => {
    const items = []; // Array to hold menu items

    initializeLanguageMenuEntriesList();

    // Create menu items for each language in langMenuItems
    langMenuItems.forEach((lang, index) => {
      items.push({
        type: "menuitem",
        text: getShortLanguageCodeDescription(lang.toLowerCase()) || cleanLangAttr(lang), // Display language name
        shortcut: enableKeyboardShortcuts ? `meta+Shift+${index+1}` : null,
        onAction: function () {
          console.log(`langMenuItem onAction: ${lang}`);
          setDocLangTo(lang); // Set document language to selected value
        },
      });
    });

    // Add nested menu item for removing language markup
    items.push({
      type: "nestedmenuitem",
      text: translate('removeLanguageMarkup'),
      icon: "remove",
      disabled: false,
      getSubmenuItems: function () {
        return [
          {
            type: "menuitem",
            text: translate('removeCurrentLang'),
            icon: "remove",
            onAction: function () {
              removeLangMarkupAtCursor(); // Remove language markup at cursor
            },
          },
          {
            type: "menuitem",
            text: translate('removeAllLang'),
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
      text: translate('configureLanguages'),
      onAction: function () {
        let currentLang = "";
        const editorBody = editor.getDoc().body;

        // Check if the body has a lang attribute and set currentLang accordingly
        if (
          editorBody.children.length === 1 &&
          editorBody.firstElementChild.hasAttribute("lang")
        ) {
          currentLang =
            cleanLangAttr(editorBody.firstElementChild.getAttribute("lang")) ||
            currentLang;
        }

        // Open the configuration dialog for languages
        openConfigureLanguagesOnSelectbox(langMenuItems, (newLangMenuItems) => {
          langMenuItems = newLangMenuItems;
        });
      },
    });

    // Add item to set default document language
    items.push({
      type: "menuitem",
      icon: "document-properties",
      text: translate('setDefaultDocLang'),
      onAction: function () {
        let currentLang = "";
        const editorBody = editor.getDoc().body;

        // Get current document language if set
        if (
          editorBody.children.length === 1 &&
          editorBody.firstElementChild.hasAttribute("lang")
        ) {
          currentLang =
            cleanLangAttr(editorBody.firstElementChild.getAttribute("lang")) ||
            currentLang;
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
      text: translate('revealLangMarkup'),
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

    if(!showCurrentLanguage) {
      // Toggle item for revealing/hiding language markup
      items.push({
        type: "togglemenuitem",
        text: 'View lang',
        icon: "language",
        onAction: function () {
          showCurrentLanguage = !showCurrentLanguage;
          showCurrentLangCodeOnly = true; // Not enough room to show language name
          if (showCurrentLanguage) {
            updateLanguageSelector(); // Show current language in toolbar
          } else {
          // hideLangMarkUp(); // Hide language markup
          }
        },
        onSetup: function (api) {
          api.setActive(showCurrentLanguage); // Set active state based on current view
          return function () {}; // Return a teardown function (optional)
        },
      });
    }







    // Add help menu item for language attribute editing
    items.push({
      type: "menuitem",
      icon: "help",
      text: translate('helpWithLang'),
      onAction: function () {
        openLangAttsHelp(); // Open help dialog for language attribute editing
      },
    });

    if (callback) {
      callback(items); // Execute callback with the built menu items
    } else {
      return items;
    }
  };

  const addKeyboardShortcuts = () => {
    if(enableKeyboardShortcuts && keyboardShortCuts && keyboardShortCuts.length>0) {
      keyboardShortCuts.forEach((shortcut, index) => {
        shortcut = shortcut.trim();
        if(shortcut>"") {
          const langNumber = index+1;
          const commandName = `setLanguageShortcut${langNumber}`;
          // Define a custom command
          editor.addCommand(commandName, function() {
            setDocLangTo(langMenuItems[index]); // Set document language to selected value
          });

          // Assign the keyboard shortcut Ctrl+Shift+1 to the command
          editor.addShortcut(shortcut, `Apply Language ${langNumber}`, commandName);
        }
      });
    }
  }

  editor.ui.registry.addIcon(
    "easyLangIcon",
    '<svg width="24" height="24"><g><path d="M10.9,8.1v1.7L5.1,7.2V5.8l5.9-2.6v1.7L6.8,6.5L10.9,8.1z"/><path d="M18.9,7.2l-5.9,2.6V8.2l4.1-1.6l-4.1-1.6V3.3l5.9,2.5V7.2z"/></g><g><path d="M0.2,19.8v-6.9c0-0.3,0.1-0.6,0.2-0.7s0.3-0.2,0.6-0.2s0.4,0.1,0.6,0.2s0.2,0.4,0.2,0.7v6.9c0,0.3-0.1,0.6-0.2,0.7 S1.3,20.8,1,20.8c-0.2,0-0.4-0.1-0.6-0.3S0.2,20.2,0.2,19.8z"/><path d="M7.5,19.9c-0.4,0.3-0.8,0.5-1.1,0.7s-0.8,0.2-1.2,0.2c-0.4,0-0.8-0.1-1.1-0.2s-0.5-0.4-0.7-0.7S3.1,19.3,3.1,19 c0-0.4,0.1-0.8,0.4-1.1s0.7-0.5,1.1-0.6c0.1,0,0.4-0.1,0.8-0.2s0.7-0.2,1-0.2s0.6-0.2,0.9-0.2c0-0.4-0.1-0.7-0.3-0.9 s-0.5-0.3-0.9-0.3c-0.4,0-0.7,0.1-0.9,0.2s-0.4,0.3-0.5,0.5s-0.2,0.4-0.3,0.4s-0.2,0.1-0.4,0.1c-0.2,0-0.3-0.1-0.5-0.2 S3.4,16.2,3.4,16c0-0.3,0.1-0.6,0.3-0.8s0.5-0.5,0.9-0.7s0.9-0.3,1.6-0.3c0.7,0,1.3,0.1,1.7,0.2s0.7,0.4,0.9,0.8S9,16.2,9,16.8 c0,0.4,0,0.7,0,1s0,0.6,0,0.9c0,0.3,0,0.6,0.1,0.9s0.1,0.5,0.1,0.6c0,0.2-0.1,0.3-0.2,0.4s-0.3,0.2-0.5,0.2c-0.2,0-0.3-0.1-0.5-0.2 S7.7,20.2,7.5,19.9z M7.4,17.6c-0.2,0.1-0.6,0.2-1,0.3S5.7,18,5.5,18.1S5.1,18.2,5,18.3s-0.2,0.3-0.2,0.5c0,0.2,0.1,0.4,0.3,0.6 s0.4,0.3,0.7,0.3c0.3,0,0.6-0.1,0.9-0.2s0.5-0.3,0.6-0.5c0.1-0.2,0.2-0.6,0.2-1.2V17.6z"/><path d="M12.1,15.2v0.2c0.3-0.4,0.6-0.6,0.9-0.8s0.7-0.3,1.2-0.3c0.4,0,0.8,0.1,1.1,0.3s0.6,0.4,0.7,0.8c0.1,0.2,0.2,0.4,0.2,0.6 s0,0.5,0,0.9v3c0,0.3-0.1,0.6-0.2,0.7s-0.3,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.3s-0.2-0.4-0.2-0.7v-2.7c0-0.5-0.1-0.9-0.2-1.2 s-0.4-0.4-0.9-0.4c-0.3,0-0.5,0.1-0.8,0.3s-0.4,0.4-0.5,0.7c-0.1,0.2-0.1,0.7-0.1,1.3v2c0,0.3-0.1,0.6-0.2,0.7s-0.3,0.2-0.6,0.2 c-0.2,0-0.4-0.1-0.6-0.3s-0.2-0.4-0.2-0.7v-4.6c0-0.3,0.1-0.5,0.2-0.7s0.3-0.2,0.5-0.2c0.1,0,0.3,0,0.4,0.1s0.2,0.2,0.3,0.3 S12.1,15,12.1,15.2z"/><path d="M23.8,15.5v4.6c0,0.5-0.1,1-0.2,1.4s-0.3,0.7-0.5,0.9s-0.6,0.4-1,0.6s-0.9,0.2-1.5,0.2c-0.6,0-1-0.1-1.5-0.2 s-0.8-0.4-1-0.6s-0.4-0.5-0.4-0.8c0-0.2,0.1-0.4,0.2-0.5s0.3-0.2,0.5-0.2c0.2,0,0.4,0.1,0.6,0.3c0.1,0.1,0.2,0.2,0.3,0.3 s0.2,0.2,0.3,0.3S19.8,22,20,22s0.3,0.1,0.5,0.1c0.4,0,0.7-0.1,1-0.2s0.4-0.3,0.5-0.5s0.1-0.4,0.2-0.7s0-0.6,0-1.1 c-0.2,0.3-0.5,0.6-0.9,0.8s-0.7,0.3-1.2,0.3c-0.5,0-1-0.1-1.4-0.4s-0.7-0.7-0.9-1.1s-0.3-1.1-0.3-1.7c0-0.5,0.1-0.9,0.2-1.3 s0.3-0.7,0.6-1s0.5-0.5,0.8-0.6s0.7-0.2,1-0.2c0.5,0,0.8,0.1,1.2,0.3s0.6,0.4,0.9,0.8v-0.2c0-0.3,0.1-0.5,0.2-0.6s0.3-0.2,0.5-0.2 c0.3,0,0.5,0.1,0.6,0.3S23.8,15.1,23.8,15.5z M19.1,17.5c0,0.6,0.1,1.1,0.4,1.5s0.6,0.5,1.1,0.5c0.3,0,0.5-0.1,0.8-0.2 s0.4-0.4,0.6-0.6s0.2-0.6,0.2-1c0-0.7-0.1-1.2-0.4-1.5s-0.7-0.5-1.1-0.5c-0.5,0-0.8,0.2-1.1,0.5S19.1,16.9,19.1,17.5z"/></g></svg>'
  );

  // Check for custom configuration settings in editor.settings from the tinyMCE.init
  (() => {
    if (!(editor && editor.getParam)) return;

    editorLanguage = getCurrentEditorLanguage();

    const new_icon_name = editor.getParam("easylang_icon");
    if (new_icon_name) {
      const icons = editor.ui.registry.getAll().icons;
      if (icons.hasOwnProperty(new_icon_name)) {
        iconName = new_icon_name;
      }
    }

    showCurrentLanguage = editor.getParam('easylang_show_current_language') === true;
    
    enableKeyboardShortcuts = !(editor.getParam('easylang_enable_keyboard_shortcuts') === false);
    if(enableKeyboardShortcuts) {
      addKeyboardShortcuts();
    }

    const content_langs = editor.getParam("content_langs");
    if (content_langs && content_langs.length > 0) {
      const newDefaultLanguages = [];
      content_langs.forEach((language) => {
        if (regexValidLangValue.test(language.code)) {
          let newCode = language.code.toLowerCase();
          newDefaultLanguages.push(newCode);
          let newLanguageTitle = (language.title || "").trim();
          if (newLanguageTitle) {
            langAtts[newCode] = newLanguageTitle || newCode;
          }
        }
      });
      if (newDefaultLanguages.length > 0) {
        defaultLanguages = newDefaultLanguages;
      }
    }
  })();


  editor.ui.registry.addNestedMenuItem("easyLangMenu", {
    text: "Language",
    getSubmenuItems: function () {
      return buildEasyLangMenuItems();
    },
  });

  // Register a new menu button for selecting language in the TinyMCE editor
  editor.ui.registry.addMenuButton("languageSelector", {
    text: showCurrentLanguage ? translate('languageNotSet') : null, // Default text for the button when no language is set
    icon: showCurrentLanguage ? null : (iconName || "easyLangIcon"),
    tooltip: translate('setTextLanguage'), // Tooltip for the button
    fetch: function (callback) {
      buildEasyLangMenuItems(callback);
    },

    // Setup event listeners for the button
    onSetup: function (buttonApi) {
      const editorEventCallback = function (eventApi) {
        let [lastCurrentLang] = getDocumentElementLang(eventApi.element); // Get current document language
        if(showCurrentLanguage) updateLanguageSelector(lastCurrentLang); // Update button text based on the current language
        buttonApi.setActive(lastCurrentLang > "");
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
