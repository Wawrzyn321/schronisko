import { PrismaClient } from '@prisma/client';
import { seedUsers } from './db-import/users';
import { seedNews } from './db-import/news-import';
import { seedPages } from './db-import/pages';

const prisma = new PrismaClient()

async function main() {
    // await seedUsers(prisma);
    await seedNews(prisma);
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
