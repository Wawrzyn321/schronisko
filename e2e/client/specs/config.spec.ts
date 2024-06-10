import { expect, test } from "@playwright/test";
import {
    contains,
} from "../helpers";

import { BACKOFFICE_URL, MAIN_URL } from "../config";
import { login, navTo } from "../../backoffice/helpers";

test.describe("Configuration: ", () => {
    test("Configures dog volunteering", async ({ page }) => {
        const setDogVolunteering = async (enabled: boolean) => {
            await navTo(page, "Dodatkowe ustawienia");
            await page.getByLabel('Psi wolontariat możliwy').setChecked(enabled);
        }

        const ensureDogVolunteeringDisabled = async () => {
            await page.waitForTimeout(100); // ensure update
            await page.goto(MAIN_URL + '/volunteering/dogs');
            await expect(contains(page, 'wolontariat-pies-off')).toBeVisible();
            await expect(page.locator('form')).not.toBeVisible();
        }

        const ensureDogVolunteeringEnabled = async () => {
            await page.waitForTimeout(100); // ensure update
            await page.goto(MAIN_URL + '/volunteering/dogs');
            await expect(contains(page, 'wolontariat-pies-on')).toBeVisible();
            await expect(page.locator('form')).toBeVisible();
        }

        await ensureDogVolunteeringDisabled();

        await page.goto(BACKOFFICE_URL);
        await login(page);
        await setDogVolunteering(true);

        await ensureDogVolunteeringEnabled();

        await page.goto(BACKOFFICE_URL);
        await setDogVolunteering(false);

        await ensureDogVolunteeringDisabled();
    });

    test("Configures templates", async ({ page }) => {
        await page.goto(MAIN_URL);
        await contains(page, 'Template News').click()
        await expect(contains(page, '%KRS% %KONTO%')).toBeVisible();

        await page.goto(BACKOFFICE_URL);
        await login(page);
        await navTo(page, "Dodatkowe ustawienia");

        await page.getByLabel('Numer KRS').fill('NR_KRS')
        await page.locator('button', {hasText: 'Zapisz'}).nth(0).click();
        await page.getByLabel('Numer konta wirtualnych adopcji').fill('NR_KONTA')
        await page.locator('button', {hasText: 'Zapisz'}).nth(1).click();

        await page.goto(MAIN_URL);
        await contains(page, 'Template News').click()
        await expect(contains(page, 'NR_KRS NR_KONTA')).toBeVisible();
    });
});
