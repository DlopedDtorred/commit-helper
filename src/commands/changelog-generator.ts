import { execSync } from "child_process";

export class ChangelogGenerator {
  async generate(): Promise<string> {
    try {
      const logs = this.getGitLogs();
      return this.formatChangelog(logs);
    } catch (error) {
      throw new Error("Failed to generate changelog. Make sure you're in a git repository.");
    }
  }

  private getGitLogs(): string {
    const output = execSync(
      'git log --oneline --grep="^feat\\|^fix\\|^perf" -n 50',
      { encoding: "utf-8" }
    );
    return output;
  }

  private formatChangelog(logs: string): string {
    const lines = logs.trim().split("\n");
    const features: string[] = [];
    const fixes: string[] = [];
    const performance: string[] = [];

    lines.forEach((line) => {
      if (line.includes("feat")) {
        features.push(this.parseCommitLine(line));
      } else if (line.includes("fix")) {
        fixes.push(this.parseCommitLine(line));
      } else if (line.includes("perf")) {
        performance.push(this.parseCommitLine(line));
      }
    });

    let changelog = "# Changelog\n\n";

    if (features.length > 0) {
      changelog += "## Features\n";
      features.forEach((feature) => {
        changelog += `- ${feature}\n`;
      });
      changelog += "\n";
    }

    if (fixes.length > 0) {
      changelog += "## Bug Fixes\n";
      fixes.forEach((fix) => {
        changelog += `- ${fix}\n`;
      });
      changelog += "\n";
    }

    if (performance.length > 0) {
      changelog += "## Performance Improvements\n";
      performance.forEach((perf) => {
        changelog += `- ${perf}\n`;
      });
    }

    return changelog;
  }

  private parseCommitLine(line: string): string {
    const match = line.match(/[a-f0-9]{7}\s(.+)/);
    return match ? match[1] : line;
  }
}
