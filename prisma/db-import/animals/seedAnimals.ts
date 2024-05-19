import {
  AnimalType,
  AnimalCategory,
  AnimalGender,
  AnimalImage,
  VirtualCaretakerType,
  AnimalLocation,
  PrismaClient, Animal
} from "@prisma-app/client";

import fs from "fs";
import animalsTable from "./adminGallery.json";
import picturesTable from "./pictures.json";
import { decode } from "html-entities";
import path from "path";
import { z } from "zod";
import { findDataInTable } from "../findDataInTable";

const galleryPath =
  "/Users/pw/dev/schronisko/schronisko_sosnowiec_pl/public_html/gallery/";
const thumbsPath = path.join(galleryPath, "thumbs/");
const targetAnimalsPath =
  "/Users/pw/dev/schronisko-out/animals";
const targetAnimalImagesPath = path.join(targetAnimalsPath, "pics/");

const animalSchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  petId: z.string().nullable(),
  name: z.string(),
  descr: z.string(),
  fileName: z.string(),
  speciesId: z.string(),
  status: z.string(),
  active: z.string(),
  hasVirtualGuardian: z.string().nullable(),
  mod_time: z.string().nullable(),
})

const animalImageSchema = z.object({
  id: z.string(),
  adminGalleryId: z.string(),
  fileName: z.string(),
})

type ImportedAnimal = z.infer<typeof animalSchema>;

type ImportedAnimalImage = z.infer<typeof animalImageSchema>;

type CaretakerMetadata = {
  virtualCaretakerType: VirtualCaretakerType;
  virtualCaretakerName: string | null;
}

function mapCategoryId(categoryId: string): AnimalCategory {
  switch (categoryId) {
    case "7":
      return AnimalCategory.PilniePotrzebuja;
    case "8":
      return AnimalCategory.Weterani;
    case "9":
    case "39": //Program Lira
      return AnimalCategory.DoAdopcji;
    case "10":
      return AnimalCategory.ZnalazlyDom;
    case "45":
      return AnimalCategory.ZaTeczowymMostem;
    case "50":
      return AnimalCategory.NiedawnoZnalezione;
    default:
      return AnimalCategory.DoAdopcji;
  }
}

function sortWithVCaretakerFirst(animals: ImportedAnimal[]) {
  const animalsWith = animals.filter(a => a.hasVirtualGuardian);
  const animalsWithout = animals.filter(a => !a.hasVirtualGuardian);
  return [...animalsWith, ...animalsWithout];
}

function inferCaretakerMetadata(animal: ImportedAnimal): CaretakerMetadata {
  const szukaCategories = ["7", "8", "9", "39"];

  if (animal.hasVirtualGuardian) {
    return {
      virtualCaretakerType: VirtualCaretakerType.Znalazl,
      virtualCaretakerName: animal.hasVirtualGuardian
    }
  } else {
    const possibleVCInName = animal.name.match(/moim wirtualnym opiekunem jest (.*)/);
    if (possibleVCInName?.[1]) {
      return {
        virtualCaretakerType: VirtualCaretakerType.Znalazl,
        virtualCaretakerName: possibleVCInName[1],
      }
    }
    else if (szukaCategories.includes(animal.categoryId)) {
      return {
        virtualCaretakerType: VirtualCaretakerType.Szuka,
        virtualCaretakerName: null
      }
    } else {
      return {
        virtualCaretakerType: VirtualCaretakerType.NiePrzypisany,
        virtualCaretakerName: null
      }
    }
  }
}

function filterWithNoImg(animals: ImportedAnimal[]) {
  const existsAt = (dirPath: string, name: string) => fs.existsSync(path.join(dirPath, name));

  return animals.filter(a => {
    if (!a.fileName) {
      return false;
    }
    return existsAt(galleryPath, a.fileName) ||
      existsAt(thumbsPath, a.fileName);
  }
  );
}

function setupRefNo(animals: ImportedAnimal[]) {
  return animals.map(a => {
    const r = a.name.trim().match(/^(.*?) *(\d+\/ ?\d+)/);
    if (r?.[1] && r?.[2]) {
      a.name = r[1];
      a.petId = r[2];
      return a;
    }

    if (a.petId) {
      return a;
    } else {
      a.petId = "b/n";
      return a;
    }
  });
}

function tryMapLocation(a: ImportedAnimal): AnimalLocation {
  const containsInNameOrDescrCaseIgnored = (str: string) => {
    const s_lower = str.toLowerCase();
    return (
      a.descr.toLowerCase().includes(s_lower) ||
      a.name.toLowerCase().includes(s_lower)
    );
  };

  if (
    containsInNameOrDescrCaseIgnored("domu tymczasow") ||
    containsInNameOrDescrCaseIgnored("dom tymczasow") ||
    containsInNameOrDescrCaseIgnored("w dt")
  ) {
    return AnimalLocation.DomTymczasowy;
  }
  if (containsInNameOrDescrCaseIgnored("Kocia Chatka")) {
    return AnimalLocation.KociaChatka;
  }
  if (containsInNameOrDescrCaseIgnored("U OSOBY PRYWATNEJ")) {
    return AnimalLocation.UOsobyPrywatnej;
  }
  if (containsInNameOrDescrCaseIgnored("hotelu")) {
    return AnimalLocation.Hotel;
  }

  return AnimalLocation.Schronisko;
}

