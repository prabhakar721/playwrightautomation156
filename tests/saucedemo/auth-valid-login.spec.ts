import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('Login with valid standard user credentials', async ({ page }) => {
    // 1. Start from a fresh browser context and navigate to the application.
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 2. Enter valid credentials and log in.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });
});