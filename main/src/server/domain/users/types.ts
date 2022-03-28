import { allPermissions } from '../auth/constants';
import type { Permission } from '@prisma/client';

// DATA FROM FRONTEND

export type FrontendUserCreateDto = {
  login: string;
  firstName: string;
  lastName: string;
  password: string;
  permissions: Permission[];
};

export type FrontendSelfUpdateDto = {
  login: string;
  firstName: string;
  lastName: string;
};

export type FrontendUpdateOtherUserDto = {
  permissions: Permission[];
  isActive: boolean;
};

// DATA TO FRONTEND

export type UserDto = {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  password: string;
  isActive: boolean;
  permissions: Permission[];
};

// DATA TO PRISMA

export type UserCreateDataForPrisma = {
  login: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  isActive: true;
  permissions: {
    create: { permission: Permission }[];
  };
};

export async function toPrismaUserCreate(
  dto: FrontendUserCreateDto,
  dataHasher: (str: string) => Promise<string>,
): Promise<UserCreateDataForPrisma> {
  return {
    login: dto.login,
    firstName: dto.firstName,
    lastName: dto.lastName,
    passwordHash: await dataHasher(dto.password),
    isActive: true,
    permissions: {
      create: dto.permissions.map((permission) => ({ permission })),
    },
  };
}

// VALIDATION

function validatePermissions(permissions: Permission[]): boolean {
  return permissions.every((permission) => allPermissions.includes(permission));
}

export function validateCreate(dto: FrontendUserCreateDto): boolean {
  if (!Boolean(dto.login && dto.firstName && dto.lastName && dto.password)) {
    return false;
  }
  return validatePermissions(dto.permissions);
}

export function validateSelfUpdate(dto: FrontendSelfUpdateDto): boolean {
  return Boolean(dto.login && dto.firstName && dto.lastName);
}

export function validateOtherUserUpdate(
  dto: FrontendUpdateOtherUserDto,
): boolean {
  return validatePermissions(dto.permissions);
}
