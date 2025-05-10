type CacheEntry = {
  value: string;
  set(value: string): Promise<string>;
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
