import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('Reject locked-out user credentials', async ({ page }) => {
    // 1. Start from a fresh browser context and navigate to the application.
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();

    // 2. Enter locked-out credentials and submit the form.
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('alert')).toContainText('Epic sadface: Sorry, this user has been locked out.');
    await expect(page.locator('[data-test="title"]')).toHaveCount(0);
  });
});