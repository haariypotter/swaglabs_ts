import { Locator, Page } from "@playwright/test";

export class CartPage {
  private cartItem: Locator;
  private checkoutButton: Locator;

  constructor(private page: Page) {
    this.cartItem = this.page.locator(".cart_item");
    this.checkoutButton = this.page.getByRole("button", { name: "Checkout" });
  }

  async removeSpecificCartItem(itemToBeRemoved: string): Promise<void> {
    await this.cartItem
      .filter({ hasText: itemToBeRemoved })
      .getByRole("button", { name: "Remove" })
      .click();
  }

  async isItemVisible(itemToBeChecked: string): Promise<boolean> {
    return await this.cartItem.filter({ hasText: itemToBeChecked }).isVisible();
  }

  async goToCheckoutPage(): Promise<void> {
    await this.checkoutButton.click();
  }




}
