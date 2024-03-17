import { Page } from "@playwright/test";

export const contains = (page: Page, text: string | RegExp, selector = "*") =>
  page
    .locator(selector, {
      hasText: text,
    })
    .last();
