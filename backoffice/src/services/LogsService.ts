import type { Logs } from '@prisma-app/client';
import { throwingFetch } from "./throwingFetch";
import { API_URL } from '../config';

const baseUrl = `${API_URL}/api/logs`;

export class LogsService {
    async getInitial(): Promise<Logs[]> {
        return await throwingFetch(baseUrl + '?takeTop=10');
    }

    async getAll(): Promise<Logs[]> {
        return await throwingFetch(baseUrl);
    }

    async delete(): Promise<Logs[]> {
        return await throwingFetch(baseUrl, { method: 'DELETE' });
    }
}

export const logsService = new LogsService();
