import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Login";
import { Inventory } from "../pages/Inventory";

test("user add to cart", async ({ page }) => {
  const inventoryPage = new Inventory(page);

  await page.goto("/inventory.html");

  await inventoryPage.addToCart("Sauce Labs Backpack");

  const badgeCount: string = await inventoryPage.getBadgeCount();

  await expect(badgeCount).toBe("1");
});

test("user remove from cart", async ({ page }) => {
  const inventoryPage = new Inventory(page);

  await page.goto("/inventory.html");

  await inventoryPage.addToCart("Sauce Labs Backpack");

  await inventoryPage.removeProductFromGrid("Sauce Labs Backpack");

  await expect(inventoryPage.getShoppingCartBadge()).toBeHidden();
});
