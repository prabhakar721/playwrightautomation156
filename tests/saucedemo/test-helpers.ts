import { Page } from '@playwright/test';
import testData from '../../data/saucedemo.json';

export async function login(page: Page, username = testData.login.username, password = testData.login.password): Promise<void> {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

export async function addBackpackAndOpenCart(page: Page): Promise<void> {
  await login(page);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
}

export async function startCheckout(page: Page): Promise<void> {
  await addBackpackAndOpenCart(page);
  await page.locator('[data-test="checkout"]').click();
}

export async function completeCheckout(page: Page): Promise<void> {
  await startCheckout(page);
  await page.locator('[data-test="firstName"]').fill('Ada');
  await page.locator('[data-test="lastName"]').fill('Lovelace');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
}