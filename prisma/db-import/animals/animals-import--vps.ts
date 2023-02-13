import { PrismaClient } from "@prisma/client";

import animals from "./animals-for-vps.json";
import animalPictures from "./animal-images-for-vps.json";

async function seedAnimalImages(prisma: PrismaClient) {
  console.log("adding animals from animalPictures-for-vps.json");
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
