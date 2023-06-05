import { FullConfig, chromium } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/');

  await page.context().storageState({path: 'notLoggedInState.json'});

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('#login-button').click();
  
  await page.context().storageState({path:'loggedInState.json'});
  await browser.close();
}

export default globalSetup