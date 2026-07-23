import chalk from 'chalk';
import inquirer from 'inquirer';
import { Command } from 'commander';
import ora from 'ora';
import { CommitBuilder } from './commands/commit-builder.js';
import { CommitValidator } from './commands/commit-validator.js';
import { ChangelogGenerator } from './commands/changelog-generator.js';

export class Program {
  private program: Command;

  constructor() {
    this.program = new Command();
    this.setupProgram();
  }

  private setupProgram(): void {
    this.program
      .name(chalk.bold.cyan('commit-helper'))
      .description(
        chalk.cyan('🚀 A powerful CLI tool to help developers write conventional commits')
      )
      .version('2.0.0');

    this.program
      .command('new')
      .description('📝 Create a new conventional commit')
      .action(() => this.createCommit());

    this.program
      .command('validate <message>')
      .description('✓ Validate a commit message against conventional commit standards')
      .action((message) => this.validateCommit(message));

    this.program
      .command('changelog')
      .description('📋 Generate changelog from git history')
      .option('-o, --output <file>', 'Output file (optional)')
      .action((options) => this.generateChangelog(options));

    this.program
      .command('config')
      .description('⚙️  Configure commit-helper & show documentation')
      .action(() => this.showConfig());

    this.program
      .command('hook')
      .description('🪝 Setup git hooks for automatic commit validation')
      .action(() => this.setupHooks());
  }

  private async createCommit(): Promise<void> {
    console.log(chalk.cyan('\n✨ Interactive Commit Builder\n'));
    const builder = new CommitBuilder();
    const commit = await builder.build();
    console.log('\n' + chalk.green('✓ Commit message ready:'));
    console.log(chalk.yellow(commit));
  }

  private async validateCommit(message: string): Promise<void> {
    const validator = new CommitValidator();
    const result = validator.validate(message);

    console.log('\n' + chalk.cyan('Validating commit message...\n'));

    if (result.isValid) {
      console.log(chalk.green('✓ Valid conventional commit!'));
    } else {
      console.log(chalk.red('✗ Invalid commit message\n'));
      result.errors.forEach((error) => {
        console.log(chalk.red(`  ✗ ${error}`));
      });
    }

    if (result.warnings && result.warnings.length > 0) {
      console.log(chalk.yellow('\n⚠️  Warnings:'));
      result.warnings.forEach((warning) => {
        console.log(chalk.yellow(`  ⚠️  ${warning}`));
      });
    }

    console.log();
  }

  private async generateChangelog(options: any): Promise<void> {
    const spinner = ora(chalk.cyan('Generating changelog...')).start();
    try {
      const generator = new ChangelogGenerator();
      const changelog = await generator.generate();
      spinner.succeed(chalk.green('Changelog generated successfully!'));

      if (options.output) {
        const fs = await import('fs');
        fs.writeFileSync(options.output, changelog);
        console.log(chalk.dim(`\nSaved to: ${options.output}\n`));
      } else {
        console.log('\n' + changelog + '\n');
      }
    } catch (error) {
      spinner.fail(chalk.red('Failed to generate changelog'));
      console.error(chalk.red(String(error)));
    }
  }

  private showConfig(): void {
    console.log(chalk.cyan('\n📋 Conventional Commit Guide\n'));

    console.log(chalk.bold.white('Format:'));
    console.log(chalk.dim('  <type>(<scope>): <subject>'));
    console.log(chalk.dim('  <blank line>'));
    console.log(chalk.dim('  <body>'));
    console.log(chalk.dim('  <blank line>'));
    console.log(chalk.dim('  <footer>\n'));

    console.log(chalk.bold.white('Valid Types:'));
    const types = [
      { type: 'feat', desc: 'A new feature', emoji: '✨' },
      { type: 'fix', desc: 'A bug fix', emoji: '🐛' },
      { type: 'docs', desc: 'Documentation only changes', emoji: '📚' },
      { type: 'style', desc: 'Code style changes (no logic)', emoji: '🎨' },
      { type: 'refactor', desc: 'Code refactoring', emoji: '♻️' },
      { type: 'perf', desc: 'Performance improvements', emoji: '⚡' },
      { type: 'test', desc: 'Test changes', emoji: '✅' },
      { type: 'chore', desc: 'Build/dependency changes', emoji: '🔧' },
    ];
    types.forEach(({ type, desc, emoji }) => {
      console.log(chalk.dim(`  ${emoji} ${type.padEnd(10)} - ${desc}`));
    });

    console.log(chalk.bold.white('\nExamples:'));
    console.log(chalk.yellow('  feat(auth): add user login functionality'));
    console.log(chalk.yellow('  fix(ui): correct button alignment on mobile'));
    console.log(chalk.yellow('  docs(readme): update installation instructions\n'));
  }

  private async setupHooks(): Promise<void> {
    console.log(chalk.cyan('\n🪝 Setting up git hooks...\n'));

    const { hook } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'hook',
        message: 'Which hooks would you like to install?',
        choices: [
          { name: 'commit-msg (validate commits)', value: 'commit-msg' },
          { name: 'prepare-commit-msg (auto-format)', value: 'prepare-commit-msg' },
        ],
        default: ['commit-msg'],
      },
    ]);

    try {
      const fs = await import('fs');
      const path = await import('path');
      const { execSync } = await import('child_process');

      const gitDir = execSync('git rev-parse --git-dir', { encoding: 'utf-8' }).trim();
      const hooksDir = path.join(gitDir, 'hooks');

      if (!fs.existsSync(hooksDir)) {
        fs.mkdirSync(hooksDir, { recursive: true });
      }

      if (hook.includes('commit-msg')) {
        const hookPath = path.join(hooksDir, 'commit-msg');
        const hookContent = `#!/bin/bash\ncommit-helper validate "$(cat $1)"\n`;
        fs.writeFileSync(hookPath, hookContent);
        fs.chmodSync(hookPath, 0o755);
        console.log(chalk.green('✓ commit-msg hook installed'));
      }

      console.log(chalk.green('\n✓ Git hooks setup complete!\n'));
    } catch (error) {
      console.error(chalk.red('Error setting up hooks:'), error);
    }
  }

  public async run(): Promise<void> {
    await this.program.parseAsync(process.argv);
  }
}
