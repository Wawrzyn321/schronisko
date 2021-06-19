export type AnimalColumnParams = {
    showDescription: boolean;
    showGender: boolean;
    showLocation: boolean;
    showCategory: boolean;
    showTimestamp: boolean;
}

export function createDefaultColumnParams(): AnimalColumnParams {
    return {
        showCategory: true,
        showDescription: false,
        showGender: false,
        showLocation: true,
        showTimestamp: false,
    };
}