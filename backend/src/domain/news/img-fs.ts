import { STATIC_FILES_PATH } from './../../app.module';
import { promises as fsp } from "fs"

function createPath(name: string) {
    return `${STATIC_FILES_PATH}/${name}`;
}

export async function saveImage(name: string, base64Data: string) {
    base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
    const buf = Buffer.from(base64Data, 'base64');
    return await fsp.writeFile(createPath(name), buf);
}

export async function deleteImage(name: string) {
    return await fsp.unlink(createPath(name));
}
