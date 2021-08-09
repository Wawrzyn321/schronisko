import { Permission } from '@prisma/client';

export const allPermissions: Permission[] = [
    Permission.USER,
    Permission.PAGE,
    Permission.NEWS,
    Permission.ANIMAL,
];
