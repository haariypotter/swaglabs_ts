import { Locator, Page } from "@playwright/test";

export class Inventory {
  private inventoryItem: Locator;
  private shoppingCartBadge: Locator;
  private cartButton: Locator;

  constructor(private page: Page) {
    this.inventoryItem = this.page.locator(".inventory_item");
    this.shoppingCartBadge = this.page.locator(".shopping_cart_badge");
    this.cartButton = this.page.locator(".shopping_cart_link");
  }

  async addToCart(itemToBeAdded: string): Promise<void> {
    await this.inventoryItem
      .filter({
        hasText: itemToBeAdded,
      })
      .getByRole("button", { name: "Add to cart" })
      .click();
  }

  async getBadgeCount(): Promise<string> {
    return this.shoppingCartBadge.innerText();
  }

  getShoppingCartBadge(): Locator {
    return this.shoppingCartBadge;
  }

  async removeProductFromGrid(itemToBeDeleted: string): Promise<void> {
    await this.inventoryItem
      .filter({ hasText: itemToBeDeleted })
      .getByRole("button", { name: "Remove" })
      .click();
  }

  async navigateToCartPage(): Promise<void> {
    await this.cartButton.click();
  }
}
