import { Page, Locator } from "@playwright/test";
import BurgerMenu from "./component/burger_menu.component";

class InventoryPage {
  page: Page;
  burgerMenuLinks: Locator;
  burgerMenu: Locator;
  filters: Locator;
  prices: Locator;
  filterPriceHTL: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenuLinks = page.locator('.bm-item-list a[id*=link]');
    this.burgerMenu = page.locator('.bm-menu-wrap');
    this.filters = page.locator('[data-test=product_sort_container] option');
    this.filterPriceHTL = page.locator('[data-test=product_sort_container]');
    this.prices = page.locator('.inventory_item_price');
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  BurgerMenu() {
    return new BurgerMenu(this.page);
  }

  getBurgerMenuLinks() {
    return this.burgerMenuLinks.allTextContents();
  }

  getFilters() {
    return this.filters.allTextContents();
  }

  async getPricesHTL() {
    await this.filterPriceHTL.selectOption('hilo');
    const arrOfPricesStr = await this.prices.allTextContents();
    const arrOfPricesNum = arrOfPricesStr.map(str => {
      return parseFloat(str.substring(1));
    });
    return arrOfPricesNum;
  }

}

export default InventoryPage;