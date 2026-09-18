import {Page ,Locator} from '@playwright/test'

export class Productpage {
readonly page: Page;
readonly addtocartbutton: Locator;
readonly addtocardclick: Locator;

constructor(page: Page){
  this.page =page;
  this.addtocartbutton = page.locator("//button[@id='add-to-cart-sauce-labs-backpack']");
  this.addtocardclick = page.locator("//a[@data-test='shopping-cart-link']");
  
}
async Addtocart(): Promise<void>{
    await this.addtocartbutton.click();
   
}
async Addtocartclick1(): Promise<void>{
    await this.addtocardclick.click();
}
}