import { Locator, Page, expect, test } from "@playwright/test";
import {
    contains,
} from "../helpers";

import { BACKOFFICE_URL, MAIN_URL } from "../config";
import { login } from "../../backoffice/helpers";

const MAIN_PAGE_TEST_URL = MAIN_URL + '/how-to';
const BACKOFFICE_EDIT_URL = BACKOFFICE_URL + '/#/pages/jak-pomoc?mode=edit';
const INSERT_IMAGE_SELECTOR = '.ql-image';

const chooseHeading = async (page: Page, isHeading: boolean) => {
    const HEADING_DROPDOWN_SELECTOR = '[aria-controls=ql-picker-options-0]';
    const HEADING_DROPDOWN_HEADER_OPTION_SELECTOR = '.ql-picker-item[data-value="1"]';

    await page.locator(HEADING_DROPDOWN_SELECTOR).click();
    if (isHeading) {
        await page.locator(HEADING_DROPDOWN_HEADER_OPTION_SELECTOR).click();
    } else {
        await page.getByRole('button', { name: 'Normal' }).first().click();
    }
}

const expectRenderedArticle = async (container: Locator) => {
    await expect(container.getByRole('heading', { name: 'How to' })).toBeVisible();
    await expect(container.getByRole('heading', { name: 'article heading' })).toBeVisible();

    const image = container.locator('img')
    expect(await image.evaluate(e => (e as HTMLImageElement).complete)).toBe(true)
}

test("Allows editing articles", async ({ page, context }) => {
    await page.goto(BACKOFFICE_URL);
    await login(page);
    await page.goto(BACKOFFICE_EDIT_URL);


    await page.locator("button", { hasText: "Zapisz" }).first().click();

    const editor = page.locator('.ql-editor');
    await editor.fill(''); // make sure the input is cleared
    await chooseHeading(page, false);

    // bolded text - keyboard shortcuts
    await editor.press('Meta+b');
    await new Promise(resolve => setTimeout(resolve, 100));
    await editor.pressSequentially('bold text\n');
    await editor.press('Meta+b');

    // header - Quill toolbar
    await chooseHeading(page, true)
    await editor.pressSequentially('article heading');

    // image
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator(INSERT_IMAGE_SELECTOR).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("./fixtures/img.jpeg");

    // save anc check the preview
    await contains(page, "Zapisz").click();

    await contains(page, 'Podgląd').click();

    await expectRenderedArticle(page.locator('.preview'));

    const pagePromise = context.waitForEvent('page');
    await page.getByLabel('Otwórz w nowej karcie').click();
    const openedPage = await pagePromise;
    expect(openedPage.url()).toBe(MAIN_PAGE_TEST_URL)

    await expectRenderedArticle(openedPage.locator('#layout'));
});