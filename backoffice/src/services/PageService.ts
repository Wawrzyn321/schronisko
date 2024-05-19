import type { FileMap } from '../components/shared/Editor/FileMap';
import { throwingFetch } from "./throwingFetch";
import { replaceContent } from "../components/shared/Editor/FileMap";
import { API_URL } from '../config';
import type { Page } from '@prisma-app/client'

export type PageListElement = Pick<Page, 'id' | 'title'>

const baseUrl = `${API_URL}/api/pages`

export class PageService {
    async getInitial(): Promise<PageListElement[]> {
        return await throwingFetch(baseUrl + '?takeTop=10');
    }

    async getAll(): Promise<PageListElement[]> {
        return await throwingFetch(baseUrl);
    }

    async get(id: string): Promise<Page> {
        return await throwingFetch(`${baseUrl}/${id}`);
    }

    async save(page: Page, imagesMap: FileMap): Promise<Page> {
        const [content, images] = replaceContent(page.content, imagesMap);

        const data = {
            page: { ...page, content },
            images
        };

        return await throwingFetch(`${baseUrl}/${page.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    }
}

export const pageService = new PageService();
