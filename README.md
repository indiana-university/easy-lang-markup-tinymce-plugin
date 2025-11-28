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
- Support for WordPerfect
  - Autodetection of dashicons
  - Support for tinyMCE 4
  - Support for WP translation services via [wp_localize_script](https://developer.wordpress.org/reference/functions/wp_localize_script/) and PB_EasyLangToken object
  - ./utils/build_wp_localize_script_block.js will auto-build wp_localize_script call
- All translation keys are literal strings that go through .translate(key) to support auto-localization tools

## AI Utilization

- Plugin code is AI code free. No code was directly copied from AI.
- Provided localization file translations were provided by AI. Some were proofed by humans. See [./docs/i18n_notes.md](./docs/i18n_notes.md) for details. Prompts used are listed in ./utils/prompts.txt

## Demo

To see the plugin in action, see the [TinyMCE Language Plugin Development (TinyMCE Version 7.4.0)](https://brichwin.pages.iu.edu/tests/tinyMCE-lang-plugins/examples_7.4.0/basic-tinyMCE-langs-canvas.html)

## Build

To build the TinyMCE Language Selector plugin from source:

### 1. Clone the repository

```sh
git clone https://github.com/indiana-university/easy-lang-markup-tinymce-plugin.git
cd easy-lang-markup-tinymce-plugin
```

### 2. Install dependencies

Install all dependencies listed in package.json. The dependencies are only
needed for the build process:

```sh
npm install
```

### 3. Build the plugin

Run the build:

```sh
npm run build
```

The build process makes two versions: one for production and one that exposes
functions for the tests. Outputs appear under the ./dist folder. The
production version of the plugin is in ./dist/plugins/languageSelect

```txt
├── dist/
│   ├── plugin_for_tests
│   ├── plugin_types.ts
│   └── plugin-for-tests.ts
├── plugins
│   └── languageSelect
│       ├── langs
│       │   ├── ar_SA.js
│       │   ├── ar.js
...
│       │   ├── zh_TW.js
│       │   └── zh.js
│       └── plugin.min.js
```

### 4. Optional: Run tests

```sh
npm test
```

## Installation

1. Copy the `./dist/plugins/languageSelect` folder to your TinyMCE plugins directory:

```txt
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
  "selector": 'textarea',  // change to match your selector
  "plugins": 'languageSelect',
  "toolbar": 'languageSelector',
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
  "easylang_icon": 'custom-icon-name',  // Use a custom icon
  "easylang_show_current_language": true,  // Show language text instead of icon
  "easylang_enable_keyboard_shortcuts": true,  // Enable keyboard shortcuts
  "easylang_default_document_language": 'en-US',  // Set default document language
  "content_langs": [  // Define initial languages in menu
    { "code": 'en-US', "title": 'English (US)' },
    { "code": 'es', "title": 'Spanish' }
  ]
});
```

### Overview Table

| Option | Type | Default | Purpose |
|-------|------|---------|---------|
| easylang_langs / content_langs | array | default set | Defines initial languages in menu |
| easylang_add_to_v4menu | string | format | Adds easylang menu to specified TinyMCE 4 menu |
| easylang_enable_keyboard_shortcuts | boolean | true | Enables keyboard shortcuts for languages |
| easylang_reserved_shortcut_letters | array | [] | Letters excluded from shortcuts |
| easylang_scan_document_on_load | boolean | true | Scan document on load for existing langs |
| easylang_show_current_language | boolean | false | Show current lang in toolbar control |
| easylang_toolbar_icon | string | plugin default | Force toolbar icon class name |
| easylang_use_dashicons | boolean | false | Use WP Dashicons icons |

### easylang_langs (or content_langs)

The `easylang_langs` option allows you to specify which languages appear in the language selector menu. This is useful for providing the language choices relevant to your content or audience.

The plugin will prioritize languages in this order:

- Current editor language
- Languages detected in the document (by frequency of use)
- The default languages (to fill up to 6 menu items)

```javascript
tinymce.init({
  // ... other options ...
  "easylang_langs": [
    { "title": "English (US)", "code": "en-US" },
    { "title": "Hindi (India)", "code": "hi-IN" },
    { "title": "Chinese (Simplified, PRC)", "code": "zh-Hans-CN" },
    { "title": "Korean (South Korea)", "code": "ko-KR" },
    { "title": "Arabic (MSA)", "code": "ar" }
  ],
  // ... other options ...
});
```

#### Properties

- `code` (string, required): A valid BCP 47 language tag (e.g., 'en-US', 'es', 'fr-CA')
- `title` (string, required): The display name for the language in the selector menu

#### Default languages

- en - English
- es - Spanish (español)
- fr - French (français)
- it - Italian (italiano)
- de - German (Deutsch)

#### Note

The `content_langs` option can also be used for the same purpose. Both options are supported for compatibility.

### easylang_add_to_v4menu

The `easylang_add_to_v4menu` option controls whether the language selector menu is added to TinyMCE 4's main menu bar and specifies which menu context it should appear in. 

#### Default behavior

When not specified, the language selector menu will be added to the bottom of the Format menu.

<img width="766" height="273" alt="" src="https://github.com/user-attachments/assets/746061c0-2cde-488b-ae19-3c3d2ee0620f" />

#### Usage

```javascript
tinymce.init({
  "selector": 'textarea',
  "plugins": 'languageSelect',
  "easylang_add_to_v4menu": 'insert'  // Adds to the "insert" menu
});
```

#### Accepted values

- true (boolean): Adds the language menu to the default "format" menu
- false (boolean): Easy lang does not appear in any tinyMCE menu
- A string value: Specifies the menu context where the language menu should appear (e.g., "format", "insert", "view", "table")

#### Note

This option is specifically for TinyMCE 4 compatibility. For TinyMCE 5+, use the menu configuration option with the easyLangMenu nested menu item.


### `easylang_enable_keyboard_shortcuts`

Enables automatically generated keyboard shortcuts for applying language markup.  
Shortcuts use Ctrl/^ + Alt/Option + `<letter>` and allow fast language tagging.

**Default:** `true`

```javascript
tinymce.init({
  "easylang_enable_keyboard_shortcuts": true
});
```

- Only applies shortcuts to languages listed in the menu.
- Skips letters listed in `easylang_reserved_shortcut_letters`.  
- If insufficient letters remain, only some languages receive shortcuts.

---

### `easylang_reserved_shortcut_letters`

Defines letters that cannot be used when generating keyboard shortcuts.

**Default:** `""` or `"acdhjklmoqruwxz"` when WordPress is detected 

```javascript
tinymce.init({
  "easylang_enable_keyboard_shortcuts": true,
  "easylang_reserved_shortcut_letters": ['b','i','u']
});
```

- Useful to avoid conflicts with LMS or CMS keyboard shortcuts.  
- Excluded letters are skipped during shortcut assignment.

---

### `easylang_scan_document_on_load`

Scans the editor's HTML content for existing `lang="..."` attributes on load and preloads those languages in the menu.

**Default:** `true`

```javascript
tinymce.init({
  "easylang_scan_document_on_load": true
});
```

- Detects languages already present in the document.  
- Improves menu ordering by surfacing the most-used languages.  

---

### `easylang_set_dir_when_setting_lang`

Enables automatically adding dir attribute when setting a lang attribute.

**Default:** `true`

---

### `easylang_shortcut_modifiers`

Allows setting the modifiers for keyboard shortcuts used by the easylang plugin. 

**Default:** `Ctrl+Alt`

```javascript
tinymce.init({
  "easylang_shortcut_modifiers": "Meta+Shift"
});
```

The following modifiers can be used (case insensitive):

| Modifier | PC           | macOS           |
|----------|--------------|------------------|
| `Meta`   | Ctrl         | Command          |
| `Shift`  | Shift        | Shift            |
| `Ctrl`   | Ctrl         | Control          |
| `Alt`    | Alt          | Option           |
| `Access` | Shift+Alt    | Control+Option   |

See [Custom Keyboard Shortcuts in tiny docs](https://www.tiny.cloud/docs/tinymce/latest/shortcuts/) for more information.

### `easylang_show_current_language`

Displays the current language code (e.g., `EN`, `ES`, `FR-CA`) directly in the toolbar button.

**Default:** `false`

```javascript
tinymce.init({
  "easylang_show_current_language": true
});
```

- Updates dynamically as the cursor moves.  
- Overrides the toolbar icon, even if `easylang_toolbar_icon` is set.  
- Useful for multilingual editors who frequently check active language context.
- Experimental feature as no update control text functionality is provided in the tinyMCE API.

---

### `easylang_toolbar_icon`

Overrides the default toolbar icon used for the toolbar button.

**Default:** plugin’s built‑in SVG icon (TinyMCE 5+). TinyMCE 4 defaults to text: "Language".

```javascript
tinymce.init({
  "easylang_toolbar_icon": 'my-custom-icon'
});
```

- Custom icons can be registered in tinyMCE 5+ with `editor.ui.registry.addIcon()`.  
- Ignored if `easylang_show_current_language` is enabled.  
- Works in TinyMCE 5+.

---

### `easylang_use_dashicons`

Forces or blocks the use of **WordPress Dashicons**

**Default:** `auto`

```javascript
tinymce.init({
  "easylang_use_dashicons": true
});
```

- If `true`, requires Dashicons to be loaded by the host CMS/theme.
- If `false`, blocks use of Dashicons regardless of other settings.
- If `"auto"` or not set, plugin may use Dashicons if WP and the Dashicons css are detected.

---

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
All of the keys are the en-US text. The `translate(key)` function returns the key if no match
was found in a localization file. So, localization to `en-US` is the default and if no further
localization is needed then the `langs` folder does not need to be installed.

See [./docs/i18n_notes.md](./docs/i18n_notes.md) for details.

## Security

### Overview

The Easy Language Markup plugin is a client-side TinyMCE plugin that helps authors apply correct `lang` and (optionally) `dir` attributes to selected text. It does **not** send content to any external service, does not store data on its own, and does not modify server-side security or sanitization behavior.

The plugin runs **entirely in the browser** inside the host editor (TinyMCE 4+ / WordPress / Pressbooks / Canvas, etc.). All existing security controls provided by the host platform (e.g., HTML sanitization, role and capability checks, CSP, iframe sandboxing) remain in effect and must continue to be used.

### Data Handling

- The plugin:
  - Reads and writes only HTML attributes such as `lang` and `dir` on elements inside the editor.
  - May create or remove inline `<span>` elements (or use existing ones) to apply language markup.
  - Uses configuration values and localized UI strings that are passed into TinyMCE (e.g., via `editor.getParam`, `wp_localize_script`, or similar mechanisms).

- The plugin:
  - Does **not** perform network requests.
  - Does **not** log or transmit document content outside the page.
  - Does **not** persist any data beyond the editor document and in-memory plugin state.
  - Does **not** have any external dependencies beyond a supported tinyMCE instance and optionally WP
  - The only user inputs are to be a BCP 47 language tag and are santized by the bcp47Regex in `isValidLang(lang: string): boolean`

### XSS and Content Sanitization

This plugin is designed to operate within a **trusted editor environment** and assumes that:

- The HTML content in the editor continues to be sanitized by the host application.
  - Example (WordPress): using `wp_kses_post()` or a similar allow-list-based filter on save.
  - Example (other apps): using a server-side HTML sanitizer to remove scripts and unsafe attributes.

The plugin itself:

- Never calls `eval`, `Function`, or similar dynamic code-execution APIs.
- Does not intentionally inject raw HTML that contains `<script>` tags, event handlers, or inline JavaScript.
- Uses DOM APIs to create and modify elements; any strings that are written into the DOM as attributes are sanitized.
- Sanitizes configuration inputs to expected values in `processEditorConfigParameters()`
- Sanitizes user inputs to valid BCP 47 language tags by the bcp47Regex in `isValidLang(lang: string): boolean`
- Performs light sanitization of received translation strings. See Translation Strings and Localization below.

> **Important:** This plugin does **not** replace server-side sanitization. You must continue to sanitize user content on save, just as you would for any other TinyMCE content.

### Translation Strings and Localization

The plugin uses translation strings that are passed in by the host environment, for example via:

- TinyMCE’s `editor.translate()` or `addI18n` mechanisms.
- WordPress’s `wp_localize_script()` or similar localization utilities.
- Other host-specific translation systems.

Security recommendations:

- Only use **static, developer-supplied translation strings** in your localization files.
- Do **not** feed user-generated content (e.g., form input, comments, or arbitrary text supplied by authors) into translation tables or plugin configuration values.
- Translation keys and values must never contain HTML tags or JavaScript. They should be treated as plain text UI labels.

### Configuration Options

Configuration options are processed by `processEditorConfigParameters()` and are sanitized to their expected values. 
However, these should be set to **trusted, static values** in your TinyMCE configuration or WordPress/Pressbooks integration code and **must not** be populated with arbitrary user input.

### Integration Guidance

When integrating this plugin with WordPress, Pressbooks, Canvas, or another platform:

**Continue to sanitize saved content** using your existing HTML sanitization pipeline.

### Reporting Security Issues

If you believe you have found a security vulnerability in this plugin:

1. **Do not** open a public issue with full details.
2. Instead, please contact the maintainer via the email listed in the README file.
3. Provide a clear, minimal example that demonstrates the issue, along with:
   - The platform (e.g., WordPress, Pressbooks, Canvas),
   - The TinyMCE version, and
   - Any relevant configuration values.

## License

[GPL-3.0 license](https://www.gnu.org/licenses/gpl-3.0.en.html)

Copyright (C) 2012-2025 The Trustees of Indiana University

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for
guidelines.

## Support

For issues related to the plugin, please contact [brichwin@iu.edu](mailto:brichwin@iu.edu).

For TinyMCE-specific questions, refer to the [TinyMCE Documentation](https://www.tiny.cloud/docs/).
