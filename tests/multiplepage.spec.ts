import{test,expect}from'@playwright/test';
test("Handling multiple pages",async({page,context})=>{
    await page.goto("https://demoqa.com/browser-windows");
const [newtab]= await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('button', { name: 'New Tab' }).click()
])
await newtab.waitForLoadState();
const tabtext= await newtab.locator("#sampleHeading").textContent();
await expect(tabtext).toBe("This is a sample page");
});