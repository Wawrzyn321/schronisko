import type { AnimalImageParams } from './AnimalImagesService';
import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';
import type { Animal, AnimalCategory, AnimalGender, AnimalLocation, AnimalType, VirtualCaretakerType } from '.prisma/client';
import { animalImagesService } from "./AnimalImagesService";

const baseUrl = `${API_URL}/api/animals`

export interface AnimalData {
    name: string
    id: string
    type: AnimalType
    gender: AnimalGender
    description: string
    category: AnimalCategory
    location: AnimalLocation | null
    virtualCaretakerName: string | null
    virtualCaretakerType: VirtualCaretakerType
    isPublic: boolean
    imageData?: string
    imageName?: string
    note?: string;
}

export class AnimalsService {
    async getAll(): Promise<Animal[]> {
        return await throwingFetch(baseUrl);
    }

    async get(id: string): Promise<Animal> {
        return await throwingFetch(`${baseUrl}/${id}`);
    }

    async create(animal: AnimalData, images: AnimalImageParams[]): Promise<Animal> {
        const createdAnimal: Animal = await throwingFetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(animal),
        });
        await animalImagesService.upsert(createdAnimal.id, images);
        return createdAnimal;
    }

    async update(animal: AnimalData, images: AnimalImageParams[]): Promise<Animal> {
        const updatedAnimal: Animal = await throwingFetch(`${baseUrl}/${encodeURIComponent(animal.id)}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(animal),
        });
        await animalImagesService.upsert(updatedAnimal.id, images);
        return updatedAnimal;
    }

    async delete(id: string): Promise<Animal> {
        try {
            await animalImagesService.delete(id);
        } catch (e) {
            console.warn(e);
            throw Error("Nie można usunąć zdjęć zwierzęcia.");
        }
        return await throwingFetch(`${baseUrl}/${(encodeURIComponent(id))}`, {
            method: 'DELETE',
        });
    }
}

export const animalsService = new AnimalsService();
