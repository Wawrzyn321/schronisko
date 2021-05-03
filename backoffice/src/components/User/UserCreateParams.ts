import type { Permission } from './../../prisma-types/permissions';

export type UserCreateParams = {
    login: string;
    firstName: string;
    lastName: string;
    password: string;
    permissions: Permissions[];
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