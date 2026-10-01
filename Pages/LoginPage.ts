import { Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async loginToSwag(userNameData: string, passwordData: string): Promise<void> {
        await this.navigate();
        await this.userName.fill(userNameData);
        await this.password.fill(passwordData);
    }

    async login(username: string, password: string): Promise<void> {
        await this.navigate();
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async ClicksLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async enterUsername(username: string): Promise<void> {
        await this.userName.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.password.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }
}

export class SwagLoginPage extends LoginPage {}
