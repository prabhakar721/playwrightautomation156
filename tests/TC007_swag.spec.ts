
import { test } from "@playwright/test";

import { LoginPage } from "../Pages/Loginpage1";
import { Productpage } from "../Pages/Productpage1";
import { YourCartpage }from "../Pages/YourCartpage";
import { CheckoutContinuePage } from "../Pages/CheckoutContinuePage";

import { TestUtils } from "../Utils/TestUtils";


test("Swaglab labs flow In POM", async ({ page }, testInfo) => {

    
    const loginPage = new LoginPage(page);
    const productpage = new Productpage(page);
    const yourcartpage = new YourCartpage(page);
    const checkoutcontinuepage =
        new CheckoutContinuePage(page);


    await TestUtils.executeStep(
        page,
        testInfo,
        "Enter username and password",
        async () => {

            await loginPage.loginToSwag(
                "standard_user",
                "secret_sauce"
            );

        }
    );


    await TestUtils.executeStep(
        page,
        testInfo,
        "Click Login",
        async () => {

            await loginPage.ClicksLoginButton();

        }
    );


    await TestUtils.executeStep(
        page,
        testInfo,
        "Click Add to cart",
        async () => {

            await productpage.Addtocart();

        }
    );


    await TestUtils.executeStep(
        page,
        testInfo,
        "Click Shopping cart",
        async () => {

            await productpage.Addtocartclick1();

        }
    );


    await TestUtils.executeStep(
        page,
        testInfo,
        "Click Checkout",
        async () => {

            await yourcartpage.checkout();

        }
    );


    await TestUtils.executeStep(
        page,
        testInfo,
        "Enter firstname, lastname and postal code",
        async () => {

            await checkoutcontinuepage.checkoutinf(
                "prabha",
                "kumar",
                "600037"
            );

        }
    );


    await TestUtils.executeStep(
        page,
        testInfo,
        "Click Continue",
        async () => {

            await checkoutcontinuepage.ClicksContinueButton();

        }
    );

});
