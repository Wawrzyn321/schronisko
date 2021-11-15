import { AnimalType, AnimalCategory, AnimalGender, VirtualCaretakerType, AnimalLocation } from '.prisma/client';
import { PrismaClient } from '@prisma/client';


import fs from 'fs';
// @ts-ignore
import _animals from './adminGallery.json';
// @ts-ignore
import _pictures from './pictures.json';

const galleryPath = '/Users/i515358/Desktop/schronisko_sosnowiec_pl/public_html/gallery/';
const thumbsPath = galleryPath + 'thumbs/';
const targetAnimalsPath = '/Users/i515358/Nauka/schronisko/prisma/db-import/animals/animals/';
const targetAnimalImagesPath = targetAnimalsPath + 'pics/';

function mapCategoryId(categoryId: string) {
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
            // console.log('nieznana kategoria', categoryId)
            return AnimalCategory.DoAdopcji;
    }
}

const sortWithVCaretakerFirst = (animals: any) => {
    const animalsWith = animals.filter((a: any) => a.hasVirtualGuardian);
    const animalsWithout = animals.filter((a: any) => !a.hasVirtualGuardian);
    return [...animalsWith, ...animalsWithout];
}

const setupVCaretaker = (animals: any) => {
    return animals.map((a: any) => {
        if (a.hasVirtualGuardian) {
            a.virtualCaretakerType = VirtualCaretakerType.Znalazl;
            a.virtualCaretakerName = a.hasVirtualGuardian;
            return a;
        } else {
            const r = a.name.match(/moim wirtualnym opiekunem jest (.*)/);
            if (r?.[1]) {
                a.virtualCaretakerType = VirtualCaretakerType.Znalazl;
                a.virtualCaretakerName = r[1];
                return a;

            }
            const szukaCategories = ['7', '8', '9', '39'];
            if (szukaCategories.includes(a.categoryId)) {
                a.virtualCaretakerType = VirtualCaretakerType.Szuka;
                a.virtualCaretakerName = null;
                return a;

            } else {
                a.virtualCaretakerType = VirtualCaretakerType.NiePrzypisany;
                a.virtualCaretakerName = null;
                return a;

            }
        }
    })
}


//5788
const filterWithNoImg = (animals: any) => {

    return animals.filter((a: any) => {
        if (
            fs.existsSync(galleryPath + a.fileName)
            ||
            fs.existsSync(thumbsPath + a.fileName)
        ) {
            // fs.renameSync('./news/' + n.picture, './news-img/' + n.picture)
            return true;
        } else {
            // console.log(a.fileName)
            return false;
        }
    })
}

const setupRefNo = (animals: any) => {
    return animals.map((a: any) => {
        const r = a.name.trim().match(/^(.*?) *(\d+\/ ?\d+)/);
        if (r?.[1] && r?.[2]) {
            a.name = r[1];
            a.petId = r[2];
            return a;
        }

        if (a.petId) {
            return a;
        } else {
            a.petId = 'b/n';
            return a;
        }
    })
}

function tryMapLocation(a: any) {
    const contains = (str: string) => {
        const s_lower = str.toLowerCase();
        return a.descr.toLowerCase().includes(s_lower) || a.name.toLowerCase().includes(s_lower);
    }

    if (contains('domu tymczasow') || contains('dom tymczasow') || contains('w dt')) {
        return AnimalLocation.DomTymczasowy;
    }
    if (contains('Kocia Chatka')) {
        return AnimalLocation.KociaChatka;
    }
    if (contains('U OSOBY PRYWATNEJ')) {
        return AnimalLocation.UOsobyPrywatnej;
    }
    if (contains('hotelu')) {
        return AnimalLocation.Hotel;
    }

    return AnimalLocation.Schronisko;
}

function trySetupGender(a: any) {
    if (a.descr.includes('Płeć: samiec')) {
        return AnimalGender.MALE;
    }
    if (a.descr.includes('Płeć: samica')) {
        return AnimalGender.FEMALE;
    }
    return AnimalGender.NOT_SET;
}

