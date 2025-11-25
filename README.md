# TinyMCE Language Selector Plugin

This plugin provides an easy-to-use interface for users to add/edit language attributes (`lang="[lang_code]"`) 
in TinyMCE editor content. It helps content authors meet WCAG accessibility requirements for indicating 
document language and language changes within content.

## Features

- Set document-wide default language
- Apply language attributes to selected text
- Quick access to commonly used languages and languages available are user configurable
- Automatically scans existing documents for languages used within it
- Provides visual highlighting of language-marked sections for easy verification
- Keyboard shortcuts for applying language markup
- Remove language markup from selections or entire document

## Demo

To see the plugin in action, see the [TinyMCE Language Plugin Development (TinyMCE Version 7.4.0)](https://brichwin.pages.iu.edu/tests/tinyMCE-lang-plugins/examples_7.4.0/basic-tinyMCE-langs-canvas.html)

## Build

To build the TinyMCE Language Selector plugin from source:

### 1. Clone the repository

```
git clone https://github.com/indiana-university/easy-lang-markup-tinymce-plugin.git
cd easy-lang-markup-tinymce-plugin
```

### 2. Install dependencies

Install all dependencies listed in package.json. The dependencies are only
needed for the build process:

```
npm install
```

### 3. Build the plugin

Run the build:

```
npm run build
```

The build process makes two versions: one for production and one that exposes 
functions for the tests. Outputs appear in:

```
dist/

├── plugin_for_tests
│   ├── plugin_types.ts
│   └── plugin-for-tests.ts
└── plugins
    └── languageSelect
        ├── langs
        │   ├── ar_SA.js
        │   ├── ar.js
...
        │   ├── zh_TW.js
        │   └── zh.js
        └── plugin.min.js
```

### 4. Optional: Run tests

```
npm test
```

## Installation

1. Copy the `./dist/plugins/languageSelect` folder to your TinyMCE plugins directory:
```
your-project/
  tinymce/
    plugins/
      languageSelect/
        ├── langs
        │   ├── ar_SA.js
        │   ├── ar.js
...
        │   ├── zh_TW.js
        │   └── zh.js
        └── plugin.min.js
```

2. Add the plugin, toolbar button, and menu entry to your TinyMCE configuration:
```javascript
tinymce.init({
  selector: 'textarea',  // change to match your selector
  plugins: 'languageSelect',
  toolbar: 'languageSelector',
  "menu": {
    // ... other menu options ...
    "format": {
      "title": "Format",
      "items": "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | easyLangMenu | removeformat"
    },
    // ... other menu options ...
  }
});
```

For detailed plugin installation instructions, see [TinyMCE's Plugin Documentation](https://www.tiny.cloud/docs/tinymce/6/creating-a-plugin/).

## Configuration Options

The plugin supports several initialization options:

```javascript
tinymce.init({
  // ... other options ...
  easylang_icon: 'custom-icon-name',  // Use a custom icon
  easylang_show_current_language: true,  // Show language text instead of icon
  easylang_enable_keyboard_shortcuts: true,  // Enable keyboard shortcuts
  easylang_default_document_language: 'en-US',  // Set default document language
  content_langs: [  // Define available languages
    { code: 'en-US', title: 'English (US)' },
    { code: 'es', title: 'Spanish' }
  ]
});
```

## TinyMCE API Features Used

This plugin utilizes the following TinyMCE APIs:

- [Editor UI Registry](https://www.tiny.cloud/docs/tinymce/6/ui-components/)
  - `editor.ui.registry.addMenuButton()`
  - `editor.ui.registry.addNestedMenuItem()`
  - `editor.ui.registry.addIcon()`

- [Editor Commands](https://www.tiny.cloud/docs/tinymce/6/commands/)
  - `editor.addCommand()`
  - `editor.addShortcut()`

- [Formatting API](https://www.tiny.cloud/docs/tinymce/6/formatter/)
  - `editor.formatter.register()`
  - `editor.formatter.apply()`

- [Editor Core](https://www.tiny.cloud/docs/tinymce/6/editor-instance/)
  - `editor.getDoc()`
  - `editor.getBody()`
  - `editor.getParam()`
  - `editor.focus()`

- [Window Manager](https://www.tiny.cloud/docs/tinymce/6/dialog/)
  - `editor.windowManager.open()`

- [Events](https://www.tiny.cloud/docs/tinymce/6/events/)
  - `NodeChange`
  - `SetContent`
  - `Focus`

## Accessibility Features

- This plugin helps tinyMCE acchieve [ATAG](https://www.w3.org/WAI/standards-guidelines/atag/) 
  compliance by helping authors produce accessible multilingual content.
- This plugin helps authors produce [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) 
  compliant content by:
    - Ensuring proper language attribute (`lang`) usage which supports screen reading 
      software with correct language pronunciation
    - Optionally provides keyboard shortcuts for common operations
    - Makes verifying language change markup easy by making them visually apparent 
      with optional highlighting

## Internationalization (i18n) Notes

All of the translation keys are discoverable by searching `./src/plugin.ts` for `.translate(key)`.
See [./docs/i18n_notes.md](./docs/i18n_notes.md) for details.

## License

[GPL-3.0 license](https://www.gnu.org/licenses/gpl-3.0.en.html)

Copyright (C) 2012 The Trustees of Indiana University

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for 
guidelines.

## Support

For issues related to the plugin, please contact [brichwin@iu.edu](mailto:brichwin@iu.edu).

For TinyMCE-specific questions, refer to the [TinyMCE Documentation](https://www.tiny.cloud/docs/).
