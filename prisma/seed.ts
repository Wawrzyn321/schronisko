import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from "bcryptjs";

const _generateSalt = (rounds = 10): Promise<string> => {
    return new Promise((resolve, reject) => {
        return genSalt(rounds, (error: Error, salt: string) => {
            if (error) reject(error);
            resolve(salt);
        });
    });
}

const hashData = (data: string, rounds = 10): Promise<string> => {
    return new Promise((resolve, reject) => {
        _generateSalt(rounds).then(salt => {
            return hash(data, salt, (error: Error, hash: string) => {
                if (error) reject(error);
                resolve(hash);
            });
        });
    });
}

const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.upsert({
        where: { login: 'admin' },
        update: {
            isActive: true,
        },
        create: {
            firstName: "adminek",
            lastName: "admin",
            isActive: true,
            login: 'admin',
            passwordHash: await hashData('admin'),
            permissions: {
                create: [
                    {
                        permission: 'USER',
                    },
                    {
                        permission: 'NEWS',
                    },
                    {
                        permission: 'PAGE',
                    },
                    {
                        permission: 'ANIMAL',
                    },
                ],
            }
        },
    });
    console.info(admin);
    const pages = [
        { title: 'O nas', id: 'o-nas' },
        { title: 'Psy do adopcji', id: 'psy-do-adopcji' },
        { title: 'Koty do adopcji', id: 'koty-do-adopcji' },
        { title: 'Zwierzęta znalezione', id: 'zwierzeta-znalezione' },
        { title: 'Odnalazły dom', id: 'odnalazly-dom' },
        { title: 'Odeszly', id: 'odeszly' },
        { title: 'Jak adoptować wirtualnie', id: 'jak-adoptowac-wirtualnie' },
        { title: 'Szukają opiekunów', id: 'szukaja-opiekunow' },
        { title: 'Znalazły opiekunów', id: 'znalazly-opiekunow' },
        { title: 'Wolontariat (pies)', id: 'wolontariat-pies' },
        { title: 'Wolontariat (kot)', id: 'wolontariat-kot' },
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
