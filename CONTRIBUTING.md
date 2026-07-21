# Contributing to CommitHelper

First off, thanks for taking the time to contribute! 🎉

## Code of Conduct

This project and everyone participating in it is governed by a Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, check the issue list as you might find out that you don't need to create one. When you are creating a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain the expected behavior**

### Pull Requests

- Fill in the required template
- Follow the TypeScript/Node.js styleguides
- End all files with a newline
- Use conventional commits for your PR title

## Development Setup

```bash
# Clone the repository
git clone https://github.com/dlopeddtorred/commit-helper.git
cd commit-helper

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run in development mode
npm run dev
```

## Styleguides

### Git Commit Messages

Follow the Conventional Commits specification:

```
<type>(<scope>): <subject>
<blank line>
<body>
<blank line>
<footer>
```

### TypeScript/JavaScript Styleguide

- Use TypeScript for all new code
- 2 spaces for indentation
- Use meaningful variable names
- Add comments only when necessary
- Use async/await instead of promises when possible

### Documentation Styleguide

- Use Markdown
- Reference functions and classes in backticks: `` `myFunction()` ``
- Use clear and concise language

## Testing

- Write tests for all new features
- All tests must pass before submitting a PR
- Aim for high code coverage

```bash
npm test
```

## Additional Notes

### Issue and Pull Request Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

---

Thank you for contributing to CommitHelper! 🙏
