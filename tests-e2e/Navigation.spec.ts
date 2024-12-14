
import { test, expect } from '@playwright/test'

test('should navigate to postik page', async ({ page }) => {
    await page.goto('/')

    await page.getByRole("link", {name: "Постики"} ).click()

    await expect(page).toHaveURL("/postik");
  // The new page should contain an h1 with "About"
    expect(page.getByText("ListSubheader"), "Меню").toBeDefined();
})