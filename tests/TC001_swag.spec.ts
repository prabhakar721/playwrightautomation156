
import { test, expect, chromium } from "@playwright/test"

test("Swag Web Application LogIn",async({page})=>{
   await page.goto('https://www.saucedemo.com/');
   await expect(page.locator("//div[normalize-space()='Swag Labs']")).toBeVisible();
   await expect(page.locator("//input[@placeholder='Username']")).toBeVisible();
   await page.locator("//input[@placeholder='Username']").fill("standard_user");
   await expect(page.locator("//input[@placeholder='Password']")).toBeVisible();
   await page.locator("//input[@placeholder='Password']").fill('secret_sauce');
   await expect(page.locator("//input[@id='login-button']")).toBeVisible()
   await page.locator("//input[@id='login-button']").click();
   await expect(page.locator("text='Products'")).toBeVisible();
});

test("Swag Web Application LogIn2",async()=>{
   const browser = await chromium.launch();
   const context = await browser.newContext();
   const page    = await context.newPage();
   await page.goto('https://www.saucedemo.com/');
   await expect(page.locator("//div[normalize-space()='Swag Labs']")).toBeVisible();
   await expect(page.locator("//input[@placeholder='Username']")).toBeVisible();
   await page.locator("//input[@placeholder='Username']").fill("standard_user");
   await expect(page.locator("//input[@placeholder='Password']")).toBeVisible();
   await page.locator("//input[@placeholder='Password']").fill('secret_sauce');
   await expect(page.locator("//input[@id='login-button']")).toBeVisible()
   await page.locator("//input[@id='login-button']").click();
   await expect(page.locator("text='Products'")).toBeVisible();
   await page.pause();
   await browser.close();
});