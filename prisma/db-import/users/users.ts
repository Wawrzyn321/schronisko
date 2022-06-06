import { Permission, PrismaClient } from '@prisma/client';
import { hashData } from '../../common';
// @ts-ignore
import adminUsers from './adminUsers.json';

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
                permission: 'ANIMAL_VIEW_ONLY',
            }
        ]
    }
}