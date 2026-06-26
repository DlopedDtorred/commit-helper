import chalk from "chalk";
import inquirer from "inquirer";
import { Command } from "commander";
import ora from "ora";
import { CommitBuilder } from "./commands/commit-builder.js";
import { CommitValidator } from "./commands/commit-validator.js";
import { ChangelogGenerator } from "./commands/changelog-generator.js";

export class Program {
  private program: Command;

  constructor() {
    this.program = new Command();
    this.setupProgram();
  }

  private setupProgram(): void {
    this.program
      .name("commit-helper")
      .description(
        chalk.cyan(
          "🚀 A powerful CLI tool to help developers write conventional commits"
        )
      )
      .version("1.0.0");

    this.program.command("new").description("Create a new conventional commit").action(() => this.createCommit());

    this.program
      .command("validate <message>")
      .description("Validate a commit message")
      .action((message) => this.validateCommit(message));

    this.program
      .command("changelog")
      .description("Generate changelog from git history")
      .action(() => this.generateChangelog());

    this.program.command("config").description("Configure commit-helper").action(() => this.showConfig());
  }

  private async createCommit(): Promise<void> {
    const builder = new CommitBuilder();
    const commit = await builder.build();
    console.log("\n" + chalk.green("✓ Commit message ready:"));
    console.log(chalk.yellow(commit));
    console.log("\n" + chalk.dim("Run: git commit -m \"") + chalk.yellow(commit) + chalk.dim("\""));
  }

  private async validateCommit(message: string): Promise<void> {
    const validator = new CommitValidator();
    const result = validator.validate(message);

    if (result.isValid) {
      console.log(chalk.green("✓ Valid conventional commit!"));
    } else {
      console.log(chalk.red("✗ Invalid commit message"));
      result.errors.forEach((error) => {
        console.log(chalk.red(`  • ${error}`));
      });
    }
  }

  private async generateChangelog(): Promise<void> {
    const spinner = ora("Generating changelog...").start();
    try {
      const generator = new ChangelogGenerator();
      const changelog = await generator.generate();
      spinner.succeed("Changelog generated successfully!");
      console.log("\n" + changelog);
    } catch (error) {
      spinner.fail("Failed to generate changelog");
      console.error(error);
    }
  }

  private showConfig(): void {
    console.log(chalk.cyan("\n📋 Configuration Guide:\n"));
    console.log(chalk.white("Conventional Commit Format:"));
    console.log(chalk.dim("  <type>(<scope>): <subject>"));
    console.log(chalk.dim("  <body>"));
    console.log(chalk.dim("  <footer>\n"));

    console.log(chalk.white("Valid Types:"));
    const types = ["feat", "fix", "docs", "style", "refactor", "perf", "test", "chore"];
    types.forEach((type) => console.log(chalk.dim(`  • ${type}`)));

    console.log(chalk.white("\nExample:"));
    console.log(chalk.yellow("  feat(auth): add user login functionality"));
    console.log(chalk.dim("  Implement JWT-based authentication\n"));
  }

  public async run(): Promise<void> {
    await this.program.parseAsync(process.argv);
  }
}