function trySetupGender(a: ImportedAnimal) {
  if (a.descr.includes("Płeć: samiec")) {
    return AnimalGender.MALE;
  }
  if (a.descr.includes("Płeć: samica")) {
    return AnimalGender.FEMALE;
  }
  return AnimalGender.NOT_SET;
}

function trySetupContactInfo(a: ImportedAnimal) {
  const contactMatch = a.descr.match(/Kontakt: (.*)/);
  return contactMatch?.[1] ? contactMatch[1] : 'brak';
}

async function seedAnimalImages(
  prisma: PrismaClient,
  animals: Animal[],
) {
  const animalImagesForExport = [];
  const pictures = findDataInTable<ImportedAnimalImage>(picturesTable);

  for (let i = 0; i < animals.length; i++) {
    const animal = animals[i];

    const skippedCategories: AnimalCategory[] = [AnimalCategory.ZaTeczowymMostem, AnimalCategory.ZnalazlyDom];
    if (skippedCategories.includes(animal.category)) {
      continue;
    }
    const picsForAnimal = pictures.filter(
      p => p.adminGalleryId === animals[i].id
    );
    for (let j = 0; j < picsForAnimal.length; j++) {
      const pic = picsForAnimal[j];

      animalImageSchema.parse(pic);

      if (copyAnimalImageIfExists(pic)) {
        const image: AnimalImage = {
          id: pic.id,
          order: j,
          animalId: animals[i].id,
          imageName: pic.fileName,
          visible: true,
        };

        await prisma.animalImage.upsert({
          where: { id: pic.id },
          update: image,
          create: image,
        });

        animalImagesForExport.push(image);
      }
    }

    if (i % 1000 === 0) {
      console.log(i + "/" + animals.length);
    }
  }
  fs.writeFileSync(
    "./db-import/animals/animal-images-for-vps.json",
    JSON.stringify(animalImagesForExport)
  );

  console.log("seeded", animalImagesForExport.length, "animal pics");
  console.log('created animal-images-for-vps.json');
}

function ensurePaths() {
  if (!fs.existsSync(galleryPath) || !fs.existsSync(thumbsPath)) {
    throw Error("No source dir for animal images")
  }
  if (!fs.existsSync(targetAnimalImagesPath)) {
    fs.mkdirSync(targetAnimalImagesPath, { recursive: true });
  }
}

export async function seedAnimals(
  prisma: PrismaClient,
  updateFiles: boolean
) {
  if (updateFiles) {
    ensurePaths();
  }

  let animals = findDataInTable<ImportedAnimal>(animalsTable);

  animals = setupRefNo(animals);
  animals = filterWithNoImg(animals);
  animals = sortWithVCaretakerFirst(animals);

  console.log("po filtracji zwierząt bez obrazka: ", animals.length);

  const dbAnimals: Animal[] = [];
  for (let i = 0; i < animals.length; i++) {
    const importedAnimal = animals[i];

    animalSchema.parse(importedAnimal);

    if (updateFiles) {
      copyMainAnimalImage(importedAnimal);
    }

    const animal: Animal = {
      addedAt: new Date(),
      id: importedAnimal.id,
      refNo: importedAnimal.petId ?? '',
      name: importedAnimal.name,
      type: importedAnimal.speciesId === "2" ? AnimalType.DOG : AnimalType.CAT,
      category: mapCategoryId(importedAnimal.categoryId),
      description: decode(importedAnimal.descr),
      imageName: importedAnimal.fileName,
      modifiedAt: importedAnimal.mod_time ? new Date(Date.parse(importedAnimal.mod_time)) : new Date(),
      isPublic: importedAnimal.status === "1",
      location: tryMapLocation(importedAnimal),
      note: "",
      locationDescription: null,
      contactInfo: trySetupContactInfo(importedAnimal),
      gender: trySetupGender(importedAnimal),
      ...inferCaretakerMetadata(importedAnimal),
    };
    dbAnimals.push(animal);

    await prisma.animal.upsert({
      where: { id: animal.id! },
      update: animal,
      create: animal,
    });

    if (i % 1000 === 0) {
      console.log(i + "/" + animals.length);
    }
  }
  console.log("seeded", animals.length, "animals");

  fs.writeFileSync("./db-import/animals/animals-for-vps.json", JSON.stringify(dbAnimals));

  await seedAnimalImages(prisma, dbAnimals);
  console.log('created', 'animals-for-vps.json')
}

function copyMainAnimalImage(animal: ImportedAnimal) {
  const possibleGalleryPath = path.join(galleryPath, animal.fileName);
  const possibleThumbsPath = path.join(thumbsPath, animal.fileName);
  const targetPath = path.join(targetAnimalsPath, animal.fileName);

  if (fs.existsSync(possibleGalleryPath)) {
    fs.copyFileSync(possibleGalleryPath, targetPath);
  } else {
    fs.copyFileSync(possibleThumbsPath, targetPath);
  }
}

function copyAnimalImageIfExists(animalImage: ImportedAnimalImage) {
  const possibleGalleryPath = path.join(galleryPath, animalImage.fileName);
  const possibleThumbsPath = path.join(thumbsPath, animalImage.fileName);
  const targetPath = path.join(targetAnimalImagesPath, animalImage.fileName);

  if (fs.existsSync(possibleGalleryPath)) {
    fs.copyFileSync(
      possibleGalleryPath,
      targetPath
    );
    return true;
  } else if (fs.existsSync(possibleThumbsPath)) {
    fs.copyFileSync(
      possibleThumbsPath,
      targetPath
    );
    return true;
  }
  return false;
}
