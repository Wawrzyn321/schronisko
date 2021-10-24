import { Permission, PrismaClient } from '@prisma/client';
import { genSalt, hash } from "bcryptjs";
// @ts-ignore
import adminUsers from './adminUsers.json';

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

export async function seedUsers(prisma: PrismaClient) {
    await prisma.user.upsert({
        where: { login: '_admin' },
        update: {
            isActive: true,
        },
        create: {
            firstName: "adminek",
            lastName: "_admin",
            isActive: true,
            login: '_admin',
            passwordHash: await hashData('_admin'),
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

    const users = adminUsers.find((e: any) => e.type === 'table')!.data!;

    for (const user of users) {
        const isActive = user.status! === '1' && !user.name!.startsWith('[nieaktywn');
        await prisma.user.upsert({
            where: { login: user.login! },
            update: {
                isActive,
            },
            create: {
                firstName: user.name!,
                lastName: user.surname!,
                isActive,
                login: user.login!,
                passwordHash: await hashData(user.login!),
                permissions: {
                    create: createPermissions(user.login!),
                }
            },
        });
        console.log('user', user.login)
    }
}

function createPermissions(login: string): { permission: Permission }[] {
    if (login === 'pwawrzynczyk' || login === 'aszczesniak') {
        return [
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
        ];
    } else {
        return [
            {
                permission: 'ANIMAL',
            }
        ]
    }
}