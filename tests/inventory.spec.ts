import { test, expect } from '@playwright/test';
import InventoryPage from '../pages/inventory.page';

test.describe('burger menu tests', () => {

  test.use({ storageState: 'loggedInState.json' })

  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
  })

  const expectedLinks = [
    "All Items",
    "About",
    "Logout",
    "Reset App State"
  ]

  test.only('has all items', async ({ page }) => {
    await inventoryPage.BurgerMenu().openBurgerMenu();
    expect(await inventoryPage.getBurgerMenuLinks()).toEqual(expectedLinks);
  })

})
