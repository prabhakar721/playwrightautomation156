import{Page,Locator} from "playwright/test";
export class ProductPage03
{
    readonly page:Page;
    readonly addtocartoption:Locator;
    readonly addtocartclick:Locator;
    constructor(page:Page)
    {
        this.page=page;
        this.addtocartoption=page.locator("//button[@id='add-to-cart-sauce-labs-backpack']");
        this.addtocartclick=page.locator("//a[@data-test='shopping-cart-link']");
    }
    async addtocart():Promise<void>
    {
        await this.addtocartoption.click();
    }
    async cartclick():Promise<void>
    {
        await this.addtocartclick.click()
    }
}