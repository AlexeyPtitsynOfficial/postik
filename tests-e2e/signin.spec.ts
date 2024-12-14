import { test, expect } from '@playwright/test'

test("sign in test", async ({page}) => {
    await page.goto('/auth/signin')

    await expect(page.getByText('Aвторизация')).toBeVisible();

    await page.getByLabel("Электронная почта или логин").fill("alessar@bk.ru");
    await page.getByLabel("Пароль").fill("159357");

    await page.getByRole('button', { name: 'Авторизоваться' }).click();

    //await page.waitForURL('/postik');

    //await expect(page.locator('#dropdown')).toBeVisible();
    expect(page.getByText("MenuItem"), "Log out").toBeDefined();
})