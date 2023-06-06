import { test, expect } from '@playwright/test';
import InventoryPage from '../pages/inventory.page';

test.describe('tests for inventory page', () => {

  test.use({ storageState: 'loggedInState.json' })

  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
  })

  test('opened inventory page', async ({ page }) => {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  })

  const expectedBurgerMenuLinks = [
    "All Items",
    "About",
    "Logout",
    "Reset App State"
  ]

  test('burger menu has 4 items', async ({ page }) => {
    await inventoryPage.BurgerMenu().openBurgerMenu();
    expect(await inventoryPage.getBurgerMenuLinks()).toEqual(expectedBurgerMenuLinks);
  })

  test('close burger menu', async ({ page }) => {
    await inventoryPage.BurgerMenu().openBurgerMenu();
    await inventoryPage.BurgerMenu().closeBurgerMenu()
    await expect(inventoryPage.burgerMenu).not.toBeVisible()
  })

  const filters = [
    "Name (A to Z)",
    "Name (Z to A)",
    "Price (low to high)",
    "Price (high to low)"
  ]

  test('filters has 4 items', async ({ page }) => {
    expect(await inventoryPage.getFilters()).toEqual(filters)
  })

  test('filter high to low', async ({ page }) => {
    let prices = await inventoryPage.getPricesHTL();
    let sortedPrices = (await inventoryPage.getPricesHTL()).sort(function (a, b) {
      return b - a
    })
    const isEqual = prices.every((value, index) => value === sortedPrices[index]);
    expect(isEqual).toBeTruthy()
  })

})
