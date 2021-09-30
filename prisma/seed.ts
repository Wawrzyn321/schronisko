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
        // {title: 'Główna', id: 'glowna'},
        { title: 'O nas', id: 'o-nas' },
    ];
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
