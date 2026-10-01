import { expect, test } from "@playwright/test";

test("Handling frame1", async ({ page }) => {
    await page.setContent(`
      <html>
        <body>
          <iframe srcdoc="<input id='mytext1' type='text' value=''>"></iframe>
        </body>
      </html>
    `);

    const input = page.frameLocator("iframe").locator("#mytext1");
    await expect(input).toBeVisible();
    await input.fill("prabha");
    await expect(input).toHaveValue("prabha");
});