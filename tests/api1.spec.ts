import { test, expect } from '@playwright/test';

test('API Put Test', async ({ request }) => {
  const payload = {
    name: "Apple MacBook Pro 16",
    data: {
      year: 2019,
      price: 2049.99,
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB",
      color: "silver"
    }
  };

  const createResponse = await request.post('https://api.restful-api.dev/objects', {
    data: payload
  });
  expect(createResponse.status()).toBe(200);

  const createdObject = await createResponse.json();
  const response = await request.put(
    `https://api.restful-api.dev/objects/${createdObject.id}`,
    { data: payload }
  );

    console.log('Response status:', response.status());

    const responseBody = await response.json();

    console.log('Response body:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.name).toBe("Apple MacBook Pro 16");
    expect(responseBody.data.year).toBe(2019);
    expect(responseBody.data.price).toBe(2049.99);
});