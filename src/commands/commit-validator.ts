export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

export class CommitValidator {
  private readonly commitRegex =
    /^(feat|fix|docs|style|refactor|perf|test|chore)(\([a-z0-9\-]*\))?:\s.+/;

  validate(message: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!message || message.trim().length === 0) {
      errors.push('Commit message cannot be empty');
      return { isValid: false, errors };
    }

    const firstLine = message.split('\n')[0];

    if (!this.commitRegex.test(firstLine)) {
      errors.push('Invalid format. Expected: <type>(<scope>): <subject>');
      errors.push('Valid types: feat, fix, docs, style, refactor, perf, test, chore');
    }

    if (firstLine.length > 72) {
      errors.push('First line should be no longer than 72 characters');
    } else if (firstLine.length > 60) {
      warnings.push('First line is approaching 72 character limit');
    }

    const lines = message.split('\n');
    if (lines.length > 1 && lines[1].trim().length > 0) {
      errors.push('Second line should be blank');
    }

    // Check body line length
    for (let i = 2; i < lines.length; i++) {
      if (lines[i].length > 100 && lines[i].trim().length > 0) {
        warnings.push(`Line ${i + 1} exceeds 100 characters (${lines[i].length})`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }
}
