import {Page ,Locator} from '@playwright/test'

export class YourCartpage {
readonly page: Page;
readonly checkoutbutton: Locator;

constructor(page: Page){
  this.page =page;
  this.checkoutbutton = page.locator("//button[@id='checkout']");
  
}
async checkout(): Promise<void> {

    await this.checkoutbutton.click();

    }

}