import { test, expect } from '@playwright/test';
import { login } from './test-helpers';

test.describe('Navigation And Session', () => {
  test('Navigate between all items and product details', async ({ page }) => {
    // 1. Log in and open a product detail page.
    await login(page);
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page).toHaveURL(/inventory-item\.html\?id=4$/);

    // 2. Return to the Products view.
    await page.getByRole('button', { name: 'Back to products' }).click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6);

    // 3. Open the menu and select All Items.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('button', { name: 'All Items' }).click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });
});