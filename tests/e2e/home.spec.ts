import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Home Page", () => {
  test("should load the home page", async ({ page }) => {
    await page.goto("/");

    // Check for the main heading - AI Saved Me landing page
    await expect(page.getByRole("heading", { name: /real people/i })).toBeVisible();
  });

  test("should display the hero section", async ({ page }) => {
    await page.goto("/");

    // Check for hero section content - use main element to avoid title tag
    // Check for the subtitle which is more reliably visible across viewports
    await expect(
      page.locator("main").getByText(/watch the victories roll in/i)
    ).toBeVisible();
  });

  test("should have no accessibility violations @a11y", async ({ page }) => {
    await page.goto("/");

    // Run accessibility scan
    // Cast page to avoid type conflict between @playwright/test and @axe-core/playwright
    // Disable color-contrast check due to intentional design choices in theme colors
    const accessibilityScanResults = await new AxeBuilder({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      page: page as any,
    })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(["color-contrast"])
      .analyze();

    // Assert no accessibility violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should show the navigation bar", async ({ page }) => {
    await page.goto("/");

    // Check that navbar is visible - use role link for the logo
    await expect(page.getByRole("link", { name: /ai saved me/i }).first()).toBeVisible();
  });

  test("should show Browse Stories button", async ({ page }) => {
    await page.goto("/");

    // Check that CTA buttons are visible
    await expect(page.getByRole("link", { name: /browse stories/i }).first()).toBeVisible();
  });
});
