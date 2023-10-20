export type AnimalColumnParams = {
    showImage: boolean;
    // showDescription: boolean;
    showGender: boolean;
    showLocation: boolean;
    showCategory: boolean;
    showAddedAt: boolean;
    showModifiedAt: boolean;
    showVirtualCaretaker: boolean;
    showNote: boolean;
    showContactInfo: boolean;
}

export function createDefaultColumnParams(): AnimalColumnParams {
    return {
        showImage: true,
        showCategory: true,
        // showDescription: false,
        showGender: false,
        showLocation: true,
        showModifiedAt: true,
        showAddedAt: false,
        showVirtualCaretaker: false,
        showNote: false,
        showContactInfo: false,
    };
}