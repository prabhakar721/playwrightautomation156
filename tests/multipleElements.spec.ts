import {test} from '@playwright/test';
test('Multiple Elements Test',async({page})=>{
    await page.goto("https://senthilsmartqahub.blogspot.com/2026/02/online-store.html");
const checkboxes=await page.locator("//input[@type='checkbox']").all();
for(const checkbox of checkboxes)
{
    await checkbox.check();
}

});