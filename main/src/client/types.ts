import { Animal, News } from '.prisma/client';

export type AfterAdoptionAnimal = Pick<Animal, 'id' | 'imageName' | 'name' | 'type'>;

export type NewsListElement = Pick<News, 'id' | 'description' | 'title' | 'createdAt' | 'isPublished' | 'imageName'>;

export type SSRContext = { query: { id: string } };
