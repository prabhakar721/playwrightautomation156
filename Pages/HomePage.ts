import {
    Page,
    Locator,
    expect
} from '@playwright/test';

export class HomePage {

    private readonly searchBox: Locator;
    private readonly addToCartButton: Locator;
    private readonly accountList: Locator;

    constructor(private readonly page: Page) {

        this.searchBox = page.getByRole('searchbox', {
            name: 'Search Amazon.in'
        });

        /*
         * Find an Amazon search-result item containing
         * an Add to Cart control.
         */
        this.addToCartButton = page
            .locator('[data-component-type="s-search-result"]')
            .filter({
                has: page.getByRole('button', {
                    name: /Add to cart/i
                })
            })
            .first()
            .getByRole('button', {
                name: /Add to cart/i
            });

        this.accountList = page.locator(
            '#nav-link-accountList'
        );
    }

    async clickSearchBox(): Promise<void> {

        await this.searchBox.click();
    }

    async searchProduct(
        product: string
    ): Promise<void> {

        await this.searchBox.fill(product);

        await this.searchBox.press('Enter');

        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyAddToCartButton(): Promise<void> {

        await expect(
            this.addToCartButton
        ).toBeVisible({
            timeout: 15000
        });
    }

    async addProductToCart(): Promise<void> {

        await this.addToCartButton.click();
    }

    async clickAccountList(): Promise<void> {

        await this.accountList.click();
    }
}
