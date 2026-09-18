import {test, expect} from "@playwright/test"
import {LoginPage } from "../Pages/Loginpage"

test("Swaglab Login In POM",async({page})=>{
   const loginPage = new LoginPage(page)

   await loginPage.loginToSwag("standard_user","secret_sauce");
   await loginPage.ClicksLoginButton();

})