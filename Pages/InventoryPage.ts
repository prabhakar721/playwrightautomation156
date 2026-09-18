import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {

    private readonly page: Page;

    private readonly backpackAddToCart: Locator;
    private readonly shoppingCart: Locator;

    constructor(page: Page) {
        this.page = page;

        this.backpackAddToCart =
            page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');

        this.shoppingCart =
            page.locator('[data-test="shopping-cart-link"]');
    }

    async verifyBackpackAddToCart(): Promise<void> {
        await expect(this.backpackAddToCart).toBeVisible();
    }

    async addBackpackToCart(): Promise<void> {
        await this.backpackAddToCart.click();
    }

    async verifyShoppingCart(): Promise<void> {
        await expect(this.shoppingCart).toBeVisible();
    }

    async openShoppingCart(): Promise<void> {
        await this.shoppingCart.click();
    }
}