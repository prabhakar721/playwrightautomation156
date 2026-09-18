import { Page, TestInfo, test } from '@playwright/test';

export class TestUtils {

    private stepCounter = 0;

    constructor(
        private readonly page: Page,
        private readonly testInfo: TestInfo
    ) {}

    async executeStep(
        description: string,
        action: () => Promise<void>
    ): Promise<void> {

        this.stepCounter++;

        const stepName = `${this.stepCounter}. ${description}`;

        await test.step(stepName, async () => {

            try {

                await action();

                await this.takeScreenshot(
                    `PASS - ${stepName}`
                );

            } catch (error) {

                await this.takeScreenshot(
                    `FAIL - ${stepName}`
                );

                throw error;
            }
        });
    }

    private async takeScreenshot(
        name: string
    ): Promise<void> {

        try {

            if (this.page.isClosed()) {
                return;
            }

            await this.testInfo.attach(name, {
                body: await this.page.screenshot({
                    fullPage: false
                }),
                contentType: 'image/png'
            });

        } catch (screenshotError) {

            console.log(
                `Screenshot could not be captured: ${screenshotError}`
            );
        }
    }
}