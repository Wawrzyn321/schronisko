import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';
import type { NewsListElement, News, NewsCreateParams } from "../News";

const baseUrl = `${API_URL}/api/news`

export class NewsService {
    async getAll(): Promise<NewsListElement[]> {
        return await throwingFetch(baseUrl);
    }

    async get(id: string): Promise<News> {
        return await throwingFetch(`${baseUrl}/${id}`);
    }

    async save(news: News): Promise<News> {
        return await throwingFetch(`${baseUrl}/${news.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(news),
        });
    }

    async create(news: NewsCreateParams): Promise<NewsListElement> {
        return await throwingFetch(baseUrl, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(news),
        });
    }

    async update(news: News): Promise<NewsListElement> {
        return await throwingFetch(`${baseUrl}/${news.id}`, {
            method: 'PATCH', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(news),
        });
    }

    async delete(id: string): Promise<News> {
        return await throwingFetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
        });
    }
}

export const newsService = new NewsService();
