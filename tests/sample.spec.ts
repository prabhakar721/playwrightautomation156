import { test , expect} from '@playwright/test';
test('test',async({page})=>
{
await page.goto('https://www.saucedemo.com/');
await page.locator("//input[@placeholder='Username']").fill("standard_user");
await page.locator("//input[@placeholder='Password']").fill("secret_sauce");
await expect(page.locator("//input[@id='login-button']")).toBeEnabled();
await page.locator("//input[@id='login-button']").click();
await page.locator("//button[@id='add-to-cart-sauce-labs-backpack']").click();
await page.locator("//a[@data-test='shopping-cart-link']").click();
await page.locator("//button[@id='checkout']").click();
await page.locator("//input[@placeholder='First Name']").fill("prabha");
await page.locator("//input[@placeholder='Last Name']").fill("sekar");
await page.locator("//input[@id='postal-code']").fill("600037");
await page.locator("//input[@id='continue']").click();
await page.locator("//button[@id='finish']").click();
await page.locator("//button[@id='back-to-products']").click();

});