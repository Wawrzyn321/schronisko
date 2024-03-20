import { Page } from "@playwright/test";
import { closeSync, openSync } from "fs";

export const contains = (page: Page, text: string | RegExp, selector = "*") =>
  page
    .locator(selector, {
      hasText: text,
    })
    .last();


export const navTo = async (page: Page, str: string) =>
  await contains(page, str, "a").click();

export const removeStorageState = (key: string) => {
  // 'w' overrides state
  closeSync(openSync(key, "w"));
};
