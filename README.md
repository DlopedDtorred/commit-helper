# CommitHelper CLI 🚀

A powerful CLI tool to help developers write conventional commits with ease. Say goodbye to poorly formatted commit messages!

## Features ✨

- **Interactive Commit Builder**: Step-by-step guide to create perfect conventional commits
- **Commit Validator**: Validate commit messages against conventional commit standards
- **Changelog Generator**: Automatically generate changelogs from your git history
- **Type Safety**: Built with TypeScript for reliability
- **Beginner Friendly**: Clear guidance on conventional commit format

## Installation 📦

### From npm (Recommended, coming soon)
```bash
npm install -g commit-helper
```

### From source (run locally)
Clone, install dependencies and build. Then either run the included wrapper script or link the package:

```bash
git clone https://github.com/dlopeddtorred/commit-helper.git
cd commit-helper
npm install
npm run build

# Run directly from the project (no global install)
./commit-helper new

# Or make the command available globally for development
npm link
commit-helper new
```

## Quick Start 🚀

### Create a new commit
```bash
commit-helper new
```
Follow the interactive prompts to create a conventional commit.

### Validate a commit message
```bash
commit-helper validate "feat(auth): add user login"
```

### Generate a changelog
```bash
commit-helper changelog
```

### Show configuration guide
```bash
commit-helper config
```

## Conventional Commit Format 📝

```
<type>(<scope>): <subject>
<blank line>
<body>
<blank line>
<footer>
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process, dependencies, etc.

### Examples

#### Simple feature
```
feat(auth): add user login functionality
```

#### Feature with body
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

## Contributing 🤝

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using commit-helper (`npm run dev -- new`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

MIT © 2026 CommitHelper Contributors

## Support 💬

Having issues? Open an [issue](https://github.com/dlopeddtorred/commit-helper/issues) on GitHub.

---

Made with ❤️ for developers, by developers.
