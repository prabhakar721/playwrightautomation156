import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {

    private readonly page: Page;

    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    async navigateToLoginPage(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async verifyUsernameField(): Promise<void> {
        await expect(this.username).toBeVisible();
    }

    async enterUsername(username: string): Promise<void> {
        await this.username.fill(username);
    }

    async verifyPasswordField(): Promise<void> {
        await expect(this.password).toBeVisible();
    }

    async enterPassword(password: string): Promise<void> {
        await this.password.fill(password);
    }

    async verifyLoginButton(): Promise<void> {
        await expect(this.loginButton).toBeVisible();
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }
}