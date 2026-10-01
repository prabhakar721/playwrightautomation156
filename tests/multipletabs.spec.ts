import { expect, test, chromium } from "playwright/test";

test("Handling multiple tabs", async ({}) => {

    const browser = await chromium.launch();

    const context = await browser.newContext();

    const page1 = await context.newPage();
  
    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page1).toHaveTitle("OrangeHRM");
   const pagePromise=context.waitForEvent('page')
    await page1.getByRole('link', { name: 'OrangeHRM, Inc' }).click();
    const  newpage=await pagePromise;
    await(expect(newpage).toHaveTitle("OrangeHRM: All in One HR Software for Businesses | OrangeHRM"));
    
});