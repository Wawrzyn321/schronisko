import type { Logs } from '@prisma/client';
import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';

const baseUrl = `${API_URL}/api/logs`;

export class LogsService {
    async getInitial(): Promise<Logs[]> {
        return await throwingFetch(baseUrl + '?takeTop=10');
    }

    async getAll(): Promise<Logs[]> {
        return await throwingFetch(baseUrl);
    }
}

export const logsService = new LogsService();
