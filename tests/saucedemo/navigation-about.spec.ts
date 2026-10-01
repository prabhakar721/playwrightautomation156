import { test, expect } from '@playwright/test';
import { login } from './test-helpers';

test.describe('Navigation And Session', () => {
  test('Open About link from the navigation menu', async ({ page }) => {
    // 1. Log in and open the navigation menu.
    await login(page);
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();

    // 2. Open the Sauce Labs About destination.
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/saucelabs\.com/);
    await expect(page.locator('body')).not.toBeEmpty();
  });
});