import { test, expect, Page } from "@playwright/test";
import { contains, login, navTo, expectSuccessPopups } from "./helpers";

import { BACKOFFICE_URL } from "./config";

const loginBeforeEach = async (page: Page) => {
  await page.goto(BACKOFFICE_URL);
  await login(page, {
    firstName: "IMIE_4",
    lastName: "NAZWISKO_4",
    login: "NO_PERMISSIONS_LOGIN",
    password: "NO_PERMISSIONS_PASSWORD",
  });
};

test.describe("No permissions:", () => {
  test("After login", async ({ page }) => {
    await loginBeforeEach(page);
    // permissions
    for (const perm of [
      "Zarządzanie użytkownikami",
      "Zarządzanie newsami",
      "Zarządzanie stronami",
      "Zarządzanie zwierzętami",
    ]) {
      await expect(contains(page, perm)).not.toBeVisible();
    }

    // nav
    for (const str of [
      "Użytkownicy",
      "Logi",
      "Strony",
      "Newsy",
      "Zwierzęta",
      "Dodatkowe ustawienia",
    ]) {
      await expect(contains(page, str, "nav")).not.toBeVisible();
    }

    for (const str of ["IMIE_4 NAZWISKO_4", "Mój profil"]) {
      await expect(contains(page, str, "nav")).toBeVisible();
    }
  });

  test("Navigate by URL, no permissions", async ({ page }) => {
    await loginBeforeEach(page);
    await page.goto(BACKOFFICE_URL + "#/users");

    const str =
      "Błąd pobierania użytkowników: Nie masz uprawnień do wykonania tej akcji.";
    await expect(contains(page, str)).toBeVisible();
  });

  test("Can edit own data & password", async ({ page }) => {
    await loginBeforeEach(page);

    // data
    await page.locator('[aria-label="Zmień swoje dane"]').click();
    await page.locator("[placeholder=Imię]").fill("SMUTNY");
    await contains(page, "Zatwierdź", "button").click();

    await expectSuccessPopups(page, {
      okText: "Twoje dane zostały zapisane",
      errorText: "Błąd zapisywania danych: ",
    });
    await expect(contains(page, "SMUTNY")).toBeVisible();

    // password
    await contains(page, "Zmień hasło", "button").click();
    await page
      .locator("[placeholder='Obecne hasło']")
      .fill("NO_PERMISSIONS_PASSWORD");
    await page
      .locator("[placeholder='Nowe hasło']")
      .fill("NO_PERMISSIONS_PASSWORD_2");
    await page
      .locator("[placeholder='Potwierdź nowe hasło']")
      .fill("NO_PERMISSIONS_PASSWORD_2");
    await contains(page, "Zatwierdź", "button").click();

    await expectSuccessPopups(page, {
      okText: "Hasło zostało zmienione",
      errorText: "Nie udało się zmienić hasła: ",
    });

    await login(page, {
      firstName: "SMUTNY",
      lastName: "NAZWISKO_4",
      login: "NO_PERMISSIONS_LOGIN",
      password: "NO_PERMISSIONS_PASSWORD_2",
    });

    const str = `Jesteś zalogowany jako ${"SMUTNY"} ${"NAZWISKO_4"} (${"NO_PERMISSIONS_LOGIN"}).`;
    await expect(contains(page, str)).toBeVisible();
  });
});
