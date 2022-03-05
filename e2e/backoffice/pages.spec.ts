import { test, expect } from "@playwright/test";
import {
  contains,
  login,
  navTo,
  expectSuccessPopups,
  removeStorageState,
} from "./helpers";

import { BACKOFFICE_URL, STORAGE_STATE_JSON } from "./config";

test.describe("Pages: Get auth data", () => {
  test("Login as admin", async ({ page }) => {
    removeStorageState();
    await page.goto(BACKOFFICE_URL);
    await login(page);
    await page.context().storageState({ path: STORAGE_STATE_JSON });
  });
});

test.describe("Pages: ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BACKOFFICE_URL);
  });
  test.use({ storageState: STORAGE_STATE_JSON });
  test("List pages", async ({ page }) => {
    await navTo(page, "Strony");

    await expect(contains(page, "test-page")).toBeVisible();
    await expect(contains(page, "TEST_PAGE")).toBeVisible();
  });

  test("Inspects details", async ({ page }) => {
    await navTo(page, "Strony");
    await contains(page, "test-page").click();

    await expect(contains(page, "Strony / test-page")).toBeVisible();
    await expect(contains(page, "ID: TEST_PAGE")).toBeVisible();

    await expect(page.locator('[placeholder="Tytuł strony"]')).toHaveValue(
      "test-page"
    );

    await contains(page, "Podgląd").click();
    await expect(contains(page, "to jest strona testowa")).toBeVisible();
  });

  test("Edits page", async ({ page }) => {
    await navTo(page, "Strony");
    await contains(page, "test-page").click();

    // save enabled by default
    const saveButton = contains(page, "Zapisz", "button");
    await expect(saveButton).toBeEnabled();

    // save disabled if no title
    const pageTitleField = page.locator('[placeholder="Tytuł strony"]');
    await pageTitleField.fill("");
    await expect(saveButton).toBeDisabled();

    // edit title
    await pageTitleField.fill("test-page-2");
    await expect(saveButton).toBeEnabled();

    // edit content
    await contains(page, "Zawartość").click();
    await page.locator(".ql-editor").fill("tets");

    // check if content updated
    await contains(page, "Podgląd").click();
    await expect(contains(page, "tets")).toBeVisible();
    await expect(contains(page, /test-page$/)).not.toBeVisible();
    await expect(contains(page, "test-page-2")).toBeVisible();

    // save
    await saveButton.click();
    await expectSuccessPopups(page, {
      okText: "Zmiany zostały zapisane",
      errorText: "Nie można zapisać strony: ",
    });

    // nav back to list
    await contains(page, "Strony", "a").click();

    await expect(contains(page, "TEST_PAGE")).toBeVisible();
    await expect(contains(page, /test-page$/)).not.toBeVisible(); // old title
    await expect(contains(page, "test-page-2")).toBeVisible(); // new title
  });
});
