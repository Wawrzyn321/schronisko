import { test, expect, Page } from "@playwright/test";
import {
  contains,
  login,
  navTo,
  expectSuccessPopups,
  removeStorageState,
} from "./helpers";

import { BACKOFFICE_URL, STORAGE_STATE_JSON } from "./config";

const expectSuccessPopup = async (page: Page) => {
  await expectSuccessPopups(page, {
    okText: "Zapisano ustawienie",
    errorText: "Nie można zapisać ustawienia: ",
  });
};

test.describe("Additional settings: Get auth data", () => {
  test("Login as admin", async ({ page }) => {
    removeStorageState();
    await page.goto(BACKOFFICE_URL);
    await login(page);
    await page.context().storageState({ path: STORAGE_STATE_JSON });
  });
});

test.describe("Additional settings:", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BACKOFFICE_URL);
    await navTo(page, "Dodatkowe ustawienia");
  });

  test.use({ storageState: STORAGE_STATE_JSON });

  test("Check Psi Wolontariat", async ({ page }) => {
    const psiCheckbox = contains(page, "Psi wolontariat możliwy");

    psiCheckbox.click();

    await expectSuccessPopup(page);

    await expect(psiCheckbox).toBeChecked();

    psiCheckbox.click();

    await expectSuccessPopup(page);

    await expect(psiCheckbox).not.toBeChecked();
  });

  test("Check subsitutions", async ({ page }) => {
    await contains(page, "Numer KRS").fill("TEST_NR_KRS");
    await page.locator("button", { hasText: "Zapisz" }).first().click();
    await expectSuccessPopup(page);

    await contains(page, "Numer konta wirtualnych adopcji").fill(
      "TEST_NR_KONTA"
    );
    await page.locator("button", { hasText: "Zapisz" }).last().click();
    await expectSuccessPopup(page);

    await navTo(page, "Newsy");
    await page.locator('[aria-label="Dodaj newsa"]').click();

    await contains(page, "Zawartość").click();
    await page.locator(".ql-editor").fill("%KONTO% %KRS%");

    await contains(page, "Podgląd").click();
    await expect(
      contains(page, "TEST_NR_KONTA" + " " + "TEST_NR_KRS")
    ).toBeVisible();
  });
});
