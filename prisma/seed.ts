import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./db-import/users/seedUsers";
import { seedNews } from "./db-import/news/seedNews";
import { seedPages } from "./db-import/seedPages";
import { seedAnimals } from "./db-import/animals/seedAnimals";
import { seedAnimals as seedAnimalsVps } from "./db-import/animals/seedAnimalsVPS";

const prisma = new PrismaClient();

async function main() {
  await seedPages(prisma);
  await seedNews(prisma);
  await seedUsers(prisma);
  switch (process.env.NODE_ENV) {
    case "dev":
      await seedAnimals(prisma);
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
