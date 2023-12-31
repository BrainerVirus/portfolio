import { test, expect } from "@playwright/test";

test.describe("Hero section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4321/");
  });

  test("should be visible", async ({ page }) => {
    await expect(page.locator("#hero")).toBeInViewport();
  });

  test("should have a visible heading with my name", async ({ page }) => {
    await expect(
      page.locator("#hero", { has: page.locator("#hero-title") }),
    ).toBeInViewport();
  });

  test("should have a visible description", async ({ page }) => {
    await expect(
      page.locator("#hero", { has: page.locator("#hero-description") }),
    ).toBeInViewport();
  });

  test("should have a visible navigation to go to about me section", async ({
    page,
  }) => {
    await expect(
      page.locator("#hero", {
        has: page.getByText("about me", { exact: true }),
      }),
    ).toBeInViewport();
  });

  test("should have a navigation to go to about me section", async ({
    page,
  }) => {
    await page.getByText("about me", { exact: true }).click;
    await expect(page.locator("a[href='#about-me']")).toBeInViewport();
  });
});
