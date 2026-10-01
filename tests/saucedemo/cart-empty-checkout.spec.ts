import { test, expect, Page } from '@playwright/test';

async function login(page: Page): Promise<void> {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/\/inventory\.html$/);
}

test.describe('Checkout and Order Completion', () => {
  test('Do not complete an order from an empty cart', async ({ page }) => {
    // 1. Start from a fresh browser context, log in, and open the cart without adding a product.
    await login(page);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.getByText('Your Cart', { exact: true })).toBeVisible();
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();

    // 2. Checkout remains available, but the empty cart must not contain an order item.
    const checkoutButton = page.locator('[data-test="checkout"]');
    await expect(checkoutButton).toBeEnabled();
    await checkoutButton.click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page).not.toHaveURL(/checkout-complete\.html$/);
  });
});
