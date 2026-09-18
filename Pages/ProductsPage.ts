import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {
    private readonly page: Page;

    private readonly backpack: Locator;
    private readonly fleeceJacket: Locator;
    private readonly bikeLight: Locator;
    private readonly shoppingCart: Locator;

    constructor(page: Page) {
        this.page = page;

        this.backpack = page.locator(
            '[data-test="add-to-cart-sauce-labs-backpack"]'
        );

        this.fleeceJacket = page.locator(
            '[data-test="add-to-cart-sauce-labs-fleece-jacket"]'
        );

        this.bikeLight = page.locator(
            '[data-test="add-to-cart-sauce-labs-bike-light"]'
        );

        this.shoppingCart = page.locator(
            '[data-test="shopping-cart-link"]'
        );
    }

    async verifyProducts(): Promise<void> {
        await expect(this.backpack).toBeVisible();
        await expect(this.fleeceJacket).toBeVisible();
        await expect(this.shoppingCart).toBeVisible();
    }

    async addBackpack(): Promise<void> {
        await this.backpack.click();
    }

    async addBikeLight(): Promise<void> {
        await this.bikeLight.click();
    }

    async openCart(): Promise<void> {
        await this.shoppingCart.click();
    }
}