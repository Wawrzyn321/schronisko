import { expect, test } from "@playwright/test";
import {
  contains,
} from "../helpers";

import { MAIN_URL } from "../config";

test("Main page: Renders", async ({ page }) => {
  await page.goto(MAIN_URL);

  // page title
  await expect(contains(page, 'dla bezdomnych zwierząt')).toBeVisible()

  // news display
  await expect(contains(page, 'Template News')).toBeVisible()

  // post displayed on the front page
  await expect(contains(page, 'informacje o adopcjach')).toBeVisible();
});