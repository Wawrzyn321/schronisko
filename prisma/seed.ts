import { PrismaClient } from '@prisma/client';
import { seedUsers } from './db-import/users';
import { seedNews } from './db-import/news-import';

const prisma = new PrismaClient()

async function main() {
    await seedUsers(prisma);
    // await seedNews(prisma);

    // return;

    const pages = [
        { title: 'O nas', id: 'o-nas' },
        { title: 'Najczęściej zadawane pytania', id: 'faq' },
        { title: 'Główna: adopcje', id: 'glowna-adopcje' },
        { title: 'Psy', id: 'psy-do-adopcji' },
        { title: 'Koty', id: 'koty-do-adopcji' },
        { title: 'Zwierzęta znalezione', id: 'zwierzeta-znalezione' },
        { title: 'Znalazły dom', id: 'odnalazly-dom' },
        { title: 'Odeszły', id: 'odeszly' },
        { title: 'Odeszły (wiersz)', id: 'odeszly-wiersz' },
        { title: 'Adopcja wirtualna', id: 'jak-adoptowac-wirtualnie' },
        { title: 'Szukają opiekunów', id: 'szukaja-opiekunow' },
        { title: 'Znalazły opiekunów', id: 'znalazly-opiekunow' },
        { title: 'Psi wolontariat', id: 'wolontariat-pies' },
        { title: 'Koci wolontariat', id: 'wolontariat-kot' },
        { title: 'Jak pomóc', id: 'jak-pomoc' },
        { title: 'Kontakt', id: 'kontakt' },
    ];
    console.info(pages);
    for (const { title, id } of pages) {
        await prisma.page.upsert({
            where: { id },
            update: {},
            create: { title, id, content: '' }
        });
    }
}
main()
    .catch((e: Error) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
