import { expect, Locator } from "@playwright/test";

export default class FormObject {
  protected form: Locator;

  constructor(form: Locator) {
    this.form = form;
  }

  async isVisible() {
    await expect(this.form).toBeVisible();
  }

  getField(label: string) {
    return this.form.locator(
      `.form-group:has(label:has-text("${label}")) .form-control`
    );
  }

  errorFor(label: string) {
    return this.form.locator(
      `.form-group:has(label:has-text("${label}")) .errors`
    );
  }

  async fillField(label: string, value: string) {
    const field = this.getField(label);
    await expect(field).toBeVisible();
    await field.fill(value);
  }

  getSubmitButton() {
    return this.form.locator('button[type="submit"]');
  }

  getButton() {
    return this.form.locator('button[type="button"]');
  }
}
