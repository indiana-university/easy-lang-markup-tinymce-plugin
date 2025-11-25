# Contributing to easy-lang-markup-tinymce-plugin

Thanks for your interest in contributing to the **easy-lang-markup-tinymce-plugin**! 
This plugin makes it easier for TinyMCE users to mark up human language changes 
in content—an important step toward accessible, multilingual editing experiences.

We welcome bug reports, feature requests, and code contributions. Please read 
below to get started.

---

## 🚀 Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally and navigate to the project directory:

   ```bash
   git clone https://github.com/YOUR_USERNAME/easy-lang-markup-tinymce-plugin.git
   cd easy-lang-markup-tinymce-plugin
   ```
3. **Change Directory** to the root folder of desired plugin.

   This repo has two versions of the plugin. One as a dropdown menu and
   the other as a sidebar:

   - `./plugins/easy-lang-markup-dropdown/`
   - `./plugins/easy-lang-markup-sidebar/`

4. **Install dependencies**:

   ```bash
   npm install
   ```

5. **Edit with VS Code**

   If editing with the VS Code editor, open a window at
   the appropriate plugin folder listed in 3 (above) as
   each have their own package.json and other config
   files.

   Be sure to be in the appropriate plugin root folder
   when running the typecheck, build, or test scripts.
   
---

## 🛠️ Development Workflow

### Run the type checker:

The typecheck script runs `tsc -noEmit` and is a quick way to check
the syntax and for TypeScript errors without a full build.

```bash
npm run typecheck
```

### Run tests:

The test script performs a typecheck and then a build prior to 
running the tests. 

```bash
npm run test
```

### Build the plugin:

The build script performs a typecheck and if that passes it then
performs a full build. 

```bash
npm run build
```

---

## 🧪 Testing

- Test files are located in the `__tests__/` directory.
- Test coverage includes utility functions, language detection, 
  and plugin behavior.

This project uses **Jest** for unit tests. The esbuild script copies the
`src/plugin.ts` (as plugin-for-tests.ts) and `src/plugin_types.ts` files 
into the `__tests__` folder and adds an export of the LanguageSelect class 
so it can be imported into the tests.

To run all tests:

  ```bash
  npm run test
  ```

Add tests when submitting a fix or new feature whenever possible.

---

## 🧹 Coding Standards

- Use **TypeScript**.
- Follow the existing file structure and modular design.
- Use clear and descriptive variable names.
- Add `JSDoc`-style comments to exported functions when appropriate.
- Avoid committing debug code, commented-out blocks, or `console.log`.
- Use VSCode's TypeScript formatter and trim trailing spaces.

---

## ✅ Pull Request Checklist

Before submitting your pull request, please ensure the following:

- [ ] Code builds without type or runtime errors.
- [ ] New logic is covered by tests.
- [ ] Plugin behavior is not broken in TinyMCE.
- [ ] Your code follows the project’s Coding Standards and structure.
- [ ] The pull request description clearly explains the motivation and changes.

---

## 🐞 Reporting Issues

Please open an issue in GitHub if you:

- Found a bug
- Want to request a new feature
- Need clarification on how something works

Provide:
- A clear description
- Steps to reproduce (if applicable)
- Screenshots or code snippets if relevant
- Be sure to specify which version of the plugin 
  you are filing an issue on.

---

## 📄 Licensing and Conduct

All contributions are assumed to be submitted under the same license as the 
project.

Please be respectful of others. 

---

Thanks again for contributing! 💛
