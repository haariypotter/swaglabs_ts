import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Login";
import { Inventory } from "../pages/Inventory";
import { CartPage } from "../pages/CartPage";

test("user can login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto("https://www.saucedemo.com/");

  await loginPage.login("standard_user", "secret_sauce");

  const inventoryPage = new Inventory(page);

  await inventoryPage.addToCart("Sauce Labs Backpack");
  await inventoryPage.addToCart("Sauce Labs Bike Light");

  const badgeCount: string = await inventoryPage.getBadgeCount();

  await expect(badgeCount).toBe("2");

  await inventoryPage.navigateToCartPage();

  const cartPage = new CartPage(page);

  await cartPage.removeSpecificCartItem("Sauce Labs Backpack");
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

expect(
    await cartPage.isItemVisible("Sauce Labs Bike Light")
  ).toBeTruthy();
  
  expect(
    await cartPage.isItemVisible("Sauce Labs Backpack")
  ).toBeFalsy();
});
