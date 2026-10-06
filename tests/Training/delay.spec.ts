import { test, expect } from "@playwright/test";

test("JavaScript Delay", async ({ page }) => {

    await page.goto("https://practice-automation.com/javascript-delays/");

    await page.getByRole("button", { name: "Start" }).click();

    await expect(page.getByText("Liftoff!")).toBeVisible({
        timeout: 10000
    });

});