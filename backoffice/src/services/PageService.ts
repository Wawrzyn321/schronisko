import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';
import type { PageListElement, Page } from "../../../prisma/prisma-types/Page";

const baseUrl = `${API_URL}/api/pages`

export class PageService {
    async getAll(): Promise<PageListElement[]> {
        return await throwingFetch(baseUrl);
    }

    async get(id: string): Promise<Page> {
        return await throwingFetch(`${baseUrl}/${id}`);
    }

    async save(post: Page): Promise<Page> {
        return await throwingFetch(`${baseUrl}/${post.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post),
        });
    }
}

export const pageService = new PageService();
