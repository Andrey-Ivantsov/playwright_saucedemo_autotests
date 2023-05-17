import { test, expect } from '@playwright/test'
import TestData from '../data/data.spec';

test('Проверка урла', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  await expect(page).toHaveURL('https://www.saucedemo.com/')
})
test('кнопка логин - зеленая', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  const loginBut = await page.locator('#login-button')
  await expect(loginBut).toHaveCSS('color', 'rgb(19,35,34)')
})

test.describe('попытка ввести данные для тестов из самих тестов', () => {
  let testData: TestData;
  testData = new TestData() // не понимаю, что объявляю в последних двух строках
  testData.usernamePasswordInputData.forEach(data => {//это ввыглядит, как костыль, потому что в таком варианте исполнения я не могу обращаться только к конкретному значению из testData, потому что он каждый раз прогоняет для всех (ссылка в __1__)

    test(`parametrized test ${data.username}`, async ({ page }) => { //если не добавлять ${data.username}, то будет ошибка  "duplicate test titles are not allowed", я обошел данный момент добавлением ${data.username}, но как будто это костыль. Существуют ли другие варианты или норм?
      await page.goto('https://www.saucedemo.com/')
      await page.locator('[data-test="username"]').fill(data.username[1])//__1__ я хочу обратиться к конкретному username[1], но он у меня обращается ко всем из-за foreach 
      await page.locator('[data-test="password"]').fill(data.password[1])
      await page.locator('[data-test="login-button"]').click()
    })
  })
})

test.describe('Проверка валидности паролей', () => {
  test('тест для валидных данных пользователя', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.locator('[data-test="username"]').fill('standard_user')
    await page.locator('[data-test="password"]').fill('secret_sauce')
    await page.locator('[data-test="login-button"]').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  })
  test('тест для заблокированного пользователя', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.locator('[data-test="username"]').fill('locked_out_user')
    await page.locator('[data-test="password"]').fill('secret_sauce')
    await page.locator('[data-test="login-button"]').click()
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible()
  })
  test('тест для несуществующего пользователя', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.locator('[data-test="username"]').fill('problem_user')
    await page.locator('[data-test="password"]').fill('secret_sauce!')
    await page.locator('[data-test="login-button"]').click()
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
  })
  test('тест для залогиневания с пустыми полями', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.locator('[data-test="login-button"]').click()
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible()
  })
})