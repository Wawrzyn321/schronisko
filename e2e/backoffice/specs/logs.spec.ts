import { test, expect } from "@playwright/test";
import { contains, login, navTo, expectSuccessPopups, removeStorageState } from "../helpers";

import { BACKOFFICE_URL, } from "../config";

test.describe("Logs: ", () => {

  const STORAGE_STATE_PATH = 'storage/logs.storage.json'

  test("Delete logs", async ({ page }) => {
    removeStorageState(STORAGE_STATE_PATH);
    await page.goto(BACKOFFICE_URL);

    await login(page);

    await navTo(page, "Logi");

    await contains(page, "Ukryj własne logi").click();

    await expect(contains(page, "ADMIN_LOGIN usunął logi.")).not.toBeVisible();

    await contains(page, "Usuń logi", "button").click();

    await expect(contains(page, "Usuń logi", "header")).toBeVisible();

    await contains(page, "Usuń", "button").click();

    await expectSuccessPopups(page, {
      okText: "Logi zostały usunięte",
      errorText: "Nie udało się usunąć logów: ",
    });

    await expect(contains(page, "ADMIN_LOGIN usunął logi.")).toBeVisible();
  });
});
