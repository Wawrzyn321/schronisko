import { AnimalCategory } from "@prisma-app/client";

export function isReadonly(category: AnimalCategory) {
  return (
    category === AnimalCategory.ZaTeczowymMostem ||
    category === AnimalCategory.ZnalazlyDom
  );
}
