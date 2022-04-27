import { expect, Locator } from "@playwright/test";

export class FormObject {
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

export const buildComponentPreviewURL = (
  prototypeName: string,
  sitePackageKey: string,
  props: object = {}
): string => {
  return `/monocle/preview/index?prototypeName=${encodeURIComponent(
    prototypeName
  )}&propSet=__default&useCase=__default&sitePackageKey=${sitePackageKey}&locales=&props=${encodeURIComponent(
    JSON.stringify(props)
  )}`;
};
