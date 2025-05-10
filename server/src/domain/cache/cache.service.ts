import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';
import { CacheServiceInterface } from './interface';

const REDIS_DISABLED = 'DISABLED';

type RedisClient = ReturnType<typeof createClient>;

@Injectable()
export class CacheService implements CacheServiceInterface {
  private readonly client: RedisClient = null;

  constructor() {
    const redisEnvValue = process.env.REDIS_URL;

    if (redisEnvValue !== REDIS_DISABLED && !redisEnvValue) {
      throw Error("REDIS_URL is not configured or not 'DISABLED'");
    }

    if (redisEnvValue !== REDIS_DISABLED) {
      this.client = createClient({ url: redisEnvValue });

      this.client.on('error', (err: Error) => {
        throw err;
      });

      this.client.connect();
    }
  }

  async useArticleCache(
    type: 'news' | 'page',
    id: string,
    useSubstitution?: boolean,
  ) {
    const createKey = (id: string, useSubstitution?: boolean) => {
      return `${type}_${id}_${useSubstitution}`;
    };

    const key = createKey(id, useSubstitution);

    if (this.client) {
      return {
        value: await this.client.get(key),
        set: async (value: string) => this.client.set(key, value),
        clear: async () => {
          await this.client.del(createKey(id, false));
          await this.client.del(createKey(id, true));
        },
      };
    }
    return null;
  }

  async onSettingsChange() {
    if (this.client) {
      const keys = (
        await Promise.all([
          this.client.keys('page*'),
          this.client.keys('news*'),
        ])
      ).flat();

      await Promise.all(keys.map((key) => this.client.del(key)));
    }
  }
}
