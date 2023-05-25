import { Page, Locator } from "@playwright/test";

class AuthorizationPage {
  page: Page;
  loginButton: Locator;
  userNameField: Locator;
  passwordField: Locator;
  error: Locator;
  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator('#login-button');
    this.userNameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.error = page.locator('[data-test="error"]')
  }
  async navigate() {
    await this.page.goto('https://www.saucedemo.com/')
  }
  async authFormFill(username: string, password: string) {
    await this.userNameField.fill(username)
    await this.passwordField.fill(password)
    await this.loginButton.click()
  }
}

export default AuthorizationPage