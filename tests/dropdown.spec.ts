import {test} from"playwright/test";
test('dropdown test',async({page})=>{
    await page.goto("https://senthilsmartqahub.blogspot.com/2026/02/online-store.html");
    await page.locator('#payment').selectOption({index:2});
   await page.screenshot({ path: 'screenshot2.png', fullPage: true });
   await page.waitForTimeout(5000);
});