import { Page, Locator } from "@playwright/test";

class BurgerMenu {
  page: Page;
  burgerMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
  }

  async openBurgerMenu() {
    await this.burgerMenuButton.click();
  }
}

export default BurgerMenu;