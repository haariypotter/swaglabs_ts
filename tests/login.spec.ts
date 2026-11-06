import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Login";

const loginScenarios = [
  {
    name: "success login",
    username: "standard_user",
    password: "secret_sauce",
    expectedURL: "https://www.saucedemo.com/inventory.html",
  },
  {
    name: "invalid_pass",
    username: "standard_user",
    password: "123",
    expectedError:
      "Epic sadface: Username and password do not match any user in this service",
  },
  {
    name: "empty_creds",
    username: "",
    password: "",
    expectedError: "Epic sadface: Username is required",
  },
];

for (const scenario of loginScenarios) {
  test(scenario.name, async ({ page }) => {
    // Your implementation here
    const loginPage = new LoginPage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginPage.login(scenario.username, scenario.password);

    if (scenario.expectedURL) {
      await expect(page).toHaveURL(scenario.expectedURL);
    }else{
      await expect(loginPage.getErrorMessage()).toHaveText(scenario.expectedError!)
}})
}
