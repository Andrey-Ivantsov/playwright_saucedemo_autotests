import { Page, Locator } from "@playwright/test";

class BurgerMenu {
  page: Page;
  burgerMenuButton: Locator;
  burgerMenuCrossButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.burgerMenuCrossButton = page.locator('#react-burger-cross-btn');
  }

  async openBurgerMenu() {
    await this.burgerMenuButton.click();
  }
  async closeBurgerMenu() {
    await this.burgerMenuCrossButton.click();
  }
}

export default BurgerMenu;