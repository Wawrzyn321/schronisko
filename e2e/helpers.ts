import { Page } from "@playwright/test";

export const contains = (page: Page, text: string | RegExp, tag = "*") =>
  page
    .locator(tag, {
      hasText: text,
    })
    .last();
