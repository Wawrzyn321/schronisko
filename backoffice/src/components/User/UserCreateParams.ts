import type { Permission } from '@prisma-app/client';

export type UserCreateParams = {
    login: string;
    firstName: string;
    lastName: string;
    password: string;
    permissions: Permission[];
};

export function createDefaultUser(): UserCreateParams {
    return {
        login: '',
        firstName: '',
        lastName: '',
        password: '',
        permissions: ['ANIMAL'],
    };
}