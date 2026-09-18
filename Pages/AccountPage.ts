import { Page } from '@playwright/test';

export class AccountPage {

    constructor(private readonly page: Page) {
    }

    async verifyAccountPage(): Promise<void> {
        // Add account page validation here
    }
}