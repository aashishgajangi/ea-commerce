import { test, expect } from "@playwright/test";

test.describe("Authentication E2E", () => {
  test("should load the home page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/EA Commerce/);
  });

  test("should navigate to sign in page", async ({ page }) => {
    await page.goto("/auth/signin");
    await expect(page.locator("h2")).toContainText("Sign in to your account");
  });

  test("should navigate to sign up page", async ({ page }) => {
    await page.goto("/auth/signup");
    await expect(page.locator("h2")).toContainText("Create your account");
  });
});
