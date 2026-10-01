
import { test, expect } from '@playwright/test';

test('API Test', async ({ request }) => {
    const response = await request.get('https://api.restful-api.dev/collections');
    console.log('Response status:', response.status());
    const responseBody = await response.json();
    console.log('Response body:', responseBody);
    expect(response.status()).toBe(200);
});

test.only('API Post Test', async ({ request }) => {
    const response = await request.post('https://api.restful-api.dev/objects', {
        data: {
            name: "Apple MacBook Pro 16",
            data: {
                year: 2019,
                price: 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        }
    });
    console.log('Response status:', response.status());
    const responseBody = await response.json();
    console.log('Response body:', responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody.name).toBe("Apple MacBook Pro 16");
    expect(responseBody.data.year).toBe(2019);
    expect(responseBody.data.price).toBe(1849.99);
    expect(responseBody.data["CPU model"]).toBe("Intel Core i9");
    expect(responseBody.data["Hard disk size"]).toBe("1 TB");
});