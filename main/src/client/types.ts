import { Animal, News, AnimalCategory } from '.prisma/client';

export type AfterAdoptionAnimal = Pick<Animal, 'id' | 'imageName' | 'name' | 'type'>;

export type NewsListElement = Pick<News, 'id' | 'description' | 'title' | 'createdAt' | 'isPublished' | 'imageName'>;

export type SSRContext = { query: { id: string } };

export const isForAdoption = (a: Animal) =>
    a.category === AnimalCategory.DoAdopcji ||
    a.category === AnimalCategory.PilniePotrzebuja ||
    a.category === AnimalCategory.Weterani;


