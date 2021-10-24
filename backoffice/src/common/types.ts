import type { Animal } from '@prisma/client';

export type AnimalListElement = Omit<Animal, 'description'>;
