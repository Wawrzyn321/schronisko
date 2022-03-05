import { test, expect } from "@playwright/test";
import {
  contains,
  login,
  navTo,
  expectSuccessPopups,
  removeStorageState,
} from "./helpers";

import { BACKOFFICE_URL, STORAGE_STATE_JSON } from "./config";

test.describe("Animals: Get auth data", () => {
  test("Login as admin", async ({ page }) => {
    removeStorageState();
    await page.goto(BACKOFFICE_URL);
    await login(page);
    await page.context().storageState({ path: STORAGE_STATE_JSON });
  });
});

test.describe("Animals:", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BACKOFFICE_URL);
  });

  test.use({ storageState: STORAGE_STATE_JSON });

  test("List animals", async ({ page }) => {
    await navTo(page, "Zwierzęta");

    await expect(
      contains(page, "Nie znaleziono żadnych pasujących zwierząt.")
    ).toBeVisible();

    await contains(page, "Widoczny na stronie").click();

    await expect(contains(page, "test-animal")).toBeVisible();
    await expect(contains(page, "Pies")).toBeVisible();
    await expect(contains(page, "Niedawno znalezione")).toBeVisible();
    await expect(contains(page, "NIE")).toBeVisible();
  });

  test("Add animal", async ({ page }) => {
    await navTo(page, "Zwierzęta");
    await page.locator('[aria-label="Dodaj zwierzę"]').click();
    await expect(contains(page, "Zwierzęta / Dodaj")).toBeVisible();

    const addButton = page.locator('[aria-label="Dodaj zwierzę"]');
    await expect(addButton).toBeDisabled();

    await page.locator('[placeholder="Imię zwierzęcia"]').fill("animal-name");
    await expect(addButton).toBeDisabled();

    await page
      .locator('[placeholder^="Np. osoba, numer telefonu"]')
      .fill("animal-contact-info");
    await expect(addButton).toBeDisabled();

    await contains(page, "Opis", ".tabs *").click();
    await page.locator('[placeholder="Opis zwierzęcia"]').fill("animal-desc");
    await addButton.click();

    await expectSuccessPopups(page, {
      okText: "Zwierzę zostało dodane.",
      errorText: "Nie można utworzyć zwierzęcia: ",
    });

    await expect(contains(page, "Zwierzęta / animal-name")).toBeVisible();
  });

  test("Inspect list", async ({ page }) => {
    await navTo(page, "Zwierzęta");

    await expect(contains(page, "animal-name")).toBeVisible();
    await expect(contains(page, "Kot")).toBeVisible();
    await expect(contains(page, "Do adopcji")).toBeVisible();
    await expect(contains(page, "Schronisko")).toBeVisible();
    await expect(contains(page, "TAK")).toBeVisible();

    await contains(page, "Widoczny na stronie").click();

    await expect(contains(page, "test-animal")).toBeVisible();
    await expect(contains(page, "animal-name")).toBeVisible();

    await page.locator("[placeholder='Szukaj...']").fill("name");

    await expect(contains(page, "test-animal")).not.toBeVisible();
    await expect(contains(page, "animal-name")).toBeVisible();

    await expect(contains(page, "Schronisko")).toBeVisible();
    await page.locator('[aria-label="Otwórz filtry"]').click();
    await contains(page, "Miejsce", "label").click();
    await expect(contains(page, "Schronisko")).not.toBeVisible();
  });

  test("Edit animal", async ({ page }) => {
    await navTo(page, "Zwierzęta");
    await page.locator('[aria-label="Edytuj zwierzę animal-name"]').click();

    await page.locator('[placeholder="Imię zwierzęcia"]').fill("animal-name-2");

    await contains(page, "Zdjęcia").click();
    await page.locator('[aria-label="Dodaj zdjęcie"]').click();

    await page.setInputFiles(
      '.animal-images-list [aria-label="Wybierz obraz"]',
      "./fixtures/img.jpeg"
    );

    await contains(page, "Dodaj", "button").click();

    await contains(page, "Zapisz", "button").click();

    await expectSuccessPopups(page, {
      okText: "Dane zwierzęcia zostały zapisane.",
      errorText: "Nie możnac zapisać danych zwierzęcia: ",
    });
  });

  test("Delete animal", async ({ page }) => {
    await navTo(page, "Zwierzęta");
    await contains(page, "animal-name-2").click();

    await expect(contains(page, "Zwierzęta / animal-name-2")).toBeVisible();

    await page.locator('[aria-label="Usuń zwierzę"]').click();

    await expect(
      contains(page, "Czy na pewno chcesz usunąć zwierzę animal-name-2?")
    ).toBeVisible();
    await contains(page, "Usuń", ".modal-confirm").click();

    await expectSuccessPopups(page, {
      okText: "Zwierzę zostało usunięte.",
      errorText: "Nie udało się usunąć zwierzęcia: ",
    });

    await expect(contains(page, "Użyj filtrów")).toBeVisible();

    await expect(contains(page, "animals-name-2")).not.toBeVisible();
  });
});
