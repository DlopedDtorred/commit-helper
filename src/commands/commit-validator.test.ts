import { describe, it, expect } from "vitest";
import { CommitValidator } from "../src/commands/commit-validator";

describe("CommitValidator", () => {
  const validator = new CommitValidator();

  it("should validate a correct commit message", () => {
    const result = validator.validate("feat(auth): add user login");
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it("should reject empty messages", () => {
    const result = validator.validate("");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Commit message cannot be empty");
  });

  it("should reject invalid type", () => {
    const result = validator.validate("awesome(auth): add user login");
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("should accept commit with scope", () => {
    const result = validator.validate("fix(ui): correct button alignment");
    expect(result.isValid).toBe(true);
  });

  it("should accept commit without scope", () => {
    const result = validator.validate("docs: update readme");
    expect(result.isValid).toBe(true);
  });

  it("should reject message longer than 72 characters", () => {
    const longMessage =
      "feat(auth): this is a very long commit message that exceeds the recommended 72 character limit";
    const result = validator.validate(longMessage);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      "First line should be no longer than 72 characters"
    );
  });

  it("should accept message with blank line and body", () => {
    const message = "feat(api): add graphql support\n\nImplement GraphQL endpoints";
    const result = validator.validate(message);
    expect(result.isValid).toBe(true);
  });
});
