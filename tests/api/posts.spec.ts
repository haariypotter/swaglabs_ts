import { test, expect } from "@playwright/test";

test("Get a post successfull", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data.id).toBe(1);
  expect(data.userId).toBe(1);
});

test("posting an object ", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      data: {
        title: "Learning API Testing",
        body: "My first POST request using Playwright",
        userId: 1,
      },
    }
  );

  expect(response.status()).toBe(201);

  const data = await response.json();

  expect(data.title).toBe("Learning API Testing");
  expect(data.id).toBeTruthy();
});

test("Negative", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/999999"
  );

  expect(response.status()).toBe(404);
  const data = await response.json();

  expect(data).toEqual({});
});

test.only("checking headers", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  expect(response.status()).toBe(200);

  const headers = await response.headers();

  console.log(headers["content-type"]);

  expect(headers["content-type"]).toEqual("application/json; charset=utf-8");

  const data = await response.json();
  
  expect(data.id).toBe(1);
  expect(data.userId).toBe(1);

  expect(typeof data.title).toBe("string")
  expect(typeof data.body).toBe("string")
});
