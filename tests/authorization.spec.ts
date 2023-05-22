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



test.describe('попытка ввести данные для тестов из самих тестов', () => {
  let authorizationPage: AuthorizationPage;
  let testData: TestData;
  testData = new TestData() // не понимаю, что объявляю в последних двух строках
  testData.usernamePasswordInputData.forEach(data => {//это ввыглядит, как костыль, потому что в таком варианте исполнения я не могу обращаться только к конкретному значению из testData, потому что он каждый раз прогоняет для всех (ссылка в __1__)

    test(`parametrized test ${data.username}`, async ({ page }) => { //если не добавлять ${data.username}, то будет ошибка  "duplicate test titles are not allowed", я обошел данный момент добавлением ${data.username}, но как будто это костыль. Существуют ли другие варианты или норм?
      authorizationPage = new AuthorizationPage(page)
      await authorizationPage.navigate();
      await authorizationPage.authFormFill(data.username, data.password)//__1__ я хочу обратиться к конкретному username[1], но он у меня обращается ко всем из-за foreach 
    })
  })
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