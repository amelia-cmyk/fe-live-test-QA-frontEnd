// Candidate: Write your Playwright E2E test for login here.
import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("shows error when fields are empty", async ({ page }) => {
    await page.getByRole("button", { name: /log in/i }).click();
    await expect(page.getByRole("alert")).toHaveText(
      "Username and password are required"
    );
  });

  test("shows error with wrong credentials", async ({ page }) => {
    await page.getByLabel(/username/i).fill("wrong");
    await page.getByLabel(/password/i).fill("wrong");
    await page.getByRole("button", { name: /log in/i }).click();
    await expect(page.getByRole("alert")).toHaveText("Invalid credentials");
  });

  test("logs in with correct credentials", async ({ page }) => {
    await page.getByLabel(/username/i).fill("admin");
    await page.getByLabel(/password/i).fill("secret");
    await page.getByRole("button", { name: /log in/i }).click();
    await expect(page.getByRole("alert")).toHaveText("Welcome, admin!");
  });
});
