# Contributing to easy-lang-markup-tinymce-plugin

Thanks for your interest in contributing to the **easy-lang-markup-tinymce-plugin**! This plugin makes it easier for TinyMCE users to mark up human language changes in content—an important step toward accessible, multilingual editing experiences.

We welcome bug reports, feature requests, and code contributions. Please read below to get started.

---

## 🚀 Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** and navigate to the project directory:

   ```bash
   git clone https://github.com/YOUR_USERNAME/easy-lang-markup-tinymce-plugin.git
   cd easy-lang-markup-tinymce-plugin
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

---

## 🛠️ Development Workflow

### Run the type checker:

```bash
npm run typecheck
```

### Run tests:

```bash
npm test
```

### Build the plugin:

```bash
npm run build
```

The build process uses `esbuild` and expects type checking to pass first.

---

## 🧪 Testing

This project uses **Jest** for unit tests.

- Test files are located in the `tests/` directory.
- Test coverage includes utility functions, language detection, and plugin behavior.
- To run all tests:

  ```bash
  npm test
  ```

Add tests when submitting a fix or new feature whenever possible.

---

## 🧹 Coding Standards

- Use **TypeScript**.
- Follow the existing file structure and modular design.
- Use clear and descriptive variable names.
- Add `JSDoc`-style comments to exported functions when appropriate.
- Avoid committing debug code, commented-out blocks, or `console.log`.

---

## ✅ Pull Request Checklist

Before submitting your pull request, please ensure the following:

- [ ] Code builds without type or runtime errors.
- [ ] New logic is covered by tests.
- [ ] Plugin behavior is not broken in TinyMCE.
- [ ] Your code follows the project’s style and structure.
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

---

## 📄 Licensing and Conduct

All contributions are assumed to be submitted under the same license as the project (MIT).

Please be respectful of others. If this project adds a `CODE_OF_CONDUCT.md`, contributors are expected to follow it.

---

Thanks again for contributing! 💛
