import "dotenv/config";
import { test as setup, expect } from "@playwright/test";
import fs from "node:fs";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  const username = process.env.SAUCE_USERNAME;
  const password = process.env.SAUCE_PASSWORD;

  if (!username || !password) {
    throw new Error("Missing SauceDemo credentials in .env");
  }

  fs.mkdirSync("playwright/.auth", { recursive: true });

  await page.goto("https://www.saucedemo.com/");

  await page.getByPlaceholder("Username").fill(username);
  await page.getByPlaceholder("Password").fill(password);

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory\.html/);

  await page.context().storageState({ path: authFile });
});
