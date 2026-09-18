import {test, expect} from "@playwright/test"
import { LoginPage } from "../Pages/Loginpage"
import { Productpage } from "../Pages/Productpage"
import { YourCartpage } from "../Pages/YourCartpage"
import { CheckoutContinuePage } from "../Pages/CheckoutContinuePage"
import { Checkoutfinishpage } from "../Pages/Checkoutfinishpage"

test("finish page In POM",async({page},testInfo)=>{
    const loginPage = new LoginPage(page);
   const productpage = new Productpage(page);
   const yourcartpage = new YourCartpage(page);
   const checkoutcontinuepage = new CheckoutContinuePage(page);
   const checkoutfinishpage = new Checkoutfinishpage(page);
   let step = 1
    let stepNo=1
    await test.step(`STEP ${stepNo++}- Enter username and password `, async () => {
        await loginPage.loginToSwag("standard_user", "secret_sauce");
        const screenshot = await page.screenshot();
        await testInfo.attach(`STEP ${step++}- Enter username and password `, { body: screenshot, contentType: 'image/png' });
    });
    await test.step(`STEP ${stepNo++}-Click Login`, async () => {
        await loginPage.ClicksLoginButton();
        await expect(page.locator("//span[@data-test='title']")).toHaveText("Products");
        const screenshot = await page.screenshot();
        await testInfo.attach(`STEP ${step++}-Click login`, { body: screenshot, contentType: 'image/png' });
    });

    await test.step(`STEP ${stepNo++}- Click Add to cart`, async () => {
        await productpage.Addtocart();
         await expect(page.locator("//span[@data-test='shopping-cart-badge' and text()='1']")).toHaveText("1");
        const screenshot = await page.screenshot();
        await testInfo.attach(`STEP ${step++}- Click Add to cart`, { body: screenshot, contentType: 'image/png' });
    });
    await test.step(`STEP ${stepNo++}- Click Shopping cart`, async () => {
        await productpage.Addtocartclick1();
        await expect(page.locator("//span[@data-test='title']")).toHaveText("Your Cart");
        const screenshot = await page.screenshot();
        await testInfo.attach(`STEP ${step++}- Click Shopping cart`, { body: screenshot, contentType: 'image/png' });
    });
    await test.step(`STEP ${stepNo++}- Click Checkout`, async () => {
        await yourcartpage.checkout();
        await expect(page.locator("//span[@data-test='title']")).toHaveText("Checkout: Your Information");
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
         await expect(page.locator("//span[@data-test='title']")).toHaveText("Checkout: Overview");
        const screenshot = await page.screenshot();
        await testInfo.attach(`STEP ${step++}- Click continue`, { body: screenshot, contentType: 'image/png' });
    });
await test.step(`STEP ${stepNo++}- Click finish`, async () => {
         await checkoutfinishpage.clickfinish();
       await expect(page.locator("//h2[@data-test='complete-header']")).toHaveText("Thank you for your order!");  
        const screenshot = await page.screenshot();
        await testInfo.attach(`STEP ${step++}- Click finish`, { body: screenshot, contentType: 'image/png' });
    });
  
  

})