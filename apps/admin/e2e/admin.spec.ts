import { test, expect } from "@playwright/test";

test.describe("Admin Panel E2E", () => {
  test("should load the admin home page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Admin/);
  });

  test("should display admin interface", async ({ page }) => {
    await page.goto("/");
    // Basic test to ensure admin app loads
    // More comprehensive admin tests will be added in Phase 3
    await expect(page.locator("body")).toBeVisible();
  });
});
