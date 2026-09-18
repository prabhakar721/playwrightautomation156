import {test, expect} from "@playwright/test"
import { LoginPage } from "../Pages/Loginpage"
import { Productpage } from "../Pages/Productpage"
import { YourCartpage } from "../Pages/YourCartpage"

test("Swaglab YourCartpage In POM",async({page})=>{
    const loginPage = new LoginPage(page);
   const productpage = new Productpage(page);
   const yourcartpage = new YourCartpage(page);
   await loginPage.loginToSwag("standard_user", "secret_sauce");
  await loginPage.ClicksLoginButton();
   await productpage.Addtocart();
   await productpage.Addtocartclick1();
   await yourcartpage.checkout();

})