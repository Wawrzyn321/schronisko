import { NewsCreateInput } from './News';

export function validateNewsCreate(
  news: NewsCreateInput,
  imageData: string,
): boolean {
  return validateNewsUpdate(news) && !!imageData;
}

export function validateNewsUpdate(news: NewsCreateInput): boolean {
  return !!news.title;
}
