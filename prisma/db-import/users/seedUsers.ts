import { Permission, PrismaClient, User } from '@prisma-app/client';
import { hashData } from '../../common';
import adminUsersTable from './adminUsers.json';
import { z } from "zod";
import { findDataInTable } from '../findDataInTable';

const userSchema = z.object({
    id: z.string(),
    login: z.string(),
    password: z.string(),
    name: z.string(),
    surname: z.string(),
    status: z.string(),
    deleted: z.string(),
})

type ImportedUser = Required<z.infer<typeof userSchema>>;

type PermissionCollection = { permission: Permission }[];

export async function seedUsers(prisma: PrismaClient) {
    const pepper = process.env.PEPPER ?? '';
    if (!pepper.length) {
        console.log("No pepper provided. Exiting.")
        process.exit(1);
    }

    await createAdmin(prisma);

    const importedUsers = findDataInTable<ImportedUser>(adminUsersTable);

    for (const importedUser of importedUsers) {
        userSchema.parse(importedUser);

        const isActive = importedUser.status === '1' && !importedUser.name.startsWith('[nieaktywn');

        const user: Omit<User, 'id'> & { permissions: { create: PermissionCollection } } = {
            firstName: importedUser.name,
            lastName: importedUser.surname,
            isActive,
            login: importedUser.login,
            passwordHash: hashData(importedUser.login),
            permissions: {
                create: createPermissions(importedUser.login),
            }
        }

        await prisma.user.upsert({
            where: { login: importedUser.login },
            update: {
                isActive,
            },
            create: user
        });
    }
    console.log('seeded users', importedUsers.length, importedUsers.map(u => u.login))
}

async function createAdmin(prisma: PrismaClient) {
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
            passwordHash: hashData('_admin'),
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
}

function createPermissions(login: string): PermissionCollection {
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