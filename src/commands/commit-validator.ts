export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class CommitValidator {
  private readonly commitRegex =
    /^(feat|fix|docs|style|refactor|perf|test|chore)(\([a-z0-9\-]*\))?:\s.+/;

  validate(message: string): ValidationResult {
    const errors: string[] = [];

    if (!message || message.trim().length === 0) {
      errors.push("Commit message cannot be empty");
      return { isValid: false, errors };
    }

    const firstLine = message.split("\n")[0];

    if (!this.commitRegex.test(firstLine)) {
      errors.push(
        "Invalid format. Expected: <type>(<scope>): <subject>"
      );
      errors.push("Valid types: feat, fix, docs, style, refactor, perf, test, chore");
    }

    if (firstLine.length > 72) {
      errors.push("First line should be no longer than 72 characters");
    }

    const lines = message.split("\n");
    if (lines.length > 1 && lines[1].trim().length > 0) {
      errors.push("Second line should be blank");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
