import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./db-import/users/users";
import { seedNews } from "./db-import/news/news-import";
import { seedPages } from "./db-import/pages";
import { seedAnimals } from "./db-import/animals/animals-import";
import { seedAnimals as seedAnimalsVps } from "./db-import/animals/animals-import--vps";

const prisma = new PrismaClient();

async function main() {
  await seedPages(prisma);
  await seedNews(prisma);
  await seedUsers(prisma);
  switch (process.env.NODE_ENV) {
    case "dev":
      await seedAnimals(prisma, null);
      break;
    case "vps":
      await seedAnimalsVps(prisma);
      break;
    default:
      throw Error(
        "seed animals: unrecognized NODE_ENV, expected 'dev' or 'vps'"
      );
  }
}
main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
