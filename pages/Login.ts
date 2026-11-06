import { Locator, Page } from "@playwright/test";

export class LoginPage {
  private username: Locator;
  private password: Locator;
  private loginButton: Locator;
  private errorButton: Locator;

  constructor(private page: Page) {
    this.username = this.page.getByPlaceholder("Username");
    this.password = this.page.getByPlaceholder("Password");
    this.loginButton = this.page.getByRole("button", { name: "Login" });
    this.errorButton = this.page.locator('[data-test="error"]');
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  getErrorMessage() {
    return this.errorButton;
  }
}
