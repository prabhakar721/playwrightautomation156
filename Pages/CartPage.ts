import { expect, Locator, Page } from '@playwright/test';

export class CartPage {

    private readonly page: Page;

    private readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.checkoutButton =
            page.locator('[data-test="checkout"]');
    }

    async verifyCheckoutButton(): Promise<void> {
        await expect(this.checkoutButton).toBeVisible();
    }

    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }
}