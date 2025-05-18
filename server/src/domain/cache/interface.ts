export type CacheEntry = {
  value: string | null;
  set(value: string): Promise<void>;
  clear(): Promise<void>;
};

export abstract class CacheServiceInterface {
  abstract useArticleCache(
    type: 'news' | 'page',
    id: string,
    useSubstitution?: boolean,
  ): Promise<CacheEntry | null>;

  abstract onSettingsChange(): Promise<void>;
}
