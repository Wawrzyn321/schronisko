import { PrismaClient, Animal, AnimalImage } from "@prisma-app/client";
import fs from "fs";

async function seedAnimalImages(prisma: PrismaClient) {
  console.log("adding animals from animalPictures-for-vps.json");

  const typedAnimalImages: AnimalImage[] = JSON.parse(fs.readFileSync('db-import/animals/animal-images-for-vps.json').toString());
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

  const typedAnimals: Animal[] =  JSON.parse(fs.readFileSync('db-import/animals/animals-for-vps.json').toString());
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
