import { AnimalCategory, AnimalType } from '.prisma/client';
import { BACKEND_URL, throwingFetch } from 'api';

export async function fetchAnimals(category: AnimalCategory, type: AnimalType) {
  const url = `${BACKEND_URL}/api/c/animals?category=${category}&type=${type}`;
  try {
    return await throwingFetch(url);
  } catch (e) {
    console.warn('error', e);
    // todo
    return [];
  }
}
