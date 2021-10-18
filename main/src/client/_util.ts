export const buildAnimalUrl = (animal: { type: string, id: string }) => {
    return `/animals/${animal.type.toLocaleLowerCase()}/${animal.id}`;
};
