import { PrismaClient } from '@prisma/client';
import { seedUsers } from './db-import/users/users';
import { seedNews } from './db-import/news/news-import';
import { seedPages } from './db-import/pages';
import { seedAnimals } from './db-import/animals/animals-import';

const prisma = new PrismaClient()

async function main() {
    // await seedUsers(prisma);
    // await seedNews(prisma);
    // await seedAnimals(prisma, null);
    // await seedPages(prisma);
}
main()
    .catch((e: Error) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
