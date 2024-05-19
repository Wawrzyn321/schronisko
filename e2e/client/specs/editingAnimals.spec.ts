import { Page, expect, test } from "@playwright/test";
import {
    contains,
} from "../helpers";

import { BACKOFFICE_URL, MAIN_URL } from "../config";
import { login, navTo } from "../../backoffice/helpers";

const goToDogAdoption = async (page: Page) => {
    await page.getByText("Zwierzęta", { exact: true }).hover();
    await page.getByText("Psy do adopcji").click();
}

test("Renders new newly adopted animals", async ({ page }) => {
    await page.goto(MAIN_URL);
    await expect(contains(page, 'Pies poadopcyjny')).toBeVisible();

    await goToDogAdoption(page);
    await expect(contains(page, 'poadopcyjny 2')).toBeVisible();
    await expect(contains(page, 'ref2')).toBeVisible();

    await page.goto(BACKOFFICE_URL);
    await login(page);
    await navTo(page, "Zwierzęta");
    await navTo(page, 'poadopcyjny 2')
    await page.getByLabel('Kategoria').selectOption('Znalazły dom');
    await page.locator("button", { hasText: "Zapisz" }).first().click();

    await page.goto(MAIN_URL);
    await page.reload(); // force hard reload
    await expect(contains(page, 'Pies poadopcyjny')).toBeVisible();
    await expect(contains(page, 'Pies poadopcyjny 2')).toBeVisible()

    await goToDogAdoption(page);
    await expect(contains(page, 'poadopcyjny 2')).not.toBeVisible();
});