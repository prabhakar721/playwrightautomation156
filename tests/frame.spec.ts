import { expect, test } from "@playwright/test";

test("Handling frame", async ({ page }) => {

    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame1 = page.frame({
        url: "https://ui.vision/demo/webtest/frames/frame_1.html"
    });

    await frame1?.fill("#mytext1", "prabha");
   

});
test.only("Handling frame1", async ({ page }) => {

    await page.goto("https://ui.vision/demo/webtest/frames/");

    const inputbox = page
        .frameLocator("iframe[src*='frame_1.html']")
        .locator("#mytext1");

    await inputbox.fill("prabha");

    await page.waitForTimeout(5000);
});