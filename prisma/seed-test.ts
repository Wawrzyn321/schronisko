import {
  AnimalCategory,
  AnimalGender,
  AnimalType,
  PrismaClient,
  VirtualCaretakerType,
} from "@prisma-app/client";
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

const ADMIN_USER: any = {
  where: { login: "ADMIN_LOGIN" },
  update: {},
  create: {
    firstName: "IMIE",
    lastName: "NAZWISKO",
    isActive: true,
    login: "ADMIN_LOGIN",
    passwordHash: hashData("HASLO"),
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
  }
};

const INACTIVE_NON_ADMIN_USER: any = {
  where: { login: "INACTIVE_LOGIN" },
  update: {},
  create: {
    firstName: "IMIE_2",
    lastName: "NAZWISKO_2",
    isActive: false,
    login: "INACTIVE_LOGIN",
    passwordHash: hashData("HASLO_2"),
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
};

const CHANGE_DATA_USER: any = {
  where: { login: "CHANGE_LOGIN" },
  update: {},
  create: {
    firstName: "IMIE_3",
    lastName: "NAZWISKO_3",
    isActive: true,
    login: "CHANGE_LOGIN",
    passwordHash: hashData("CHANGE_PASSWORD"),
    permissions: {},
  },
};

const NO_PERMISSIONS_USER: any = {
  where: { login: "NO_PERMISSIONS_LOGIN" },
  update: {},
  create: {
    firstName: "IMIE_4",
    lastName: "NAZWISKO_4",
    isActive: true,
    login: "NO_PERMISSIONS_LOGIN",
    passwordHash: hashData("NO_PERMISSIONS_PASSWORD"),
    permissions: {},
  },
};

const TEST_PAGE = {
  where: { id: "TEST_PAGE" },
  update: {},
  create: {
    id: "TEST_PAGE",
    title: "test-page",
    content: `<p>to jest strona testowa</p>`,
  },
};

const MAIN_SITE_PAGE = {
  where: { id: "glowna-adopcje" },
  update: {},
  create: {
    id: "glowna-adopcje",
    title: "adopcje",
    content: `<p>informacje o adopcjach</p>`,
  },
};

const DOG_VOLUTEERING_ON_PAGE = {
  where: { id: "wolontariat-pies-on" },
  update: {},
  create: {
    id: "wolontariat-pies-on",
    title: "wolontariat-pies-on",
    content: '',
  },
}

const DOG_VOLUTEERING_OFF_PAGE = {
  where: { id: "wolontariat-pies-off" },
  update: {},
  create: {
    id: "wolontariat-pies-off",
    title: "wolontariat-pies-off",
    content: '',
  },
}

const ARTICLE_EDITING_TEST_PAGE = {
  where: { id: "jak-pomoc" },
  update: {},
  create: {
    id: "jak-pomoc",
    title: "How to",
    content: '',
  },
}

const ADOPTION_DOGS_PAGE = {
  where: { id: "psy-do-adopcji" },
  update: {},
  create: {
    id: "psy-do-adopcji",
    title: "Psy do adopcji",
    content: '',
  },
}

const NEWS_WITH_TEMPLATES = {
  where: { id: 'template-news' },
  update: {},
  create: {
    id: "template-news",
    title: "Template News",
    description: "opis",
    content: "%KRS% %KONTO%",
    isPublished: true,
    imageName: "",
  },
};

const NON_PUBLIC_NEWS = {
  where: { id: "non-public-news" },
  update: {},
  create: {
    id: "non-public-news",
    title: "niepubliczny",
    description: "np-opis",
    content: "non-public-content",
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

const AFTER_ADOPTION_ANIMAL = {
  where: { id: "after-adoption-animal-id" },
  update: {},
  create: {
    id: "after-adoption-animal-id",
    refNo: "ref",
    name: "poadopcyjny",
    type: AnimalType.DOG,
    description: "desc",
    category: AnimalCategory.ZnalazlyDom,
    virtualCaretakerType: VirtualCaretakerType.NiePrzypisany,
    contactInfo: "testcontact-info",
    gender: AnimalGender.MALE,
    isPublic: true,
  },
};

const AFTER_ADOPTION_ANIMAL_2 = {
  where: { id: "after-adoption-animal-id-2" },
  update: {},
  create: {
    id: "after-adoption-animal-id-2",
    refNo: "ref2",
    name: "poadopcyjny 2",
    type: AnimalType.DOG,
    description: "desc",
    category: AnimalCategory.DoAdopcji,
    virtualCaretakerType: VirtualCaretakerType.NiePrzypisany,
    contactInfo: "testcontact-info",
    gender: AnimalGender.MALE,
    isPublic: true,
  },
};

async function seed(prisma: PrismaClient) {
  console.log("seeding DB...");
  await prisma.user.upsert(ADMIN_USER);
  await prisma.user.upsert(INACTIVE_NON_ADMIN_USER);
  await prisma.user.upsert(CHANGE_DATA_USER);
  await prisma.user.upsert(NO_PERMISSIONS_USER);

  await prisma.page.upsert(TEST_PAGE);
  await prisma.page.upsert(MAIN_SITE_PAGE);
  await prisma.page.upsert(DOG_VOLUTEERING_ON_PAGE);
  await prisma.page.upsert(DOG_VOLUTEERING_OFF_PAGE);
  await prisma.page.upsert(ARTICLE_EDITING_TEST_PAGE);
  await prisma.page.upsert(ADOPTION_DOGS_PAGE);

  await prisma.news.upsert(NON_PUBLIC_NEWS);
  await prisma.news.upsert(NEWS_WITH_TEMPLATES);

  await prisma.animal.upsert(TEST_ANIMAL);
  await prisma.animal.upsert(AFTER_ADOPTION_ANIMAL);
  await prisma.animal.upsert(AFTER_ADOPTION_ANIMAL_2);
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