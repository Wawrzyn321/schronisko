import { PrismaClient, Animal, AnimalImage } from "@prisma/client";

import animals from "./animals-for-vps.json";
import animalImages from "./animal-images-for-vps.json";

async function seedAnimalImages(prisma: PrismaClient) {
  console.log("adding animals from animalPictures-for-vps.json");

  const typedAnimalImages: AnimalImage[] = animalImages;
  for (const animalImage of typedAnimalImages) {
    await prisma.animalImage.upsert({
      where: { id: animalImage.id! },
      update: animalImage,
      create: animalImage,
    });
  }

  console.log("seeded", typedAnimalImages.length);
}

export async function seedAnimals(prisma: PrismaClient) {
  console.log("adding animals from animals-for-vps.json");

  // TODO nie wiem czemu cast nie działa jak trzeba
  const typedAnimals: Animal[] = animals as unknown as Animal[];
  for (const animal of typedAnimals) {
    
    await prisma.animal.upsert({
      where: { id: animal.id! },
      update: animal,
      create: animal,
    });
  }

  console.log("seeded", typedAnimals.length);

  await seedAnimalImages(prisma);
}
