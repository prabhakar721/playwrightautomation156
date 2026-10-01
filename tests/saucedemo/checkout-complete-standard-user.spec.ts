import { test, expect } from '@playwright/test';

test.describe('Checkout and Order Completion', () => {
  test('Complete checkout with a standard user', async ({ page }) => {
    // 1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 2. Enter standard_user in Username and secret_sauce in Password.
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await expect(page.locator('#user-name')).toHaveValue('standard_user');
    await expect(page.locator('#password')).toHaveValue('secret_sauce');

    // 3. Click Login.
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();

    // 4. Click Add to cart for any product, such as Sauce Labs Backpack.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();

    // 5. Click the selected cart icon at the top.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.getByText('Your Cart', { exact: true })).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();

    // 6. Click Checkout.
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Zip/Postal Code' })).toBeVisible();
    await expect(page.locator('[data-test="continue"]')).toBeVisible();
    await expect(page.locator('[data-test="cancel"]')).toBeVisible();

    // 7. Enter prabha in First Name, sekar in Last Name, and 600037 in Postal Code.
    await page.locator('[data-test="firstName"]').fill('prabha');
    await page.locator('[data-test="lastName"]').fill('sekar');
    await page.locator('[data-test="postalCode"]').fill('600037');
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('prabha');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('sekar');
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue('600037');

    // 8. Click Continue.
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(page.getByText('Checkout: Overview', { exact: true })).toBeVisible();
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('[data-test="finish"]')).toBeVisible();

    // 9. Click Finish.
    await page.locator('[data-test="finish"]').click();

    // 10. Verify the order completion/success message.
    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(page.getByText('Checkout: Complete!', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
  });
});
