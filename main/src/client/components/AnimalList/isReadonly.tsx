import { AnimalCategory } from '.prisma/client';

export function isReadonly(category: AnimalCategory) {
  return (
    category === AnimalCategory.ZaTeczowymMostem ||
    category === AnimalCategory.ZnalazlyDom
  );
}
