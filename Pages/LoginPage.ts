import {Page,Locator,expect} from '@playwright/test';
export class LoginPage {

    private readonly accountList: Locator;
    private readonly usernameTextbox: Locator;
    private readonly continueButton: Locator;
    private readonly passwordTextbox: Locator;
    private readonly signInButton: Locator;

    constructor(private readonly page: Page) {

        this.accountList = page.getByRole('link', {
            name: 'Hello, sign in Account & Lists'
        });

        this.usernameTextbox = page.getByRole('textbox', {
            name: 'Enter mobile number or email'
        });

        this.continueButton = page.locator('#continue');

        this.passwordTextbox = page.getByRole('textbox', {
            name: 'Password'
        });

        this.signInButton = page.getByRole('button', {
            name: 'Sign in',
            exact: true
        });
    }

    async clickAccountList(): Promise<void> {
        await this.accountList.click();
    }

    async verifyUsernameField(): Promise<void> {
        await expect(
            this.usernameTextbox
        ).toBeVisible();
    }

    async enterUsername(
        username: string
    ): Promise<void> {

        await this.usernameTextbox.fill(username);
    }

    async clickContinue(): Promise<void> {
        
        await this.continueButton.click();
    }

    async verifyPasswordField(): Promise<void> {
        await expect(this.passwordTextbox).toBeVisible();
    }

    async enterPassword(
        password: string
    ): Promise<void> {

        await this.passwordTextbox.fill(password);
    }

    async verifySignInButton(): Promise<void> {
        await expect(this.signInButton).toBeVisible();
    }

    async clickSignIn(): Promise<void> {
        await this.signInButton.click();
    }
}