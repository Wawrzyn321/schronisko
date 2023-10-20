import { AnimalType } from '.prisma/client';

const DEV = process.env.NODE_ENV !== 'production';

export const BACKEND_URL = DEV
  ? 'http://localhost:60045'
  : 'http://schronisko-backend2.oto-jest-wawrzyn.pl';
export const SSR_BACKEND_URL = DEV
  ? 'http://localhost:60045'
  : 'http://schronisko-backend2.oto-jest-wawrzyn.pl';

export const IMAGES_URL = BACKEND_URL + '/img';
export const ANIMAL_IMAGES_URL = IMAGES_URL + '/animals';
export const ANIMAL_IMAGES_IMAGES_URL = ANIMAL_IMAGES_URL + '/pics';

export function isSSR(): boolean {
  return typeof window === 'undefined';
}

export function getBackendUrl() {
  return isSSR() ? SSR_BACKEND_URL : BACKEND_URL;
}

export const buildAnimalUrl = (animalId: string) => {
  return `/animals/details/${animalId}`;
};

export const buildAnimalImageUrl = (animal: {
  type: AnimalType;
  imageName: string;
}) => {
  if (animal.imageName) {
    return ANIMAL_IMAGES_URL + '/' + animal.imageName;
  } else {
    const type = animal.type === AnimalType.DOG ? 'pies' : 'kot';
    return `/site/placeholders/${type}.png`;
  }
};