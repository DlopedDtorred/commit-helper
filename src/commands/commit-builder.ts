import chalk from "chalk";
import inquirer from "inquirer";

const COMMIT_TYPES = [
  { value: "feat", name: "feat:     A new feature" },
  { value: "fix", name: "fix:      A bug fix" },
  { value: "docs", name: "docs:     Documentation only changes" },
  { value: "style", name: "style:    Changes that don't affect code meaning" },
  { value: "refactor", name: "refactor: Code change that neither fixes a bug nor adds a feature" },
  { value: "perf", name: "perf:     A code change that improves performance" },
  { value: "test", name: "test:     Adding missing tests or correcting existing tests" },
  { value: "chore", name: "chore:    Changes to build process, dependencies, etc" },
];

export class CommitBuilder {
  async build(): Promise<string> {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Select the type of change:",
        choices: COMMIT_TYPES,
      },
      {
        type: "input",
        name: "scope",
        message: "Scope (optional - e.g., api, auth, ui):",
        default: "",
      },
      {
        type: "input",
        name: "subject",
        message: "Short description (imperative, lowercase, no period):",
        validate: (input) => {
          if (input.length === 0) return "Subject cannot be empty";
          if (input.length > 50) return "Subject should be no longer than 50 characters";
          return true;
        },
      },
      {
        type: "input",
        name: "body",
        message: "Detailed description (optional - press Enter to skip):",
        default: "",
      },
      {
        type: "input",
        name: "footer",
        message: "Footer (optional - e.g., Fixes #123, Breaking change:):",
        default: "",
      },
    ]);

    return this.formatCommit(answers);
  }

  private formatCommit(answers: any): string {
    let commit = answers.type;

    if (answers.scope) {
      commit += `(${answers.scope})`;
    }

    commit += `: ${answers.subject}`;

    if (answers.body) {
      commit += `\n\n${answers.body}`;
    }

    if (answers.footer) {
      commit += `\n\n${answers.footer}`;
    }

    return commit;
  }
}
