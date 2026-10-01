import {test,expect} from "playwright/test"
import{loginPage03} from "../Pages/loginPage03"
import data from "../TestData/sauceDemo1.json"
import { ProductPage03 } from "../Pages/ProductPage03";
import { YourCartpage } from "../Pages/YourCartpage";
import { CheckoutContinuePage } from "../Pages/CheckoutContinuePage";
import { Checkoutfinishpage } from "../Pages/Checkoutfinishpage";

test("Login to sauce demo",async({page},testInfo)=>
    {
    const loginpage03=new loginPage03(page);
    const productpage03=new ProductPage03(page);
    const yourcartpage=new YourCartpage(page);
    const checkoutcontinuepage=new CheckoutContinuePage(page);
    const checkoutfinishpage=new Checkoutfinishpage(page);
    let step=1;
    let stepNo=1;
    await test.step(`STEP ${stepNo++}-Enter username and password`,async()=>{
        await loginpage03.logintosauce(data.login.username,data.login.password);
        const screenshot=await page.screenshot({path:'screenshot01.png'});
        await testInfo.attach(`STEP ${step++}-Enter username and password`,{body:screenshot,contentType:'image/png'})
 await test.step(`STEP ${stepNo++}-Click Login`, async () => {
        await loginpage03.clickLoginButton();
        await expect(page.locator("//span[@data-test='title']")).toHaveText("Products");
        const screenshot = await page.screenshot({path:'screenshot02.png'});
        await testInfo.attach(`STEP ${step++}-Click login`, { body: screenshot, contentType: 'image/png' });
    });

    await test.step(`STEP ${stepNo++}- Click Add to cart`, async () => {
        await productpage03.addtocart();
         await expect(page.locator("//span[@data-test='shopping-cart-badge' and text()='1']")).toHaveText("1");
        const screenshot = await page.screenshot({path:'screenshot03.png'});
        await testInfo.attach(`STEP ${step++}- Click Add to cart`, { body: screenshot, contentType: 'image/png' });
    });
    await test.step(`STEP ${stepNo++}- Click Shopping cart`, async () => {
        await productpage03.cartclick();
        await expect(page.locator("//span[@data-test='title']")).toHaveText("Your Cart");
        const screenshot = await page.screenshot({path:'screenshot04.png'});
        await testInfo.attach(`STEP ${step++}- Click Shopping cart`, { body: screenshot, contentType: 'image/png' });
    });
    await test.step(`STEP ${stepNo++}- Click Checkout`, async () => {
        await yourcartpage.checkout();
        await expect(page.locator("//span[@data-test='title']")).toHaveText("Checkout: Your Information");
        const screenshot = await page.screenshot({path:'screenshot05.png'});
        await testInfo.attach(`STEP ${step++}- Click Checkout`, { body: screenshot, contentType: 'image/png' });
    });

    await test.step(`STEP ${stepNo++}-Enter firstname,last name,postal code`, async () => {
        await checkoutcontinuepage.checkoutinf(data.customerinfo.firstName,data.customerinfo.lastName,data.customerinfo.postalCode);
        const screenshot = await page.screenshot({path:'screenshot06.png'});
        await testInfo.attach(`STEP ${step++}-Enter firstname,last name,postal code `, { body: screenshot, contentType: 'image/png' });
    });
    await test.step(`STEP ${stepNo++}- Click continue`, async () => {
        await checkoutcontinuepage.ClicksContinueButton();
         await expect(page.locator("//span[@data-test='title']")).toHaveText("Checkout: Overview");
        const screenshot = await page.screenshot({path:'screenshot07.png'});
        await testInfo.attach(`STEP ${step++}- Click continue`, { body: screenshot, contentType: 'image/png' });
    });
await test.step(`STEP ${stepNo++}- Click finish`, async () => {
         await checkoutfinishpage.clickfinish();
       await expect(page.locator("//h2[@data-test='complete-header']")).toHaveText("Thank you for your order!");  
        const screenshot = await page.screenshot({path:'screenshot08.png'});
        await testInfo.attach(`STEP ${step++}- Click finish`, { body: screenshot, contentType: 'image/png' });
    });
  
  

       
});
});