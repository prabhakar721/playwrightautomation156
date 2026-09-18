import { test } from '@playwright/test';

import { LoginPage } from '../Pages/LoginPage';
import { HomePage } from '../Pages/HomePage';
import { TestUtils } from '../Utils/TestUtils';

import testData from '../TestData/amazonTestData.json';

test.describe('Amazon Login and Product Search', () => {

    test(
        'TC001 - Login and search product',
        async ({ page }, testInfo) => {

            const loginPage = new LoginPage(page);
            const homePage = new HomePage(page);
            const utils = new TestUtils(page, testInfo);

            await utils.executeStep(
                'Open Amazon application',
                async () => {
                    await page.goto(testData.amazon.url);
                }
            );

            await utils.executeStep(
                'Click Account & Lists',
                async () => {
                    await loginPage.clickAccountList();
                }
            );

            await utils.executeStep(
                'Verify username field is displayed',
                async () => {
                    await loginPage.verifyUsernameField();
                }
            );

            await utils.executeStep(
                'Enter username',
                async () => {
                    await loginPage.enterUsername(
                        testData.amazon.username
                    );
                }
            );

            await utils.executeStep(
                'Click Continue',
                async () => {
                    await loginPage.clickContinue();
                }
            );

            await utils.executeStep(
                'Verify password field is displayed',
                async () => {
                    await loginPage.verifyPasswordField();
                }
            );

            await utils.executeStep(
                'Enter password',
                async () => {
                    await loginPage.enterPassword(
                        testData.amazon.password
                    );
                }
            );

            await utils.executeStep(
                'Verify Sign In button',
                async () => {
                    await loginPage.verifySignInButton();
                }
            );

            await utils.executeStep(
                'Click Sign In',
                async () => {
                    await loginPage.clickSignIn();
                }
            );

            await utils.executeStep(
                'Click Amazon search box',
                async () => {
                    await homePage.clickSearchBox();
                }
            );

            await utils.executeStep(
                'Search for product',
                async () => {
                    await homePage.searchProduct(
                        testData.amazon.searchProduct
                    );
                }
            );

            await utils.executeStep(
                'Verify Add to Cart button is displayed',
                async () => {
                    await homePage.verifyAddToCartButton();
                }
            );

            await utils.executeStep(
                'Add product to cart',
                async () => {
                    await homePage.addProductToCart();
                }
            );

            await utils.executeStep(
                'Click Account & Lists',
                async () => {
                    await homePage.clickAccountList();
                }
            );
        }
    );
});