# TinyMCE Language Selector Plugin

This plugin provides an easy-to-use interface for managing language attributes (`lang="[lang_code]"`) in TinyMCE editors. It helps content authors meet WCAG accessibility requirements for indicating document language and language changes within content.

## Features

- Set document-wide default language
- Apply language attributes to selected text
- Quick access to commonly used languages
- Visual highlighting of language-marked sections
- Keyboard shortcuts for frequent language selections
- Remove language markup from selections or entire document
- Validation of language codes
- Help documentation for proper language attribute usage

## Installation

1. Copy the `languageSelect` plugin to your TinyMCE plugins directory:
```
your-project/
  tinymce/
    plugins/
      languageSelect/
        plugin.js
```

2. Add the plugin and toolbar button to your TinyMCE configuration:
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

This plugin helps maintain WCAG compliance by:

- Ensuring proper language attribute (`lang`) usage
- Supporting screen readers with correct language pronunciation
- Providing keyboard shortcuts for common operations
- Making language changes visually apparent with optional highlighting

## License

BSD-3-Clause License

Copyright (C) 2018 The Trustees of Indiana University

## Support

For issues related to the plugin, please contact [your support contact info].

For TinyMCE-specific questions, refer to the [TinyMCE Documentation](https://www.tiny.cloud/docs/).
