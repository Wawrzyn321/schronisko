import { CacheServiceInterface } from '../domain/cache/interface';

export class CacheServiceMock implements CacheServiceInterface {
  useArticleCache(
    type: 'news' | 'page',
    id: string,
    useSubstitution?: boolean,
  ) {
    return null;
  }

  onSettingsChange() {
    return null;
  }
}
