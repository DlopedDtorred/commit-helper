# CommitHelper CLI 🚀

**The ultimate tool for writing perfect conventional commits!**

A powerful, interactive CLI tool to help developers write conventional commits with ease. Say goodbye to poorly formatted commit messages!

## Features ✨

- **📝 Interactive Commit Builder**: Step-by-step guide to create perfect conventional commits
- **✓ Smart Validator**: Validate commit messages with detailed feedback and warnings
- **📋 Smart Changelog Generator**: Auto-generate changelogs with emoji categories from your git history
- **🪝 Git Hooks Integration**: Setup automatic commit validation hooks
- **🎨 Beautiful UI**: Rich colors, emojis, and clear formatting
- **📋 Clipboard Support**: Copy commit messages directly to your clipboard
- **Type Safety**: Built with TypeScript for reliability
- **Beginner Friendly**: Clear guidance on conventional commit format
- **Zero Configuration**: Works out of the box!

## Installation 📦

### From npm (Recommended - coming soon)

```bash
npm install -g commit-helper
```


## Por esto:

```markdown
### From source

```bash
git clone https://github.com/dlopeddtorred/commit-helper.git
cd commit-helper
npm install
npm run build

# Install globally
npm install -g .
commit-helper new
``` 

### Bash Completion (Optional)

```bash
# Enable for current session
source completion/commit-helper.bash

# Install system-wide (requires sudo)
sudo cp completion/commit-helper.bash /etc/bash_completion.d/commit-helper
```

## Quick Start 🚀

### Create an interactive commit

```bash
commit-helper new
```

Follow the step-by-step prompts to create a perfect conventional commit.

### Validate a commit message

```bash
commit-helper validate "feat(auth): add user login"
```

### Generate a changelog from git history

```bash
commit-helper changelog

# Save to file
commit-helper changelog -o CHANGELOG.md
```

### Show documentation

```bash
commit-helper config
```

### Setup git hooks

```bash
commit-helper hook
```

## Conventional Commit Format 📝

### Structure

```
<type>(<scope>): <subject>
<blank line>
<body>
<blank line>
<footer>
```

### Supported Types

| Type         | Emoji | Description                   |
| ------------ | ----- | ----------------------------- |
| **feat**     | ✨    | A new feature                 |
| **fix**      | 🐛    | A bug fix                     |
| **docs**     | 📚    | Documentation only changes    |
| **style**    | 🎨    | Code style changes (no logic) |
| **refactor** | ♻️    | Code refactoring              |
| **perf**     | ⚡    | Performance improvements      |
| **test**     | ✅    | Test changes                  |
| **chore**    | 🔧    | Build/dependency changes      |

### Examples

#### Simple feature

```
feat(auth): add user login functionality
```

#### Feature with body and footer

```
feat(api): implement GraphQL queries

Add support for fetching users and posts with filtering capabilities.
This replaces the old REST endpoints.

Closes #123
```

#### Bug fix

```
fix(ui): correct button alignment on mobile devices
```

#### Changelog entry with scope

```
docs(readme): update installation instructions
```

## Commands Reference 📖

### `commit-helper new`

Interactive builder for creating conventional commits.

**Features:**

- Smart scope suggestions based on your project structure
- Real-time preview
- Direct git commit execution (with staged changes check)
- Automatic clipboard copy

### `commit-helper validate <message>`

Validate a commit message against conventional commit standards.

**Features:**

- Detailed error reporting
- Performance warnings
- Character count validation

### `commit-helper changelog [options]`

Generate a formatted changelog from your git history.

**Options:**

- `-o, --output <file>` - Save changelog to a file

**Output includes:**

- ✨ Features
- 🐛 Bug Fixes
- ⚡ Performance Improvements
- 📝 Other Changes

### `commit-helper config`

Display the conventional commit guide and examples.

### `commit-helper hook`

Setup git hooks for automatic commit validation.

## Development 🛠️

### Setup

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Format & Lint

```bash
npm run lint
npm run format
```

## Contributing 🤝

We love contributions! Here's how to help:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes using `commit-helper new`
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Workflow

```bash
# Create a feature
git checkout -b feature/my-feature

# Make changes and test
npm run dev -- new

# Run tests
npm test

# Lint and format
npm run lint
npm run format

# Build and commit
npm run build
./commit-helper new

# Push and create PR
git push origin feature/my-feature
```

## Project Structure 📁

```
commit-helper/
├── src/
│   ├── cli.ts                    # Main CLI entry point
│   ├── index.ts                  # Program class
│   └── commands/
│       ├── commit-builder.ts     # Interactive commit builder
│       ├── commit-validator.ts   # Message validator
│       └── changelog-generator.ts # Changelog generator
├── dist/                         # Compiled JavaScript
├── package.json
└── README.md
```

## Advanced Usage 🔧

### Using with Git Hooks

Automatically validate commits:

```bash
commit-helper hook

# Select 'commit-msg' to enable automatic validation
# Now every commit will be validated!
```

### Programmatic Usage

```typescript
import { CommitBuilder, CommitValidator } from 'commit-helper';

// Validate a message
const validator = new CommitValidator();
const result = validator.validate('feat(api): add new endpoint');
console.log(result.isValid); // true
console.log(result.errors); // []

// Build a commit (requires interactive terminal)
const builder = new CommitBuilder();
const message = await builder.build();
```

## Tips & Tricks 💡

1. **Scope suggestions** - The builder automatically suggests scopes based on your project directories
2. **Clipboard copy** - Commit messages are automatically copied to your clipboard for easy pasting
3. **Validation warnings** - Get helpful warnings for commit messages that approach length limits
4. **Git integration** - Directly commit from the builder if you have staged changes
5. **Large changesets** - Use the body to explain what and why, not how

## Troubleshooting 🔍

### Issue: Command not found

```bash
# Ensure it's installed globally
npm install -g commit-helper

# Or use npm link for local development
npm link
```

### Issue: Git commit fails

Make sure you have staged changes:

```bash
git add .
```

### Issue: Clipboard not working

Some systems require `xclip` (Linux) or `pbcopy` (macOS):

```bash
# Ubuntu/Debian
sudo apt-get install xclip

# macOS - already included
# Windows - built-in
```

## License 📄

MIT © 2026 CommitHelper Contributors

## Support 💬

- 📖 Read the [Documentation](./README.md)
- 🐛 Found a bug? [Open an issue](https://github.com/dlopeddtorred/commit-helper/issues)
- 💡 Have an idea? [Create a discussion](https://github.com/dlopeddtorred/commit-helper/discussions)
- 🤝 Want to contribute? [Check CONTRIBUTING.md](./CONTRIBUTING.md)

## Changelog 📝

### v2.0.0 (Latest)

- ✨ Added interactive commit builder with smart scopes
- ✨ Added git hook integration
- ✨ Improved changelog generation with emojis and categories
- ✨ Added clipboard support for all platforms
- ✨ Improved validator with warnings
- 🎨 Enhanced UI with colors and emojis
- 🐛 Fixed edge cases in commit parsing
- 📚 Updated documentation

### v1.0.1

- Initial release
- Basic commit validation
- Simple changelog generation

---

**Made with ❤️ for developers, by developers.**

**Questions? Star the repo and follow for updates!** ⭐
