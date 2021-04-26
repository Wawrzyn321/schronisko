import type { Priviledge } from './../../prisma-types/priviledges';

export type UserCreateParams = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    priviledges: Priviledge[];
};

export function createDefaultUser(): UserCreateParams {
    return {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        priviledges: ['ANIMAL'],
    };
}