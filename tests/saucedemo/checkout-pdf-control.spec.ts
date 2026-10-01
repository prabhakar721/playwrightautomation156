import { test, expect } from '@playwright/test';
import { completeCheckout } from './test-helpers';

test.describe('Checkout', () => {
  test('Generate PDF order control is available after completion', async ({ page }) => {
    // 1. Complete a valid one-item checkout.
    await completeCheckout(page);
    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();

    // 2. Generate the PDF order document.
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Generate PDF order' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
  });
});