import { AnimalImage } from '@prisma-app/client';

export const mockImage: AnimalImage = {
  id: 'mock-animal-image-id',
  order: 0,
  animalId: 'some-id',
  imageName: 'animal-image-name',
  visible: true,
};

export const ANIMAL_ID = 'id-1';

export const mockAnimalImages: AnimalImage[] = [
  {
    id: '1',
    order: 1,
    animalId: ANIMAL_ID,
    imageName: 'img-name',
    visible: true,
  },
  {
    id: '3',
    order: 3,
    animalId: ANIMAL_ID,
    imageName: 'img-name',
    visible: true,
  },
];
