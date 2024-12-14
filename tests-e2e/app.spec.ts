import {test, expect } from '@playwright/test'

test("app test", async ({page})=> {
    await page.goto('/');
    await expect(page.getByRole("link", { name: "Postik"})).toBeVisible();
})