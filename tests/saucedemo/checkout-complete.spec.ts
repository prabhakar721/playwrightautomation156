import { test, expect } from '@playwright/test';
import { startCheckout } from './test-helpers';

test.describe('Checkout', () => {
  test('Complete checkout for one product', async ({ page }) => {
    // 1. Log in, add the backpack, open the cart, and click Checkout.
    await startCheckout(page);
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(page.getByText('Checkout: Your Information', { exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Zip/Postal Code' })).toBeVisible();

    // 2. Enter customer information and continue to the overview.
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/checkout-step-two\.html$/);
    await expect(page.getByText('Checkout: Overview', { exact: true })).toBeVisible();
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.getByText('SauceCard #31337', { exact: true })).toBeVisible();
    await expect(page.getByText('Free Pony Express Delivery!', { exact: true })).toBeVisible();
    await expect(page.getByText('Item total: $29.99', { exact: true })).toBeVisible();
    await expect(page.getByText('Tax: $2.40', { exact: true })).toBeVisible();
    await expect(page.getByText('Total: $32.39', { exact: true })).toBeVisible();

    // 3. Finish the order.
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(page.getByText('Checkout: Complete!', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.getByText('Your order has been dispatched')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Back Home' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Generate PDF order' })).toBeVisible();
  });
});