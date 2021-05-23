import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';
import type { News } from '.prisma/client';

const baseUrl = `${API_URL}/api/news`

export interface NewsListElement {
    id: string;
    description: string;
    title: string;
    createdAt: Date;
    isPublished: boolean;
}

export interface NewsCreateParams {
    title: string;
    description: string;
    isPublished: boolean;
    content: string;
}

export interface NewsUpdateParams extends NewsCreateParams {
    id: string;
}

export class NewsService {
    async getAll(): Promise<NewsListElement[]> {
        return await throwingFetch(baseUrl);
    }

    async get(id: string): Promise<News> {
        return await throwingFetch(`${baseUrl}/${id}`);
    }

    // async save(news: NewsCreateParams): Promise<News> {
    //     return await throwingFetch(`${baseUrl}/${news.id}`, {
    //         method: 'PATCH',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(news),
    //     });
    // }

    async create(news: NewsCreateParams, imageData: string): Promise<NewsListElement> {
        return await throwingFetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...news, imageData }),
        });
    }

    async update(news: NewsUpdateParams, imageData?: string): Promise<NewsListElement> {
        return await throwingFetch(`${baseUrl}/${news.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...news, imageData }),
        });
    }

    async delete(id: string): Promise<News> {
        return await throwingFetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
        });
    }
}

export const newsService = new NewsService();
