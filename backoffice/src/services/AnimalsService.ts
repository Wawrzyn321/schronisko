import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';
import type { Animal, AnimalCategory, AnimalGender, AnimalLocation, AnimalType, VirtualCaretakerType } from '.prisma/client';

const baseUrl = `${API_URL}/api/animals`

export interface AnimalCreateParams {
    name: string
    type: AnimalType
    gender: AnimalGender
    description: string
    category: AnimalCategory
    location: AnimalLocation | null
    virtualCaretakerName: string | null
    virtualCaretakerType: VirtualCaretakerType
    isPublic: boolean
}

export class AnimalsService {
    async getAll(): Promise<Animal[]> {
        return await throwingFetch(baseUrl);
    }

    async get(id: string): Promise<Animal> {
        return await throwingFetch(`${baseUrl}/${id}`);
    }

    async create(animal: AnimalCreateParams): Promise<Animal> {
        return await throwingFetch(baseUrl+'xd', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(animal),
        });
    }

    async update(animal: Animal): Promise<Animal> {
        return await throwingFetch(`${baseUrl}/${animal.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(animal),
        });
    }

    async delete(id: string): Promise<Animal> {
        return await throwingFetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
        });
    }
}

export const animalsService = new AnimalsService();
