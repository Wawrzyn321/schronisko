import { expect, Page } from "@playwright/test";
import { contains } from "./../helpers";

export * from "./../helpers";

export const expectSuccessPopups = async (
  page: Page,
  { okText, errorText }
) => {
  await expect(contains(page, okText)).toBeVisible();
  await expect(contains(page, errorText)).not.toBeVisible();
};
