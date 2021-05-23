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
