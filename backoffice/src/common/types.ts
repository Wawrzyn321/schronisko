import type { Animal } from '@prisma-app/client';

export type AnimalListElement = Omit<Animal, 'description'>;
