import { API_URL } from "../config";
import { throwingFetch } from "./throwingFetch";
import type { AnimalImage } from '@prisma-app/client';

const baseUrl = `${API_URL}/api/animal-images`

export type AnimalImageParams = Pick<AnimalImage, 'order' | 'visible'> & {
    data: string;
    imageName?: string;
}

export class AnimalImagesService {
    async get(animalId: string): Promise<AnimalImageParams[]> {
        return await throwingFetch(`${baseUrl}/${animalId}`);
    }

    async upsert(animalId: string, images: AnimalImageParams[]): Promise<AnimalImageParams[]> {
        return await throwingFetch(`${baseUrl}/${encodeURIComponent(animalId)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(images),
        });
    }

    async delete(animalId: string): Promise<void> {
        return await throwingFetch(`${baseUrl}/${encodeURIComponent(animalId)}`, {
            method: 'DELETE',
        });
    }
}

export const animalImagesService = new AnimalImagesService();
