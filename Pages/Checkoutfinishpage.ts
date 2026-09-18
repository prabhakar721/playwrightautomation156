import {Page ,Locator} from '@playwright/test'

export class Checkoutfinishpage {
readonly page: Page;
readonly finishorder: Locator;

constructor(page: Page){
  this.page =page;
  this.finishorder = page.locator("//button[@id='finish']");
  
}
async clickfinish(): Promise<void> {

    await this.finishorder.click();

    }

}