import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';

const baseUrl = `${API_URL}/api/news-images`

export class NewsImageService {
    async addOrReplace(newsId: string, imageData: string): Promise<any> {
        // const formData  = new FormData();
        // formData.append('image', image, image.name);
        return await throwingFetch(`${baseUrl}/${newsId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageData: imageData }),
        });
    }

    // async delete(id: string): Promise<News> {
    //     return await throwingFetch(`${baseUrl}/${id}`, {
    //         method: 'DELETE',
    //     });
    // }
}

export const newsImageService = new NewsImageService();