function trySetupContactInfo(a: any) {
    const r = a.descr.match(/Kontakt: (.*)/);
    if (r?.[1]) {
        return r[1];
    }
    return 'brak';
}

async function seedAnimalImages(prisma: PrismaClient, animals: any[], count: number | null = null) {
    let pictures = _pictures.find((e: any) => e.type === 'table')!.data!;
    let it = count ? Math.min(animals.length, count) : animals.length;

    let cnt = 0;
    for (let i = 0; i < it; i++) {
        const pics = pictures.filter(p => p.adminGalleryId === animals[i].id);
        for (let j = 0; j < pics.length; j++) {
            const pic = pics[j];
            let ok = false;
            if (fs.existsSync(galleryPath + pic.fileName)) {
                fs.copyFileSync(galleryPath + pic.fileName, targetAnimalImagesPath + pic.fileName);
                ok = true;
            } else if (fs.existsSync(thumbsPath + pic.fileName)) {
                fs.copyFileSync(thumbsPath + pic.fileName, targetAnimalImagesPath + pic.fileName);
                ok = true;
            }

            if (ok) {
                cnt++;

                const image = {
                    id: pic.id,
                    order: j,
                    animalId: animals[i].id,
                    imageName: pic.fileName,
                    visible: true,
                }

                await prisma.animalImage.upsert({
                    where: { id: pic.id },
                    update: image,
                    create: image,
                });
            }
        }

        if (i % 1000 === 0) {
            console.log(i + '/' + it);
        }
    }
    console.log('seeded', cnt, 'animal pics')
}

export async function seedAnimals(prisma: PrismaClient, count: number | null = null) {

    if (!fs.existsSync(targetAnimalsPath)) {
        fs.mkdirSync(targetAnimalsPath);
    }
    if (!fs.existsSync(targetAnimalImagesPath)) {
        fs.mkdirSync(targetAnimalImagesPath);
    }

    //@ts-ignore
    let animals = _animals.find((e: any) => e.type === 'table')!.data!;
    if (count && animals.length !== count) {
        console.log('-------')
        console.log('')
        console.log('nie pobrano wszystkich zwierząt, ', count, '/', animals.length)
        console.log('')
        console.log('-------')
    }

    animals = setupRefNo(animals)
    animals = setupVCaretaker(animals);

    animals = filterWithNoImg(animals)

    console.log('po filtracji zwierząt bez obrazka: ', animals.length)

    animals = sortWithVCaretakerFirst(animals);

    let it = count ? Math.min(animals.length, count!) : animals.length;
    for (let i = 0; i < it; i++) {
    //     const a = animals[i];

    //     if (fs.existsSync(galleryPath + a.fileName)) {
    //         fs.copyFileSync(galleryPath + a.fileName, targetAnimalsPath + a.fileName)
    //     } else {
    //         fs.copyFileSync(thumbsPath + a.fileName, targetAnimalsPath + a.fileName)
    //     }

    //     const animal = {
    //         id: a.id,
    //         refNo: a.petId,
    //         name: a.name,
    //         type: a.speciesId === '2' ? AnimalType.DOG : AnimalType.CAT,
    //         category: mapCategoryId(a.categoryId),
    //         description: a.descr,
    //         imageName: a.fileName,
    //         addedDate: new Date(Date.parse('2014-07-23 11:07:16')),
    //         isPublic: a.status === '1',
    //         location: tryMapLocation(a),
    //         virtualCaretakerType: a.virtualCaretakerType,
    //         virtualCaretakerName: a.virtualCaretakerName,
    //         note: '',
    //         locationDescription: null,
    //         contactInfo: trySetupContactInfo(a),
    //         gender: trySetupGender(a),
    //     };

    //     await prisma.animal.upsert({
    //         where: { id: animal.id! },
    //         update: animal,
    //         create: animal,
    //     });

        if (i % 1000 === 0) {
            console.log(i + '/' + it);
        }
    }
    console.log('seeded', it, 'animals')

    await seedAnimalImages(prisma, animals, it);
}
