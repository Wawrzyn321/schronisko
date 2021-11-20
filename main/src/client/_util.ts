import { SITE_IMAGES_URL, ANIMAL_IMAGES_URL } from 'api';
import { AnimalType } from '.prisma/client';

export const buildAnimalUrl = (animalId: string) => {
    return `/animals/details/${animalId}`;
};

export const buildAnimalImageUrl = (animal: { type: AnimalType, imageName: string }) => {
    if (animal.imageName) {
        return ANIMAL_IMAGES_URL + '/' + animal.imageName;
    } else {
        const type = animal.type === AnimalType.DOG ? 'pies' : 'kot'
        return `${SITE_IMAGES_URL}/placeholders/${type}.png`
    }
};
