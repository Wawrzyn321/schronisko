import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';

const baseUrl = `${API_URL}/api/const-posts`

export interface ConstPostListElement {
    id: string;
    name: string;
}

export interface ConstPost extends ConstPostListElement {
    content: string;
}

export class ConstPostService {
    async getAll(): Promise<ConstPostListElement[]> {
        return await throwingFetch(baseUrl);
    }

    async get(id: string): Promise<ConstPost> {
        return await throwingFetch(`${baseUrl}/${id}`);
    }

    async save(post: ConstPost): Promise<ConstPost> {
        return await throwingFetch(`${baseUrl}/${post.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post),
        });
    }
}

export const constPostService = new ConstPostService();
