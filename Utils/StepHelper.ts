import { Page, TestInfo } from '@playwright/test';

export class StepHelper {

    private stepCounter = 0;

    constructor(
        private readonly page: Page,
        private readonly testInfo: TestInfo
    ) {}

    getStepNumber(): number {
        this.stepCounter++;
        return this.stepCounter;
    }

    async attachScreenshot(name: string): Promise<void> {

        await this.testInfo.attach(name, {
            body: await this.page.screenshot({
                fullPage: true
            }),
            contentType: 'image/png'
        });
    }
}