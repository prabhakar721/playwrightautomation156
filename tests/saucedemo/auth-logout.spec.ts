import { test, expect } from '@playwright/test';
import { login } from './test-helpers';

test.describe('Authentication', () => {
  test('Logout clears the authenticated session', async ({ page }) => {
    // 1. Log in with standard_user and secret_sauce.
    await login(page);
    await expect(page).toHaveURL(/\/inventory\.html$/);

    // 2. Open the menu and click Logout.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect(page.locator('[data-test="inventory-container"]')).toHaveCount(0);
  });
});