import {Page ,Locator} from '@playwright/test'

export class CheckoutContinuePage {
readonly page: Page;
readonly firstname : Locator;
readonly lastname : Locator;
readonly postalcode : Locator;
readonly ctn : Locator;

constructor(page: Page){
  this.page =page;
  this.firstname = page.locator("//input[@id='first-name']");
  this.lastname = page.locator("//input[@id='last-name']");
  this.postalcode = page.locator("//input[@id='postal-code']");
  this.ctn = page.locator("//input[@id='continue']");
  
  
}
async checkoutinf(firstname1:string, lastname1:string,postalcode1:string): Promise<void>{
    await this.firstname.fill(firstname1);
    await this.lastname.fill(lastname1);
    await this.postalcode.fill(postalcode1);
}
async ClicksContinueButton():Promise<void> {
    await this.ctn.click();
}
}