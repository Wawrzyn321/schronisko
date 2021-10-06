import { v4 as uuid } from 'uuid';

export type FileMap = [File, string][];
export type ImageData = { name: string, base64: string };
export type ReplaceContentResult = [string, ImageData[]];

const getNameAndExtension = (name: string) => {
    const i = name.lastIndexOf(".");
    const nameOnly = i === -1 ? name : name.substr(0, i);
    const extension = name.slice((i - 1 >>> 0) + 2);
    return [nameOnly, extension]
}

const generateFileName = (fileName: string) => {
    const [name, extension] = getNameAndExtension(fileName);
    const id = uuid();
    return `${name}-${id}.${extension}`;
}

export function replaceContent(content: string, fileMap: FileMap): ReplaceContentResult {
    const map = [];
    fileMap.forEach(([file, base64]) => {
        const name = generateFileName(file.name);
        if (content.includes(base64)) {
            content = content.replace(base64, name);
            map.push({ name, base64 })
        }
    });

    return [content, map];
}
