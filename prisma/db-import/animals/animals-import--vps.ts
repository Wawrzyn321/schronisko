import { PrismaClient } from "@prisma/client";

import { readFileSync } from "fs";

async function seedAnimalImages(prisma: PrismaClient) {
  const animalPictures = JSON.parse(readFileSync('./animal-images-for-vps.json', 'utf8'));
  for (const animalPicture of animalPictures as Array<any>) {
    await prisma.animalImage.upsert({
      where: { id: animalPicture.id! },
      update: animalPicture,
      create: animalPicture,
    });
  }

  console.log("seeded", (animalPictures as Array<any>).length);
}

export async function seedAnimals(prisma: PrismaClient) {
  console.log("adding animals from animals-for-vps.json");
  const animals = JSON.parse(readFileSync('./animals-for-vps.json', 'utf8'));
  for (const animal of animals as Array<any>) {
    await prisma.animal.upsert({
      where: { id: animal.id! },
      update: animal,
      create: animal,
    });
  }

  console.log("seeded", (animals as Array<any>).length);

  await seedAnimalImages(prisma);
}
