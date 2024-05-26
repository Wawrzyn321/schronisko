import type { AnimalImageParams } from './AnimalImagesService';
import { throwingFetch } from "./throwingFetch";
import type { Animal } from '@prisma-app/client';
import { animalImagesService } from "./AnimalImagesService";
import { isReadonly } from '../components/Animals/Form/animal-readonly';
import { API_URL } from '../config';
import { generateUUID } from '../common/generateUUID';

const baseUrl = `${API_URL}/api/animals`

export type AnimalFormData = Omit<Animal, 'addedAt' | 'modifiedAt'> & {
    imageData: string | null;
}

export class AnimalsService {
    async getInitial(): Promise<Animal[]> {
        return await throwingFetch(baseUrl + "?take=10");
    }

    async getAll(): Promise<Animal[]> {
        return await throwingFetch(baseUrl);
    }

    async get(id: string): Promise<Animal> {
        return await throwingFetch(`${baseUrl}/${id}`);
    }

    async create(animal: AnimalFormData, images: AnimalImageParams[]): Promise<Animal> {
        const createdAnimal: Animal = await throwingFetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(animal),
        });
        await animalImagesService.upsert(createdAnimal.id, images);
        return createdAnimal;
    }

    async update(animal: AnimalFormData, images: AnimalImageParams[]): Promise<Animal> {
        const updatedAnimal: Animal = await throwingFetch(`${baseUrl}/${encodeURIComponent(animal.id)}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(animal),
        });
        if (!isReadonly(animal.category)) {
            await animalImagesService.upsert(updatedAnimal.id, images);
        }
        return updatedAnimal;
    }

    async delete(id: string): Promise<Animal> {
        try {
            await animalImagesService.delete(id);
        } catch (e: unknown) {
            if (e instanceof Error) {
                const errorId =generateUUID();
                console.warn(errorId + ": " + e.message);
                throw Error(`Wystąpił błąd na serwerze (${errorId}).`);
            }
        }
        return await throwingFetch(`${baseUrl}/${(encodeURIComponent(id))}`, {
            method: 'DELETE',
        });
    }
}

export const animalsService = new AnimalsService();
