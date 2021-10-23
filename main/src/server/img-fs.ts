import { LOCAL_STATIC_FILES_PATH, WEB_STATIC_FILES_PATH } from './app.module';
import { promises as fsp } from "fs"
const sharp: any = require('sharp');

export type ImageData = { name: string, base64: string };

type ResizingPresets = 'News' | 'Animal Gallery' | 'Animal Miniature';

const presetsMap: { [gender in ResizingPresets]: { width: number, height: number } } = {
    'News': {
        width: 515,
        height: 345,
    },
    "Animal Gallery": {
        width: 708,
        height: 533,
    },
    "Animal Miniature": {
        width: 576,
        height: 432,
    }
}

function createPath(name: string) {
    return LOCAL_STATIC_FILES_PATH + name;
}

export async function saveImage(subdir: string, name: string, base64Data: string, resizingPreset: ResizingPresets) {
    base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
    base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, "");
    base64Data = base64Data.replace(/^data:image\/gif;base64,/, "");
    const buf = Buffer.from(base64Data, 'base64');
    const preset = presetsMap[resizingPreset];
    if (preset) {
        const resized = await sharp(buf).resize(preset.width, preset.height).toBuffer();
        return await fsp.writeFile(createPath(subdir + name), resized);
    } else {
        const resized = await sharp(buf).toBuffer();
        return await fsp.writeFile(createPath(subdir + name), resized);
    }
}

export async function deleteImage(name: string) {
    return await fsp.unlink(createPath(name));
}

function getLocalPath(name: string) {
    if (name.startsWith(WEB_STATIC_FILES_PATH)) {
        name = name.replace(WEB_STATIC_FILES_PATH, '');
    }
    return name;
}

export async function deleteImagesInContent(prevContent: string, newContent: string = '') {
    try {
        // @ts-ignore
        const prevFileNames = [...prevContent.matchAll(/<img src="(.*?)">/g)].map((t) => t[1]);
        // @ts-ignore
        const newFileNames = [...newContent.matchAll(/<img src="(.*?)">/g)].map((t) => t[1]).filter(name => name.startsWith(WEB_STATIC_FILES_PATH));
        for (const fileName of prevFileNames) {
            if (!newFileNames.includes(fileName)) {
                await deleteImage(getLocalPath(fileName));
            }
        }
    } catch (e) {
        console.warn(e);
    }
}

export async function saveImagesFromContentModyfyingIt(content: string, images: ImageData[], subdir = '') {
    for (let { name, base64 } of images) {
        await saveImage(subdir, getLocalPath(subdir + name), base64, null);
        content = content.replace(name, WEB_STATIC_FILES_PATH + subdir + name)
    }
    return content;
}
