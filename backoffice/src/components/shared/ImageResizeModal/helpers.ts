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
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    return [x, y];
}

export function fit(sizeX: number, sizeY: number, proportionX: number, proportionY: number) {
    const targetRatio = proportionX / proportionY;
    const ratio = sizeX / sizeY;

    const ratio2 = targetRatio / ratio;

    if (ratio2 < 1) {
        return [sizeX * ratio2, sizeY];
    } else {
        return [sizeX, sizeY / ratio2];
    }
}
