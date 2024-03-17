import { test, expect } from "@playwright/test";
import {
  contains,
  login,
  navTo,
  expectSuccessPopups,
  removeStorageState,
} from "./helpers";

import {
  BACKOFFICE_URL,
  INACTIVE_LOGIN,
  ADMIN_LOGIN,
  NEW_USER,
  CHANGE_LOGIN,
  STORAGE_STATE_JSON,
} from "./config";

test.describe("Users: ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BACKOFFICE_URL);
  });

  test.describe("Login - inactive", () => {
    test("Inactive user can't login", async ({ page }) => {
      removeStorageState();
      await page.locator("[placeholder=Login]").fill(INACTIVE_LOGIN);
      await page.locator("[placeholder=Hasło]").fill("HASLO_2");

      await page.locator("button", { hasText: "Zaloguj" }).press("Enter");

      await expect(
        contains(page, "Wygląda na to, że wprowadzone dane są nieprawidłowe. ")
      ).toBeVisible();
    });
  });

  test.describe("Login - admin", () => {
    test("Login as admin", async ({ page }) => {
      await login(page);

      // permissions
      for (const perm of [
        "Zarządzanie użytkownikami",
        "Zarządzanie newsami",
        "Zarządzanie stronami",
        "Zarządzanie zwierzętami",
      ]) {
        await expect(contains(page, perm)).toBeVisible();
      }

      // nav
      for (const str of [
        "Użytkownicy",
        "Logi",
        "Strony",
        "Newsy",
        "Zwierzęta",
        "Dodatkowe ustawienia",
        "IMIE NAZWISKO",
      ]) {
        await expect(contains(page, str, "nav")).toBeVisible();
      }

      await page.context().storageState({ path: STORAGE_STATE_JSON });

      //logout
      await contains(page, "Wyloguj się").click();
      await expect(
        contains(page, "Zarządzanie użytkownikami")
      ).not.toBeVisible();
      await expect(page.locator("[placeholder=Login]")).toBeVisible();
    });
  });

  test.describe("Admin", () => {
    test.use({ storageState: STORAGE_STATE_JSON });
    test("Inspect users list", async ({ page }) => {
      await navTo(page, "Użytkownicy");

      await expect(contains(page, "Użytkownicy", "h1")).toBeVisible();

      // table elements - inactive hidden
      await expect(contains(page, ADMIN_LOGIN)).toBeVisible();
      await expect(contains(page, CHANGE_LOGIN)).toBeVisible();
      await expect(contains(page, INACTIVE_LOGIN)).not.toBeVisible();

      await contains(page, "Aktywny").click();

      // table elements - all
      await expect(contains(page, ADMIN_LOGIN)).toBeVisible();
      await expect(contains(page, CHANGE_LOGIN)).toBeVisible();
      await expect(contains(page, INACTIVE_LOGIN)).toBeVisible();
    });

    test("Edit CHANGE_LOGIN user", async ({ page }) => {
      await navTo(page, "Użytkownicy");
      // data
      await page.locator(`[aria-label="Edytuj ${CHANGE_LOGIN}"]`).click();
      await contains(page, /^Zwierzęta$/, "abbr").click();
      await contains(page, "Zatwierdź", "button").click();

      await expectSuccessPopups(page, {
        okText: "Zaktualizowano dane użytkownika",
        errorText: "Nie udało się zaktualizować użytkownika",
      });

      // password
      await page.locator(`[aria-label="Zmień hasło ${CHANGE_LOGIN}"]`).click();
      await expect(
        contains(page, `Zmień hasło użytkownika ${CHANGE_LOGIN}`)
      ).toBeVisible();
      await page.locator("[placeholder=Hasło]").fill("HASLO_CHANGED");
      await contains(page, "Zatwierdź", "button").click();
      await expectSuccessPopups(page, {
        okText: "Zmieniono hasło",
        errorText: "Błąd zmiany hasła",
      });

      // check logs
      await navTo(page, "Logi");
      await contains(page, "Ukryj własne logi").click();
      await expect(
        contains(
          page,
          `${ADMIN_LOGIN} zaktualizował użytkownika ${CHANGE_LOGIN}`
        )
      ).toBeVisible();
      await expect(
        contains(page, "Zmienione uprawnienia: Zwierzęta")
      ).toBeVisible();
    });

    test("Delete INACTIVE_LOGIN user", async ({ page }) => {
      await navTo(page, "Użytkownicy");

      await contains(page, "Aktywny").click();

      await page.locator(`[aria-label="Usuń ${INACTIVE_LOGIN}"]`).click();

      await expect(
        contains(
          page,
          "Czy na pewno chcesz usunąć użytkownika IMIE_2 NAZWISKO_2"
        )
      ).toBeVisible();

      // modal
      await contains(page, "Usuń", "button").click();

      await expectSuccessPopups(page, {
        okText: "Usunięto użytkownika",
        errorText: "Nie udało się usunąć użytkownika",
      });

      await expect(contains(page, "Aktywny")).not.toBeChecked();
      await expect(contains(page, INACTIVE_LOGIN)).not.toBeVisible();
    });

    test("Add NEW_LOGIN user", async ({ page }) => {
      await navTo(page, "Użytkownicy");

      await page.locator(`[aria-label="Dodaj użytkownika"]`).click();

      await page.locator("[placeholder=Login]").fill(NEW_USER.login);
      await page.locator("[placeholder=Imię]").fill(NEW_USER.firstName);
      await page.locator("[placeholder=Nazwisko]").fill(NEW_USER.lastName);
      await page.locator("[placeholder=Hasło]").fill(NEW_USER.password);

      await contains(page, "Newsy", "abbr").click();

      await contains(page, "Dodaj", "button").click();

      await expect(contains(page, NEW_USER.login)).toBeVisible();
    });
  });

  test.describe("Login - new user", () => {
    test("Login as new user", async ({ page }) => {
      await login(page, NEW_USER);

      // nav
      for (const str of [
        "Zwierzęta",
        "Newsy",
        NEW_USER.firstName + " " + NEW_USER.lastName,
      ]) {
        await expect(contains(page, str, "nav")).toBeVisible();
      }

      for (const str of ["Użytkownicy", "Logi", "Dodatkowe ustawienia"]) {
        await expect(contains(page, str, "nav")).not.toBeVisible();
      }
    });

    test("Edit own data", async ({ page }) => {
      await login(page, NEW_USER);

      await page.locator('[aria-label="Zmień swoje dane"]').click();

      const loginField = page.locator("[placeholder=Login]");
      await expect(loginField).toHaveValue(NEW_USER.login);
      await loginField.fill(NEW_USER.login + NEW_USER.login);

      const firstNameField = page.locator("[placeholder=Imię]");
      await expect(firstNameField).toHaveValue(NEW_USER.firstName);
      await firstNameField.fill(NEW_USER.firstName + NEW_USER.firstName);

      const lastNameField = page.locator("[placeholder=Nazwisko]");
      await expect(lastNameField).toHaveValue(NEW_USER.lastName);
      await lastNameField.fill(NEW_USER.lastName + NEW_USER.lastName);

      await contains(page, "Zatwierdź", "button").click();

      await expectSuccessPopups(page, {
        okText: "Twoje dane zostały zapisane",
        errorText: "Błąd zapisywania danych: ",
      });

      await expect(
        contains(
          page,
          `Jesteś zalogowany jako ${NEW_USER.firstName + NEW_USER.firstName} ${
            NEW_USER.lastName + NEW_USER.lastName
          } (${NEW_USER.login + NEW_USER.login}).`
        )
      ).toBeVisible();

      await expect(
        contains(
          page,
          NEW_USER.firstName +
            NEW_USER.firstName +
            " " +
            NEW_USER.lastName +
            NEW_USER.lastName,
          "nav"
        )
      ).toBeVisible();
    });
  });

  test.describe("Login - changed user", () => {
    test("Login as changed user", async ({ page }) => {
      await login(page, {
        login: "CHANGE_LOGIN",
        password: "HASLO_CHANGED",
        firstName: "IMIE_3",
        lastName: "NAZWISKO_3",
      });

      // nav
      for (const str of ["Zwierzęta", "IMIE_3 NAZWISKO_3"]) {
        await expect(contains(page, str, "nav")).toBeVisible();
      }
      for (const str of [
        "Użytkownicy",
        "Logi",
        "Strony",
        "Newsy",
        "Dodatkowe ustawienia",
      ]) {
        await expect(contains(page, str, "nav")).not.toBeVisible();
      }
    });
  });
});
