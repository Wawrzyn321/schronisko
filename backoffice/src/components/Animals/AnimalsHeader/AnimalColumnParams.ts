export type AnimalColumnParams = {
    showImage: boolean;
    showDescription: boolean;
    showGender: boolean;
    showLocation: boolean;
    showCategory: boolean;
    showTimestamp: boolean;
    showVirtualCaretaker: boolean;
}

export function createDefaultColumnParams(): AnimalColumnParams {
    return {
        showImage: true,
        showCategory: true,
        showDescription: false,
        showGender: false,
        showLocation: true,
        showTimestamp: false,
        showVirtualCaretaker: false,
    };
}