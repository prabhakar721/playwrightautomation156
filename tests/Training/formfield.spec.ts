import { test} from "@playwright/test";
test("Form Field", async ({ page }) => {
    await page.goto("https://practice-automation.com/form-fields/");
    await page.getByRole("textbox", { name: "Name" }).fill("John");
    await page.getByRole("textbox", { name: "Password" }).fill("password123");
    await page.getByLabel("Water") .check();
    await page.getByLabel("Yellow").check();
    await page.getByRole("combobox").selectOption("Yes");
    await page.getByRole("textbox",{name:"Email"}).fill("john@example.com");
    await page.getByRole("textbox",{name:"Message"}).fill("Good morning");
    await page.getByRole("button", { name: "Submit" }).click();

});
