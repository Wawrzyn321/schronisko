import * as path from 'path';
import {
  LOCAL_STATIC_FILES_PATH,
  WEB_STATIC_FILES_PATH,
} from './../app.module';
import { promises as fsp } from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp: any = require('sharp');

export type ImageData = { name: string; base64: string };

type ResizingPresets = 'News' | 'Animal Gallery' | 'Animal Miniature';

type Size = { width: number; height: number };

const presetsMap: { [gender in ResizingPresets]: Size } = {
  News: {
    width: 1000,
    height: 670,
  },
  'Animal Gallery': {
    width: 1333,
    height: 1000,
  },
  // niby miniature, ale i tak musi być rozsądnej jakości żeby pokazać w lightboxie
  'Animal Miniature': {
    width: 1300,
    height: 975,
  },
};

function normalizePath(targetPath: string) {
  return path
    .normalize(targetPath)
    .replace(/%2e/gi, '.')
    .replace(/%2f|%5c/gi, '/');
}

function createPath(name: string) {
  const targetPath = path.join(LOCAL_STATIC_FILES_PATH, 'img', name);

  const normalizedPath = normalizePath(targetPath);

  if (!normalizedPath.startsWith(LOCAL_STATIC_FILES_PATH)) {
    throw Error('Illegal path ' + normalizedPath);
  }

  return normalizedPath;
}

type SaveImageArgs = {
  subdir: string;
  name: string;
  base64Data: string;
  resizingPreset: ResizingPresets;
};

export async function saveImage({
  subdir,
  name,
  base64Data,
  resizingPreset,
}: SaveImageArgs) {
  base64Data = base64Data.replace(/^data:image\/png;base64,/, '');
  base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, '');
  base64Data = base64Data.replace(/^data:image\/gif;base64,/, '');
  const buf = Buffer.from(base64Data, 'base64');
  const preset: Size = presetsMap[resizingPreset] || {
    width: 1920,
    height: 1080,
  };
  const resizeOptions = { ...preset, fit: 'cover', withoutEnlargement: true };
  const resized = await sharp(buf).resize(resizeOptions).toBuffer();

  return await fsp.writeFile(createPath(path.join(subdir, name)), resized);
}

export async function deleteImage(subdir: string, name: string) {
  return await fsp.unlink(createPath(path.join(subdir, name)));
}

function getLocalPath(name: string) {
  if (name.startsWith(WEB_STATIC_FILES_PATH)) {
    name = name.replace(WEB_STATIC_FILES_PATH, '');
  }
  return name;
}

export async function deleteImagesInContent(
  prevContent: string,
  newContent = '',
) {
  try {
    const prevFileNames = [...prevContent.matchAll(/<img src="(.*?)">/g)].map(
      (t) => t[1],
    );
    const newFileNames = [...newContent.matchAll(/<img src="(.*?)">/g)]
      .map((t) => t[1])
      .filter((name) => name.startsWith(WEB_STATIC_FILES_PATH));
    for (const fileName of prevFileNames) {
      if (!newFileNames.includes(fileName)) {
        await deleteImage('', getLocalPath(fileName));
      }
    }
  } catch (e) {
    console.warn(e);
  }
}

export async function saveImagesFromContentModyfyingIt(
  content: string,
  images: ImageData[],
  subdir: string,
) {
  for (const { name, base64 } of images) {
    await saveImage({
      subdir,
      name: getLocalPath(name),
      base64Data: base64,
      resizingPreset: null,
    });
    content = content.replace(
      name,
      WEB_STATIC_FILES_PATH + '/' + path.join('img', subdir, name),
    );
  }
  return content;
}
