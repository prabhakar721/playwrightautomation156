import { test, expect } from '@playwright/test';
import { login } from './test-helpers';

test.describe('Catalog And Cart', () => {
  test('Add and review an item in the cart', async ({ page }) => {
    // 1. Log in and open the Sauce Labs Backpack details.
    await login(page);
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page).toHaveURL(/inventory-item\.html\?id=4$/);

    // 2. Add the backpack and open the shopping cart.
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
    await page.getByRole('button', { name: 'Cart, 1 items' }).click();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.locator('.cart_quantity')).toHaveText('1');
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('$29.99', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();

    // 3. Continue shopping and retain the cart item.
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
  });
});