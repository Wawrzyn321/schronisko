import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';
import type { Settings } from "@prisma/client";

const baseUrl = `${API_URL}/api/settings`

export class SettingsService {
    async get(): Promise<Settings[]> {
        return await throwingFetch(baseUrl);
    }

    async upsert(id: string, value: string): Promise<Settings[]> {
        return await throwingFetch(`${baseUrl}/${id}/${value}`, { method: 'PUT' });
    }
}

export const settingsService = new SettingsService();
