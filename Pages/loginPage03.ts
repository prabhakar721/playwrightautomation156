import{Page,Locator} from "@playwright/test";
export class loginPage03
{
    readonly page:Page;
    readonly userName :Locator;
    readonly password:Locator;
    readonly loginButton:Locator;
    constructor(page:Page)
    {
        this.page=page;
        this.userName=page.locator("//input[@id='user-name']");
        this.password=page.locator("//input[@id='password']");
        this.loginButton=page.locator("//input[@id='login-button']");
    }
    async logintosauce(userNamedata:string,passwordData:string):Promise<void>
    {
        await this.page.goto("https://www.saucedemo.com/");
        await this.userName.fill(userNamedata);
        await this.password.fill(passwordData);
    }
    async clickLoginButton():Promise<void>
    {
        await this.loginButton.click();
    }

     
}