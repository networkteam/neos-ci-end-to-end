import { test as base, expect, Page, Locator } from '@playwright/test';

import { FormObject } from '@neos-ci/testing';

// Declare custom fixtures to re-use setup of page and contact form
type TestFixtures = {
    contactFormPage: ContactFormPage;
    contactForm: ContactForm;
};

// Extend the base test with custom fixtures
const test = base.extend<TestFixtures>({
    contactFormPage: async ({ page }, use) => {
        const contactFormPage = new ContactFormPage(page);
        await contactFormPage.navigate();

        await use(contactFormPage);
    },

    contactForm: async ({ contactFormPage }, use) => {
        const contactForm = contactFormPage.getContactForm();
        await contactForm.isVisible();

        await use(contactForm);
    },
});

class ContactFormPage {
  page: Page;

  constructor(page: Page) {
      this.page = page;
  }

  async navigate() {
      await this.page.goto('/en/features/forms.html');
  }

  getContactForm() {
      return new ContactForm(this.page);
  }
}

class ContactForm extends FormObject {
  readonly message: Locator;

  constructor(page: Page) {
      super(page.locator('form', { has: page.locator('legend', { hasText: 'Contact' }) }));
      this.message = page.locator('.contact-form__message');
  }
}

test.describe('ContactForm', () => {
    test('success', async ({ contactForm }) => {
        await contactForm.fillField('Name', 'Christopher');
        await contactForm.fillField('Email', 'j.doe@example.com');
        await contactForm.fillField('Message', 'Hi there, this is a test!');

        await contactForm.getSubmitButton().click();

        await expect(contactForm.message).toHaveText('Thank you!');
    });

    test.describe('validation', () => {
        test('required field', async ({ contactForm }) => {
            await contactForm.fillField('Name', 'Christopher');
            await contactForm.fillField('Email', 'j.doe@example.com');

            await contactForm.getSubmitButton().click();

            await expect(contactForm.errorFor('Message')).toHaveText('This property is required');
        });

        test('email field', async ({ contactForm }) => {
            await contactForm.fillField('Email', 'invalid');

            await contactForm.getSubmitButton().click();

            await expect(contactForm.errorFor('Email')).toHaveText('Please specify a valid email address');
        });
    });
});