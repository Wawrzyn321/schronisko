import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';
import { CacheServiceInterface } from './interface';
import { ConfigService } from '@nestjs/config';
import { CONFIG, ENV_DISABLED } from '../../config/configuration';

type RedisClient = ReturnType<typeof createClient>;

@Injectable()
export class CacheService implements CacheServiceInterface {
  private readonly client: RedisClient | null = null;

  constructor(configService: ConfigService) {
    const redisUrl = configService.getOrThrow<string>(CONFIG.redisUrl);

    if (redisUrl !== ENV_DISABLED) {
      this.client = createClient({ url: redisUrl });

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

    const client = this.client;
    if (client) {
      return {
        value: await this.client.get(key),
        set: async (value: string) => {
          client.set(key, value);
        },
        clear: async () => {
          await client.del(createKey(id, false));
          await client.del(createKey(id, true));
        },
      };
    }
    return null;
  }

  async onSettingsChange() {
    const client = this.client;
    if (client) {
      const keys = (
        await Promise.all([client.keys('page*'), client.keys('news*')])
      ).flat();

      await Promise.all(keys.map((key) => client.del(key)));
    }
  }
}
