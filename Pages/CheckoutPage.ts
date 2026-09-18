import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {

    private readonly page: Page;

    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly postalCode: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.firstName =
            page.locator('[data-test="firstName"]');

        this.lastName =
            page.locator('[data-test="lastName"]');

        this.postalCode =
            page.locator('[data-test="postalCode"]');

        this.continueButton =
            page.locator('[data-test="continue"]');

        this.finishButton =
            page.locator('[data-test="finish"]');
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.firstName.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastName.fill(lastName);
    }

    async enterPostalCode(postalCode: string): Promise<void> {
        await this.postalCode.fill(postalCode);
    }

    async verifyContinueButton(): Promise<void> {
        await expect(this.continueButton).toBeVisible();
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async verifyFinishButton(): Promise<void> {
        await expect(this.finishButton).toBeVisible();
    }

    async clickFinish(): Promise<void> {
        await this.finishButton.click();
    }
}