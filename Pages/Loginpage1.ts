import {Page ,Locator} from '@playwright/test'

export class LoginPage {
readonly page: Page;
readonly userName: Locator;
readonly password: Locator;
readonly loginButton:Locator ;

constructor(page: Page){
  this.page =page;
  this.userName = page.locator("//input[@placeholder='Username']");
  this.password = page.locator("//input[@placeholder='Password']");
  this.loginButton = page.locator("//input[@value='Login']")
}
async loginToSwag(userNameData:string, passwordData:string): Promise<void>{
    await this.page.goto("https://www.saucedemo.com/");
    await this.userName.fill(userNameData);
    await this.password.fill(passwordData);
}
async ClicksLoginButton():Promise<void> {
    await this.loginButton.click();
}
}
