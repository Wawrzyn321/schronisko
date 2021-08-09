import { NewsCreateInput } from './News';

export function validateNewsCreate<T>(news: NewsCreateInput, imageData: string): boolean {
  return validateNewsUpdate(news) && !!imageData;
}

export function validateNewsUpdate<T>(news: NewsCreateInput): boolean {
  return !!news.title;
}