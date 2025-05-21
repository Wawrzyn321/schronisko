import { ConfigService } from '@nestjs/config';
import { CacheEntry, CacheServiceInterface } from '../domain/cache/interface';
import { FsServiceInterface } from '../domain/fs/interface';
import { SaveImageArgs, ImageData } from '../domain/fs/types';
import { CONFIG } from '../config/configuration';

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

export class FsServiceMock implements FsServiceInterface {
  saveImage(args: SaveImageArgs): Promise<void> {
    return Promise.resolve();
  }
  deleteImage(subdir: string, name: string): Promise<void> {
    return Promise.resolve();
  }
  deleteImagesInContent(
    prevContent: string,
    newContent?: string,
  ): Promise<void> {
    return Promise.resolve();
  }
  saveImagesFromContentModyfyingIt(
    content: string,
    images: ImageData[],
    subdir: string,
  ): Promise<string> {
    return Promise.resolve(content);
  }
}

export const CONFIG_SERVICE_MOCK = {
  provide: ConfigService,
  useValue: {
    getOrThrow: jest.fn((key: string) => {
      switch (key) {
        case CONFIG.localStaticFilesPath:
        case CONFIG.webStaticFilesPath:
          return `<${key}>`;
        default:
          throw Error(`Unknown config key: ${key}`);
      }
    }),
  },
};
