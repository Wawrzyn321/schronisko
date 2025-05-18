import { CacheEntry, CacheServiceInterface } from '../domain/cache/interface';

export class CacheServiceMock implements CacheServiceInterface {
  useArticleCache(
    type: 'news' | 'page',
    id: string,
    useSubstitution?: boolean,
  ): Promise<CacheEntry | null> {
    return Promise.resolve(null);
  }

  onSettingsChange() {
    return Promise.resolve();
  }
}
