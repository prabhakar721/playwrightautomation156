import { test } from '@playwright/test';

import { SwagLoginPage } from '../Pages/LoginPage';
import { ProductsPage } from '../Pages/ProductsPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage';

import testData from '../TestData/saucedemo.json';

test('SauceDemo checkout flow', async ({ page }) => {

    const loginPage = new SwagLoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.navigate();

    await loginPage.login(
        testData.validUser.username,
        testData.validUser.password
    );

    // Product validation
    await productsPage.verifyProducts();

    // Add products
    await productsPage.addBackpack();
    await productsPage.addBikeLight();

    // Open cart
    await productsPage.openCart();

    // Checkout
    await cartPage.checkout();

    // Customer details
    await checkoutPage.enterCustomerDetails(
        testData.customer
    );

    await checkoutPage.continueToOverview();

    // Finish order
    await checkoutPage.finishOrder();

    // Back to products
    await checkoutPage.backToProducts();
});