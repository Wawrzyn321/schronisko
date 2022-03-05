import { expect, Page } from "@playwright/test";
import { ADMIN_LOGIN, STORAGE_STATE_JSON } from "./config";
import { closeSync, openSync } from "fs";
import { contains } from "./../helpers";

export * from "./../helpers";

export const navTo = async (page: Page, str: string) =>
  await contains(page, str, "a").click();

export const login = async (
  page: Page,
  { login, password, firstName, lastName } = {
    login: ADMIN_LOGIN,
    password: "HASLO",
    firstName: "IMIE",
    lastName: "NAZWISKO",
  }
) => {
  await page.locator("[placeholder=Login]").fill(login);
  await page.locator("[placeholder=Hasło]").fill(password);

  await page.locator("button", { hasText: "Zaloguj" }).press("Enter");

  await expect(
    contains(page, "Wygląda na to, że wprowadzone dane są nieprawidłowe. ")
  ).not.toBeVisible();

  // profile
  await expect(
    page
      .locator("*", {
        hasText: `Jesteś zalogowany jako ${firstName} ${lastName} (${login}).`,
      })
      .first()
  ).toBeVisible();
};

export const expectSuccessPopups = async (
  page: Page,
  { okText, errorText }
) => {
  await expect(contains(page, okText)).toBeVisible();
  await expect(contains(page, errorText)).not.toBeVisible();
};

export const removeStorageState = () => {
  // 'w' overrides state
  closeSync(openSync(STORAGE_STATE_JSON, "w"));
};
