import { test, expect, Page } from '@playwright/test';

async function openCheckout(page: Page): Promise<void> {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
}

test.describe('Checkout and Order Completion', () => {
  test('Validate required checkout information', async ({ page }) => {
    // 1. Start from a fresh browser context, log in, add one product, open the cart, and click Checkout.
    await openCheckout(page);
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Zip/Postal Code' })).toBeVisible();

    // 2. Leave First Name, Last Name, and Postal Code empty and click Continue.
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.getByRole('alert')).toContainText('First Name is required');

    // 3. Enter prabha in First Name, leave Last Name and Postal Code empty, and click Continue.
    await page.locator('[data-test="firstName"]').fill('prabha');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.getByRole('alert')).toContainText('Last Name is required');

    // 4. Enter sekar in Last Name, leave Postal Code empty, and click Continue.
    await page.locator('[data-test="lastName"]').fill('sekar');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.getByRole('alert')).toContainText('Postal Code is required');
  });
});
