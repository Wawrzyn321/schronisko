import { API_URL } from '../config';
import { throwingFetch } from './throwingFetch';
import type { Settings } from '@prisma-app/client';

const baseUrl = `${API_URL}/api/settings`;

export class SettingsService {
  async get(): Promise<Settings[]> {
    return await throwingFetch(baseUrl);
  }

  async upsert(id: string, value: string): Promise<Settings[]> {
    return await throwingFetch(`${baseUrl}/${id}/${encodeURIComponent(value)}`, { method: 'PUT' });
  }
}

export const settingsService = new SettingsService();
