import { Locator, Page, expect, test } from "@playwright/test";
import {
    contains,
} from "../helpers";

import { BACKOFFICE_URL, MAIN_URL } from "../config";
import { expectSuccessPopups, login } from "../../backoffice/helpers";

const BACKOFFICE_EDIT_URL = BACKOFFICE_URL + '/#/news';

test("Allows editing articles", async ({ page, context }) => {
    await page.goto(BACKOFFICE_URL);
    await login(page);
    await page.goto(BACKOFFICE_EDIT_URL)

    await page.locator('[aria-label="Dodaj newsa"]').click();

    await page.locator('[placeholder="Tytuł"]').fill("news-title-2");

    await page.setInputFiles(
        '[aria-label="Wybierz obraz"]',
        "./fixtures/img.jpeg"
    );
    await contains(page, "Dodaj").click();

    await contains(page, "Publiczny").click();

    await contains(page, "Utwórz").click();

    const pagePromise = context.waitForEvent('page');
    await page.getByLabel('Otwórz w nowej karcie').click();
    const openedPage = await pagePromise;
    expect(openedPage.url()).toMatch('http://localhost:3015/new');

    expect(contains(openedPage, 'news-title-2')).toBeVisible();

    await openedPage.goto(MAIN_URL);
    await expect(contains(openedPage, 'news-title-2')).toBeVisible();

    const image = openedPage.locator(`img[alt=news-title-2]`)
    expect(await image.evaluate(e => (e as HTMLImageElement).complete)).toBe(true);

    await page.locator('[aria-label="Usuń newsa"]').click();

    await contains(page, "Usuń", ".modal-confirm").click();

    await expectSuccessPopups(page, {
        okText: "News został usunięty.",
        errorText: "Nie można usunąć newsa: ",
    });
});