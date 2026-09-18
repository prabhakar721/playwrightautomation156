import { test, expect } from "@playwright/test"
import { LoginPage } from "../Pages/Loginpage"
import { Productpage } from "../Pages/Productpage"
import { YourCartpage } from "../Pages/YourCartpage"
import { CheckoutContinuePage } from "../Pages/CheckoutContinuePage"

test("Swaglab labs flow In POM", async ({ page }, testInfo) => {

    const loginPage = new LoginPage(page);
    const productpage = new Productpage(page);
    const yourcartpage = new YourCartpage(page);
    const checkoutcontinuepage = new CheckoutContinuePage(page);
    let step = 1
    let stepNo=1
    await test.step(`STEP ${stepNo++}- Enter username and password `, async () => {
        await loginPage.loginToSwag("standard_user", "secret_sauce");
        const screenshot = await page.screenshot();
        await testInfo.attach(`STEP ${step++}- Enter username and password `, { body: screenshot, contentType: 'image/png' });
    });
    await test.step(`STEP ${stepNo++}-Click Login`, async () => {
        await loginPage.ClicksLoginButton();
        const screenshot = await page.screenshot();
        await testInfo.attach(`STEP ${step++}-Click login`, { body: screenshot, contentType: 'image/png' });
    });

    await test.step(`STEP ${stepNo++}- Click Add to cart`, async () => {
        await productpage.Addtocart();
        const screenshot = await page.screenshot();
        await testInfo.attach(`STEP ${step++}- Click Add to cart`, { body: screenshot, contentType: 'image/png' });
    });
    await test.step(`STEP ${stepNo++}- Click Shopping cart`, async () => {
        await productpage.Addtocartclick1();
        const screenshot = await page.screenshot();
        await testInfo.attach(`STEP ${step++}- Click Shopping cart`, { body: screenshot, contentType: 'image/png' });
    });
    await test.step(`STEP ${stepNo++}- Click Checkout`, async () => {
        await yourcartpage.checkout();
        const screenshot = await page.screenshot();
        await testInfo.attach(`STEP ${step++}- Click Checkout`, { body: screenshot, contentType: 'image/png' });
    });

    await test.step(`STEP ${stepNo++}-Enter firstname,last name,postal code`, async () => {
        await checkoutcontinuepage.checkoutinf("prabha", "kumar", "600037");
        const screenshot = await page.screenshot();
        await testInfo.attach(`STEP ${step++}-Enter firstname,last name,postal code `, { body: screenshot, contentType: 'image/png' });
    });
    await test.step(`STEP ${stepNo++}- Click continue`, async () => {
        await checkoutcontinuepage.ClicksContinueButton();
        const screenshot = await page.screenshot();
        await testInfo.attach(`STEP ${step++}- Click continue`, { body: screenshot, contentType: 'image/png' });
    });


})