export function validateNewsCreate(
  news: { title: string },
  imageData: string,
): boolean {
  return validateNewsUpdate(news) && !!imageData;
}

export function validateNewsUpdate({ title }: { title: string }): boolean {
  return !!title;
}
