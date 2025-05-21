import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIG } from '../../config/configuration';
import { promises as fsp } from 'fs';
import {
  DEFAULT_RESIZING_PRESET,
  ImageData,
  presetsMap,
  SaveImageArgs,
  Size,
} from './types';
import { FsServiceInterface } from './interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp: any = require('sharp');

@Injectable()
export class FsService implements FsServiceInterface {
  private readonly webStaticFilesPath: string;
  private readonly localStaticFilesPath: string;

  constructor(configService: ConfigService) {
    this.webStaticFilesPath = configService.getOrThrow<string>(
      CONFIG.webStaticFilesPath,
    );
    this.localStaticFilesPath = configService.getOrThrow<string>(
      CONFIG.localStaticFilesPath,
    );
  }

  async saveImage({ subdir, name, base64Data, resizingPreset }: SaveImageArgs) {
    base64Data = base64Data.replace(/^data:image\/png;base64,/, '');
    base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, '');
    base64Data = base64Data.replace(/^data:image\/gif;base64,/, '');
    const buf = Buffer.from(base64Data, 'base64');
    const preset: Size = resizingPreset
      ? presetsMap[resizingPreset]
      : DEFAULT_RESIZING_PRESET;
    const resizeOptions = { ...preset, fit: 'cover', withoutEnlargement: true };
    const resized = await sharp(buf).resize(resizeOptions).toBuffer();

    return await fsp.writeFile(
      this.createPath(path.join(subdir, name)),
      resized,
    );
  }

  async deleteImage(subdir: string, name: string) {
    return await fsp.unlink(this.createPath(path.join(subdir, name)));
  }

  async deleteImagesInContent(prevContent: string, newContent = '') {
    try {
      const prevFileNames = [...prevContent.matchAll(/<img src="(.*?)">/g)].map(
        (t) => t[1],
      );
      const newFileNames = [...newContent.matchAll(/<img src="(.*?)">/g)]
        .map((t) => t[1])
        .filter((name) => name.startsWith(this.webStaticFilesPath));
      for (const fileName of prevFileNames) {
        if (!newFileNames.includes(fileName)) {
          await this.deleteImage('', this.getLocalPath(fileName));
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }

  async saveImagesFromContentModyfyingIt(
    content: string,
    images: ImageData[],
    subdir: string,
  ) {
    for (const { name, base64 } of images) {
      await this.saveImage({
        subdir,
        name: this.getLocalPath(name),
        base64Data: base64,
        resizingPreset: null,
      });
      content = content.replace(
        name,
        this.webStaticFilesPath + '/' + path.join('img', subdir, name),
      );
    }
    return content;
  }

  private getLocalPath(name: string) {
    if (name.startsWith(this.webStaticFilesPath)) {
      name = name.replace(this.webStaticFilesPath, '');
    }
    return name;
  }

  private createPath(name: string) {
    const targetPath = path.join(this.localStaticFilesPath, 'img', name);

    const normalizedPath = this.normalizePath(targetPath);

    if (!normalizedPath.startsWith(this.localStaticFilesPath)) {
      throw Error('Illegal path ' + normalizedPath);
    }

    return normalizedPath;
  }

  private normalizePath(targetPath: string) {
    return path
      .normalize(targetPath)
      .replace(/%2e/gi, '.')
      .replace(/%2f|%5c/gi, '/');
  }
}
