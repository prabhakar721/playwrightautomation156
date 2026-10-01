import { test, expect } from '@playwright/test';
import { login } from './test-helpers';

test.describe('Catalog And Cart', () => {
  test('Reset application state removes cart data', async ({ page }) => {
    // 1. Log in, add the backpack, and open the navigation menu.
    await login(page);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.getByRole('button', { name: 'Reset App State' })).toBeVisible();

    // 2. Reset the application state.
    await page.getByRole('button', { name: 'Reset App State' }).click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
  });
});