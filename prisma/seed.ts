import { PrismaClient } from '@prisma/client'
import { genSalt, hash, compare } from "bcryptjs";

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
        where: { email: 'admin@gmail.com' },
        update: {
            isActive: true,
        },
        create: {
            firstName: "adminek",
            lastName: "admin",
            isActive: true,
            email: 'admin@gmail.com',
            passwordHash: await hashData('admin'),
            priviledges: {
                create: [
                    {
                        priviledge: 'USER',
                    },
                    {
                        priviledge: 'POST',
                    },
                    {
                        priviledge: 'CONST_POST',
                    },
                    {
                        priviledge: 'ANIMAL',
                    },
                ],
            }
        },
    });
    console.info(admin);
}
main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
