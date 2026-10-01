import { test, expect } from '@playwright/test';
import { login } from './test-helpers';

test.describe('Catalog And Cart', () => {
  test('Browse products, sort catalog, and open product details', async ({ page }) => {
    // 1. Log in with standard_user and secret_sauce.
    await login(page);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(page.getByRole('combobox', { name: 'Sort products' })).toBeVisible();

    // 2. Change sorting through the three requested modes.
    const sort = page.getByRole('combobox', { name: 'Sort products' });
    const names = page.locator('.inventory_item_name');
    await sort.selectOption('lohi');
    await expect(sort).toHaveValue('lohi');
    await expect(names).toHaveText(['Sauce Labs Onesie', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Backpack', 'Sauce Labs Fleece Jacket']);
    await sort.selectOption('hilo');
    await expect(sort).toHaveValue('hilo');
    await expect(names).toHaveText(['Sauce Labs Fleece Jacket', 'Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt', 'Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Bike Light', 'Sauce Labs Onesie']);
    await sort.selectOption('za');
    await expect(sort).toHaveValue('za');
    await expect(names).toHaveText(['Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Onesie', 'Sauce Labs Fleece Jacket', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Bike Light', 'Sauce Labs Backpack']);

    // 3. Open the Sauce Labs Backpack product details.
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page).toHaveURL(/inventory-item\.html\?id=4$/);
    await expect(page.getByRole('img', { name: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('$29.99', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back to products' })).toBeVisible();
  });
});