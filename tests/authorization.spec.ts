import { test, expect } from '@playwright/test';
import TestData from '../data/data.spec';
import AuthorizationPage from '../pages/authorization.page';

test.describe('Неклассифицированные проверки', () => {
  let authorizationPage: AuthorizationPage;

  test.beforeEach(async ({ page }) => {
    authorizationPage = new AuthorizationPage(page);
    await authorizationPage.navigate();
  })

  test('Проверка урла', async ({ page }) => {
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  })

  test('Кнопка логин - зеленая', async ({ page }) => {
    await expect(authorizationPage.loginButton).toHaveCSS('color', 'rgb(19, 35, 34)');
  })
})

test.describe.only('попытка задать вводимые данные для теста через параметризацию', () => {
  let authorizationPage: AuthorizationPage;
  let testData: TestData;
  testData = new TestData() // не понимаю, что объявляю в последних двух строках

  for (const data of testData.usernamePasswordInputData) {
    test(`parametrized test ${data.username}`, async ({ page }) => {
      authorizationPage = new AuthorizationPage(page)
      await authorizationPage.navigate();
      await authorizationPage.authFormFill(data.username[1], data.password[1])//__1__ я хочу обратиться к конкретному username[1], но он у меня обращается ко всем из-за foreach 
    })
  }
})

test.describe('Проверка валидности паролей', () => {
  let authorizationPage: AuthorizationPage;

  test.beforeEach(async ({ page }) => {
    authorizationPage = new AuthorizationPage(page)
    await authorizationPage.navigate()
  })

  test('тест для валидных данных пользователя', async ({ page }) => {
    await authorizationPage.authFormFill('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  })

  test('тест для заблокированного пользователя', async ({ page }) => {
    await authorizationPage.authFormFill('locked_out_user', 'secret_sauce')
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible()
  })

  test('тест для несуществующего пользователя', async ({ page }) => {
    await authorizationPage.authFormFill('not_exist', 'secret_sauce');
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
  })

  test('тест для залогиневания с пустыми полями', async ({ page }) => {
    await authorizationPage.loginButton.click()
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible()
  })
})