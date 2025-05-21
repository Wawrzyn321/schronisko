import { ImageData, SaveImageArgs } from './types';

export abstract class FsServiceInterface {
  abstract saveImage(args: SaveImageArgs): Promise<void>;
  abstract deleteImage(subdir: string, name: string): Promise<void>;
  abstract deleteImagesInContent(
    prevContent: string,
    newContent?: string,
  ): Promise<void>;
  abstract saveImagesFromContentModyfyingIt(
    content: string,
    images: ImageData[],
    subdir: string,
  ): Promise<string>;
}
