import { Page, Locator } from "@playwright/test";
import BurgerMenu from "./component/burger_menu.component";

class InventoryPage {
  page: Page;
  burgerMenuLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenuLinks = page.locator('.bm-item-list a[id*=link]');
  }

  BurgerMenu() {
    return new BurgerMenu(this.page);
  }

  getBurgerMenuLinks() {
    return this.burgerMenuLinks.allTextContents();
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }
}

export default InventoryPage;