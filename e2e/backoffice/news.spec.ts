import { test, expect } from "@playwright/test";
import {
  contains,
  login,
  navTo,
  expectSuccessPopups,
  removeStorageState,
} from "./helpers";

import { BACKOFFICE_URL, STORAGE_STATE_JSON } from "./config";

test.describe("News: Get auth data", () => {
  test("Login as admin", async ({ page }) => {
    removeStorageState();
    await page.goto(BACKOFFICE_URL);
    await login(page);
    await page.context().storageState({ path: STORAGE_STATE_JSON });
  });
});

test.describe("News: ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BACKOFFICE_URL);
  });

  test.use({ storageState: STORAGE_STATE_JSON });

  test("List news", async ({ page }) => {
    await navTo(page, "Newsy");

    await expect(contains(page, "niepubliczny")).toBeVisible();
    await expect(contains(page, "np-opis")).toBeVisible();
    await expect(contains(page, "NIE")).toBeVisible();
  });

  test("Add news", async ({ page }) => {
    await navTo(page, "Newsy");
    await page.locator('[aria-label="Dodaj newsa"]').click();
    await expect(contains(page, "Newsy / Utwórz")).toBeVisible();

    const addButton = contains(page, "Utwórz");

    expect(addButton).toBeDisabled();

    await page.locator('[placeholder="Tytuł"]').fill("news-title");
    expect(addButton).toBeDisabled();

    await page.setInputFiles(
      '[aria-label="Wybierz obraz"]',
      "./fixtures/img.jpeg"
    );
    await contains(page, "Dodaj").click();
    expect(addButton).toBeEnabled();

    await page.locator('[placeholder="Opis"]').fill("news-desc");

    await contains(page, "Zawartość").click();
    await page.locator(".ql-editor").fill("news-content");

    await contains(page, "Podgląd").click();
    await expect(contains(page, "news-title")).toBeVisible();
    await expect(contains(page, "news-content")).toBeVisible();

    await contains(page, "Publiczny").click();

    await addButton.click();

    await expectSuccessPopups(page, {
      okText: "News został utworzony.",
      errorText: "Nie można utworzyć newsa: ",
    });

    await expect(contains(page, "Newsy / news-title")).toBeVisible();
  });

  test("Edit news", async ({ page }) => {
    await navTo(page, "Newsy");

    await expect(contains(page, "NIE")).toBeVisible();
    await expect(contains(page, "news-desc")).toBeVisible();

    await page.locator("[alt=news-title]").click();

    await page.locator('[placeholder="Tytuł"]').fill("news-title-2");
    await page.locator('[placeholder="Opis"]').fill("news-desc-2");
    await contains(page, "Zawartość").click();
    await page.locator(".ql-editor").fill("news-content-2");

    await contains(page, "Zapisz").click();

    await expectSuccessPopups(page, {
      okText: "News został zapisany.",
      errorText: "Nie można zapisać newsa: ",
    });
  });

  test("Delete news", async ({ page }) => {
    await navTo(page, "Newsy");
    await contains(page, "news-title-2").click();

    await expect(contains(page, "Newsy / news-title-2")).toBeVisible();

    await page.locator('[aria-label="Usuń newsa"]').click();

    await expect(
      contains(page, /Czy na pewno chcesz usunąć news news-title-2?/)
    ).toBeVisible();
    await contains(page, "Usuń", ".modal-confirm").click();

    await expectSuccessPopups(page, {
      okText: "News został usunięty.",
      errorText: "Nie można usunąć newsa: ",
    });

    await expect(
      contains(
        page,
        "Tutaj są dynamiczne posty, wyświetlane na stronie głównej."
      )
    ).toBeVisible();

    await expect(contains(page, "news-title-2")).not.toBeVisible();
  });
});
