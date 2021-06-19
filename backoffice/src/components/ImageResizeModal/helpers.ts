export function scaleToFit(
    width: number,
    height: number,
    maxWidth: number,
    maxHeight: number
) {
    if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
    }
    if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
    }
    return [width, height];
}


export function restrictPosition(x: number, y: number, sizeX: number, sizeY: number, imageWidth: number, imageHeight: number): [number, number] {
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > imageWidth - sizeX) x = imageWidth - sizeX;
    if (y > imageHeight - sizeY) y = imageHeight - sizeY;
    return [x, y];
}
