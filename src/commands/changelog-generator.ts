import { execSync } from "child_process";
import chalk from "chalk";

export class ChangelogGenerator {
  async generate(): Promise<string> {
    try {
      const logs = this.getGitLogs();
      if (!logs.trim()) {
        return "# Changelog\n\nNo commits found matching conventional commit format.";
      }
      return this.formatChangelog(logs);
    } catch (error) {
      throw new Error("Failed to generate changelog. Make sure you're in a git repository.");
    }
  }

  private getGitLogs(): string {
    try {
      const output = execSync(
        'git log --oneline --pretty=format:"%H|%s" -n 100',
        { encoding: "utf-8" }
      );
      return output;
    } catch {
      return "";
    }
  }

  private formatChangelog(logs: string): string {
    const lines = logs.trim().split("\n");
    const features: Map<string, string[]> = new Map();
    const fixes: Map<string, string[]> = new Map();
    const performance: Map<string, string[]> = new Map();
    const other: Map<string, string[]> = new Map();

    lines.forEach((line) => {
      if (!line) return;
      const [hash, subject] = line.split("|");
      if (!subject) return;

      if (subject.startsWith("feat")) {
        this.categorizeCommit(subject, "feat", features);
      } else if (subject.startsWith("fix")) {
        this.categorizeCommit(subject, "fix", fixes);
      } else if (subject.startsWith("perf")) {
        this.categorizeCommit(subject, "perf", performance);
      } else if (!subject.startsWith("chore") && !subject.startsWith("test")) {
        this.categorizeCommit(subject, "other", other);
      }
    });

    let changelog = chalk.bold.cyan("# Changelog\n\n");

    if (features.size > 0) {
      changelog += chalk.green.bold("## ✨ Features\n");
      features.forEach((commits) => {
        commits.forEach((commit) => {
          changelog += `- ${commit}\n`;
        });
      });
      changelog += "\n";
    }

    if (fixes.size > 0) {
      changelog += chalk.red.bold("## 🐛 Bug Fixes\n");
      fixes.forEach((commits) => {
        commits.forEach((commit) => {
          changelog += `- ${commit}\n`;
        });
      });
      changelog += "\n";
    }

    if (performance.size > 0) {
      changelog += chalk.yellow.bold("## ⚡ Performance Improvements\n");
      performance.forEach((commits) => {
        commits.forEach((commit) => {
          changelog += `- ${commit}\n`;
        });
      });
      changelog += "\n";
    }

    if (other.size > 0) {
      changelog += chalk.white.bold("## 📝 Other Changes\n");
      other.forEach((commits) => {
        commits.forEach((commit) => {
          changelog += `- ${commit}\n`;
        });
      });
    }

    return changelog;
  }

  private categorizeCommit(subject: string, type: string, map: Map<string, string[]>): void {
    const parsed = this.parseCommitSubject(subject);
    if (!map.has(type)) {
      map.set(type, []);
    }
    map.get(type)!.push(parsed);
  }

  private parseCommitSubject(subject: string): string {
    // Remove type and scope, keep only message
    return subject.replace(/^(feat|fix|docs|style|refactor|perf|test|chore)(\([^)]*\))?:\s*/, "");
  }
}
