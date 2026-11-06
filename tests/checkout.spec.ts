import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Login";
import { Inventory } from "../pages/Inventory";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test("user can login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto("https://www.saucedemo.com/");

  await loginPage.login("standard_user", "secret_sauce");

  const inventoryPage = new Inventory(page);

  await inventoryPage.addToCart("Sauce Labs Backpack");

  await inventoryPage.navigateToCartPage();

  const cartPage = new CartPage(page);

  await cartPage.goToCheckoutPage();

  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.fillCheckoutDetailsAndContinue("Gaurav", "X", "400001");

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html"
  );

  await expect(page.locator(".inventory_item_name")).toHaveText(
    "Sauce Labs Backpack"
  );

  await expect(page.locator(".summary_total_label")).toBeVisible();

  await checkoutPage.finishCheckout();

  await expect(page.locator(".complete-header")).toHaveText(
    "Thank you for your order!"
  );
});

test("negative checkout flow", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto("https://www.saucedemo.com/");

  await loginPage.login("standard_user", "secret_sauce");

  const inventoryPage = new Inventory(page);

  await inventoryPage.addToCart("Sauce Labs Backpack");

  await inventoryPage.navigateToCartPage();

  const cartPage = new CartPage(page);

  await cartPage.goToCheckoutPage();

  const checkoutPage = new CheckoutPage(page);

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Error: First Name is required"
  );
});

test.only("negative checkout flow all scenarios", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto("https://www.saucedemo.com/");

  await loginPage.login("standard_user", "secret_sauce");

  const inventoryPage = new Inventory(page);

  await inventoryPage.addToCart("Sauce Labs Backpack");

  await inventoryPage.navigateToCartPage();

  const cartPage = new CartPage(page);

  await cartPage.goToCheckoutPage();

  const checkoutPage = new CheckoutPage(page);

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Error: First Name is required"
  );

  await checkoutPage.fillFirstName("Tim");

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Error: Last Name is required"
  );

  await checkoutPage.fillLastName("Jim");

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Error: Postal Code is required"
  );
});
