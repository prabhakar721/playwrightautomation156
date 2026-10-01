import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('Require username on empty login submission', async ({ page }) => {
    // 1. Start from a fresh browser context and navigate to the application.
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();

    // 2. Leave Username and Password empty and submit the form.
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('alert')).toContainText('Epic sadface: Username is required');
  });
});