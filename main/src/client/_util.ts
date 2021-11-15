import { SITE_IMAGES_URL, ANIMAL_IMAGES_URL } from 'api';
import { AnimalType } from '.prisma/client';
import { Animal } from '@prisma/client';
export const buildAnimalUrl = (animal: { type: string, id: string }) => {
    return `/animals/${animal.type.toLocaleLowerCase()}/${animal.id}`;
};

export const buildAnimalImageUrl = (animal: Animal) => {
    if (animal.imageName) {
        return ANIMAL_IMAGES_URL + '/' + animal.imageName;
    } else {
        const type = animal.type === AnimalType.DOG ? 'pies' : 'kot'
        return `${SITE_IMAGES_URL}/placeholders/${type}.png`
    }
};
