import type { FileMap } from './../components/shared/Editor/FileMap';
import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';
import type { News } from '.prisma/client';
import { replaceContent } from "../components/shared/Editor/FileMap";

const baseUrl = `${API_URL}/api/news`

export type NewsListElement = Pick<News, 'id' | 'description' | 'title' | 'createdAt' | 'isPublished' | 'imageName'>;
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

    async create(news: NewsCreateParams, imagesMap: FileMap, imageData: string): Promise<NewsListElement> {
        const [content, images] = replaceContent(news.content, imagesMap);

        const input = {
            news: { ...news, content },
            images,
            imageData
        };
        return await throwingFetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        });
    }

    async update(news: NewsUpdateParams, imagesMap: FileMap, imageData: string): Promise<NewsListElement> {
        const [content, images] = replaceContent(news.content, imagesMap);

        const input = {
            news: { ...news, content },
            images,
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
