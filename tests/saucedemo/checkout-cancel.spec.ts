import { test, expect } from '@playwright/test';
import { startCheckout } from './test-helpers';

test.describe('Checkout', () => {
  test('Cancel checkout returns to the previous shopping view', async ({ page }) => {
    // 1. Log in, add the backpack, open the cart, and click Checkout.
    await startCheckout(page);
    await expect(page.getByText('Checkout: Your Information', { exact: true })).toBeVisible();

    // 2. Cancel checkout.
    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.getByText('Your Cart', { exact: true })).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  });
});