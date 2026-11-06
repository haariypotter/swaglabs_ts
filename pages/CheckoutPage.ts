import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  private firstName: Locator;
  private lastName: Locator;
  private zipCode: Locator;
  private continueButton: Locator;
  private finishButton: Locator;

  constructor(private page: Page) {
    this.firstName = this.page.getByPlaceholder("First Name");
    this.lastName = this.page.getByPlaceholder("Last Name");
    this.zipCode = this.page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = this.page.getByRole("button", { name: "Continue" });
    this.finishButton = this.page.getByRole("button", { name: "Finish" });
  }

  async fillCheckoutDetailsAndContinue(
    firstName: string,
    lastName: string,
    zipCode: string
  ): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zipCode.fill(zipCode);
    await this.continueButton.click();
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstName.fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.lastName.fill(lastName);
  }

  async fillZipCode(zipCode: string): Promise<void> {
    await this.zipCode.fill(zipCode);
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }
}
