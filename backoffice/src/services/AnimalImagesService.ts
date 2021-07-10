import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';

const baseUrl = `${API_URL}/api/animal-images`

export interface AnimalImageParams {
    data: string;
    order: number;
    imageName?: string;
    visible: boolean;
}

export class AnimalImagesService {
    async get(animalId: string): Promise<AnimalImageParams[]> {
        return await throwingFetch(`${baseUrl}/${animalId}`);
    }

    async upsert(animalId: string, images: AnimalImageParams[]): Promise<AnimalImageParams[]> {
        return await throwingFetch(`${baseUrl}/${animalId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(images),
        });
    }

    async delete(animalId: string): Promise<void> {
        return await throwingFetch(`${baseUrl}/${animalId}`, {
            method: 'DELETE',
        });
    }
}

export const animalImagesService = new AnimalImagesService();
