import { Permission } from '@prisma/client';

export interface LoggedInUser {
    id: number;
    login: string;
    permissions: Permission[];
}

export interface JWTValidationPayload {
    sub: number;
    login: string;
    permissions: Permission[];
}
