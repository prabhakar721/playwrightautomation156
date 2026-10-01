import { test, expect } from '@playwright/test';

test.describe('Sauce Demo checkout flow', () => {
  test('Complete checkout with standard user', async ({ page }) => {
    // 1. Open https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');

    // 2. Login with username standard_user and password secret_sauce.
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');

    // 3. Click Login.
    await page.locator('#login-button').click();

    // 4. Click Add to cart for any product.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 5. Click the selected cart icon at the top.
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 6. Click Checkout.
    await page.locator('[data-test="checkout"]').click();

    // 7. Enter First Name prabha, Last Name sekar, Postal Code 600037.
    await page.locator('[data-test="firstName"]').fill('prabha');
    await page.locator('[data-test="lastName"]').fill('sekar');
    await page.locator('[data-test="postalCode"]').fill('600037');

    // 8. Click Continue.
    await page.locator('[data-test="continue"]').click();

    // 9. Click Finish.
    await page.locator('[data-test="finish"]').click();

    // 10. Verify the order completion/success message.
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.getByText('Your order has been dispatched')).toBeVisible();
  });
});
