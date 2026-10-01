import{ expect,test}from "playwright/test";
test("Handling alert",async({page})=>
{
await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
page.on("dialog",async(d1)=>
{
    console.log(d1.message())
    const result=await d1.accept("prabha going to be hero soon");
    await expect(page.locator("#result"))
    .toHaveText("You entered: prabha going to be hero soon");
})
await page.getByText('Click for JS Prompt').click();
//await page.waitForTimeout(5000);
});