import {
    AnimalCategory,
    AnimalGender,
    AnimalType,
    PrismaClient,
    VirtualCaretakerType,
  } from "@prisma/client";
  import { hashData } from "./common";
  
  const prisma = new PrismaClient();
  
  async function clearDb(prisma: PrismaClient) {
    console.log("clearing DB...");
    await prisma.page.deleteMany();
    await prisma.news.deleteMany();
    await prisma.animalImage.deleteMany();
    await prisma.animal.deleteMany();
    await prisma.userPermissions.deleteMany();
    await prisma.logs.deleteMany();
    await prisma.user.deleteMany();
    await prisma.settings.deleteMany();
    console.log("done!");
  }
  
  const ADMIN_USER: any = async () => ({
    where: { login: "ADMIN_LOGIN" },
    update: {},
    create: {
      firstName: "IMIE",
      lastName: "NAZWISKO",
      isActive: true,
      login: "ADMIN_LOGIN",
      passwordHash: await hashData("HASLO"),
      permissions: {
        create: [
          {
            permission: "USER",
          },
          {
            permission: "NEWS",
          },
          {
            permission: "PAGE",
          },
          {
            permission: "ANIMAL",
          },
        ],
      },
    },
  });
  
  const INACTIVE_NON_ADMIN_USER: any = async () => ({
    where: { login: "INACTIVE_LOGIN" },
    update: {},
    create: {
      firstName: "IMIE_2",
      lastName: "NAZWISKO_2",
      isActive: false,
      login: "INACTIVE_LOGIN",
      passwordHash: await hashData("HASLO_2"),
      permissions: {
        create: [
          {
            permission: "USER",
          },
          {
            permission: "ANIMAL",
          },
        ],
      },
    },
  });
  
  const CHANGE_DATA_USER: any = async () => ({
    where: { login: "CHANGE_LOGIN" },
    update: {},
    create: {
      firstName: "IMIE_3",
      lastName: "NAZWISKO_3",
      isActive: true,
      login: "CHANGE_LOGIN",
      passwordHash: await hashData("CHANGE_PASSWORD"),
      permissions: {},
    },
  });
  
  const NO_PERMISSIONS_USER: any = async () => ({
    where: { login: "NO_PERMISSIONS_LOGIN" },
    update: {},
    create: {
      firstName: "IMIE_4",
      lastName: "NAZWISKO_4",
      isActive: true,
      login: "NO_PERMISSIONS_LOGIN",
      passwordHash: await hashData("NO_PERMISSIONS_PASSWORD"),
      permissions: {},
    },
  });
  
  const TEST_PAGE = {
    where: { id: "TEST_PAGE" },
    update: {},
    create: {
      id: "TEST_PAGE",
      title: "test-page",
      content: `<p>to jest strona testowa</p>`,
    },
  };
  
  const NON_PUBLIC_NEWS = {
    where: { id: "non-public-news" },
    update: {},
    create: {
      id: "non-public-news",
      title: "niepubliczny",
      description: "np-opis",
      content: "np-content",
      isPublished: false,
      imageName: "",
    },
  };
  
  const TEST_ANIMAL = {
    where: { id: "test-animal-id" },
    update: {},
    create: {
      id: "test-animal-id",
      refNo: "",
      name: "test-animal",
      type: AnimalType.DOG,
      description: "test-animal-desc",
      category: AnimalCategory.NiedawnoZnalezione,
      virtualCaretakerType: VirtualCaretakerType.NiePrzypisany,
      contactInfo: "test-animal-contact-info",
      gender: AnimalGender.MALE,
      isPublic: false,
    },
  };
  
  async function seed(prisma: PrismaClient) {
    console.log("seeding DB...");
    await prisma.user.upsert(await ADMIN_USER());
    await prisma.user.upsert(await INACTIVE_NON_ADMIN_USER());
    await prisma.user.upsert(await CHANGE_DATA_USER());
    await prisma.user.upsert(await NO_PERMISSIONS_USER());
    await prisma.page.upsert(TEST_PAGE);
    await prisma.news.upsert(NON_PUBLIC_NEWS);
    await prisma.animal.upsert(TEST_ANIMAL);
    console.log("done!");
  }
  
  async function main() {
    await clearDb(prisma);
    await seed(prisma);
  }
  
  main()
    .catch((e: Error) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });