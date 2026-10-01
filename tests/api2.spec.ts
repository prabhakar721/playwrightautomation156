import { test, expect } from '@playwright/test';

test('POST and PATCH Test', async ({ request }) => {

    // POST
    const postResponse = await request.post(
        'https://api.restful-api.dev/objects',
        {
            data: {
                name: "Apple  Pro 16",
                data: {
                    year: 2019,
                    price: 1849.99
                }
            }
        }
    );

    const postBody = await postResponse.json();

    const id = postBody.id;

    console.log("Created ID:", id);

    // PATCH
    const patchResponse = await request.patch(
        `https://api.restful-api.dev/objects/${id}`,
        {
            data: {
                name: "Apple Pro 16 (Updated Name)"
            }
        }
    );

    const patchBody = await patchResponse.json();

    console.log("PATCH Status:", patchResponse.status());
    console.log("PATCH Response:", patchBody);

    expect(patchResponse.status()).toBe(200);
    expect(patchBody.name).toBe(
        "Apple MacBook Pro 16 (Updated Name)"
    );
});