import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const COMMIT_TYPES = [
  { value: "feat", name: chalk.green("feat:     ") + "A new feature" },
  { value: "fix", name: chalk.cyan("fix:      ") + "A bug fix" },
  { value: "docs", name: chalk.blue("docs:     ") + "Documentation only changes" },
  { value: "style", name: chalk.magenta("style:    ") + "Changes that don't affect code meaning" },
  { value: "refactor", name: chalk.yellow("refactor: ") + "Code change that neither fixes a bug nor adds a feature" },
  { value: "perf", name: chalk.red("perf:     ") + "A code change that improves performance" },
  { value: "test", name: chalk.white("test:     ") + "Adding missing tests or correcting existing tests" },
  { value: "chore", name: chalk.gray("chore:    ") + "Changes to build process, dependencies, etc" },
];

function getCommonScopes(): string[] {
  try {
    const cwd = process.cwd();
    const entries = fs.readdirSync(cwd, { withFileTypes: true });
    const dirs = entries
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .filter((n) => !["node_modules", ".git", "dist", "coverage"].includes(n));
    // return top entries sorted by name, capped
    return dirs.sort().slice(0, 12);
  } catch (e) {
    return [];
  }
}

export class CommitBuilder {
  async build(): Promise<string> {
    const suggestedScopes = getCommonScopes();

    const answers: any = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Select the type of change:",
        choices: COMMIT_TYPES,
      },
      {
        type: "list",
        name: "scopeChoice",
        message: "Scope (select a common scope or choose custom):",
        choices: [
          ...suggestedScopes.map((s) => ({ name: s, value: s })),
          { name: "No scope", value: "" },
          { name: "Other (enter custom scope)", value: "__custom__" },
        ],
      },
      {
        type: "input",
        name: "scopeCustom",
        message: "Custom scope (e.g., api, auth, ui):",
        when: (a: any) => a.scopeChoice === "__custom__",
        validate: (input: string) => {
          if (input.length === 0) return "Scope cannot be empty";
          if (input.includes(" ")) return "Scope should be a single token without spaces";
          return true;
        },
      },
      {
        type: "input",
        name: "subject",
        message: "Short description (imperative, lowercase, no trailing period):",
        validate: (input: string) => {
          const trimmed = input.trim();
          if (trimmed.length === 0) return "Subject cannot be empty";
          if (trimmed.length > 72) return "Subject should be no longer than 72 characters";
          return true;
        },
        filter: (input: string) => input.trim().replace(/\.$/, ""),
      },
      {
        type: "input",
        name: "body",
        message: "Detailed description (optional):",
        default: "",
      },
      {
        type: "input",
        name: "footer",
        message: "Footer (optional - e.g., Fixes #123, BREAKING CHANGE:):",
        default: "",
      },
    ]);

    // Normalize answers
    const scope = answers.scopeChoice === "__custom__" ? (answers.scopeCustom || "") : answers.scopeChoice;
    const subject = this.sanitizeSubject(answers.subject || "");

    const finalAnswers = {
      type: answers.type,
      scope,
      subject,
      body: answers.body,
      footer: answers.footer,
    };

    const commitMessage = this.formatCommit(finalAnswers);

    console.log("\n" + chalk.green("Preview:"));
    console.log(chalk.yellow(commitMessage));

    const confirmCommit = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmCommit",
        message: "Run git commit with this message? (requires staged changes)",
        default: false,
      },
    ]);

    if (confirmCommit.confirmCommit) {
      try {
        const staged = execSync("git diff --cached --name-only", { encoding: "utf8" }).trim();
        if (!staged) {
          console.log(chalk.yellow("No staged changes found. Stage your changes before committing."));
        } else {
          // Use git commit -m with proper quoting
          execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: "inherit" });
        }
      } catch (e: any) {
        console.error(chalk.red("Failed to run git commit:"), e.message || e);
      }
    } else {
      // Try to copy to clipboard using xclip or pbcopy
      try {
        this.copyToClipboard(commitMessage);
        console.log(chalk.green("✓ Commit message copied to clipboard!"));
        console.log(chalk.dim("Run: git commit -m \"<message>\" (message is in your clipboard)"));
      } catch (e) {
        console.log(chalk.dim("You can copy the preview and run: git commit -m \"<message>\""));
      }
    }

    return commitMessage;
  }

  private sanitizeSubject(input: string): string {
    const trimmed = input.trim();
    if (trimmed.length === 0) return trimmed;
    // lowercase first char
    return trimmed.charAt(0).toLowerCase() + trimmed.slice(1).replace(/\.+$/, "");
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

  private copyToClipboard(text: string): void {
    try {
      // Try xclip first (Linux)
      if (process.platform === "linux") {
        execSync("xclip -selection clipboard", { input: text });
        return;
      }
      // Try pbcopy (macOS)
      if (process.platform === "darwin") {
        execSync("pbcopy", { input: text });
        return;
      }
      // Try clip (Windows)
      if (process.platform === "win32") {
        execSync("clip", { input: text });
        return;
      }
    } catch (e) {
      // Silently fail if clipboard is not available
      throw new Error("Clipboard not available");
    }
  }
}
