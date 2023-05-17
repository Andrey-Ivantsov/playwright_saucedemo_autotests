import { test, expect } from '@playwright/test'
import TestData from '../data/data.spec';

test('Проверка урла', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  await expect(page).toHaveURL('https://www.saucedemo.com/')
})

test.describe.only('', () => {
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

test('кнопка логин - зеленая', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  const loginBut = await page.locator('#login-button')
  await expect(loginBut).toHaveCSS('color', 'rgb(19,35,34)')
})
