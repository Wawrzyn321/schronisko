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
    async getInitial(): Promise<NewsListElement[]> {
        return await throwingFetch(baseUrl + '?takeTop=10');
    }

    async getAll(): Promise<NewsListElement[]> {
        return await throwingFetch(baseUrl);
    }

    async get(id: string): Promise<News> {
        return await throwingFetch(`${baseUrl}/${id}`);
    }

    async create(news: NewsCreateParams, imageData: string): Promise<NewsListElement> {
        const input = {
            news,
            imageData
        };
        return await throwingFetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        });
    }

    async update(news: NewsUpdateParams, imageData: string): Promise<NewsListElement> {
        const input = {
            news,
            imageData
        };
        return await throwingFetch(`${baseUrl}/${news.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        });
    }

    async delete(id: string): Promise<News> {
        return await throwingFetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
        });
    }
}

export const newsService = new NewsService();
