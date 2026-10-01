
import { Page, TestInfo, test } from "@playwright/test";

export class TestUtils {

    static stepNo = 1;


    static async executeStep(
        page: Page,
        testInfo: TestInfo,
        stepName: string,
        action: () => Promise<void>
    ) {

       
        const currentStep = this.stepNo++;

    
        await test.step(
            `STEP ${currentStep} - ${stepName}`,
            async () => {

                
                await action();

                
                await this.takeScreenshot(
                    page,
                    testInfo,
                    `STEP ${currentStep} - ${stepName}`
                );
            }
        );
    }


    
    static async takeScreenshot(
        page: Page,
        testInfo: TestInfo,
        screenshotName: string
    ) {

        const screenshot = await page.screenshot();

        await testInfo.attach(
            screenshotName,
            {
                body: screenshot,
                contentType: "image/png"
            }
        );
    }
}