import { STATIC_FILES_PATH } from './app.module';
import { promises as fsp } from "fs"
const sharp: any = require('sharp');

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
        width: 152,
        height: 112,
    }
}

function createPath(name: string) {
    console.log(`${STATIC_FILES_PATH}/${name}`)
    return `${STATIC_FILES_PATH}/${name}`;
}

export async function saveImage(name: string, base64Data: string, resizingPreset: ResizingPresets) {
    base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
    const buf = Buffer.from(base64Data, 'base64');
    const preset = presetsMap[resizingPreset];
    const resized = await sharp(buf).resize(preset.width, preset.height).toBuffer();
    return await fsp.writeFile(createPath(name), resized);
}

export async function deleteImage(name: string) {
    return await fsp.unlink(createPath(name));
}
