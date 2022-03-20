import { allPermissions } from './auth/constants';
import type { Permission } from '@prisma/client';

export type UserPermissionsWrapper = {
  permission: Permission;
};

export type UserDto = {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  password: string;
  isActive: boolean;
  permissions: Permission[];
};

export type UserCreateDto = {
  login: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  isActive: true;
  permissions: {
    create: UserPermissionsWrapper[];
  };
};

export type UserUpdateDto = {
  login: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  permissions: {
    create: UserPermissionsWrapper[];
  };
};

export async function toUser(
  dto: UserDto,
  dataHasher: (str: string) => Promise<string>,
): Promise<UserCreateDto> {
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

export function toUserUpdate(dto: UserDto): UserUpdateDto {
  return {
    login: dto.login,
    firstName: dto.firstName,
    lastName: dto.lastName,
    isActive: dto.isActive,
    permissions: {
      create: dto.permissions.map((p) => ({ permission: p })),
    },
  };
}

export function validateCreate(dto: UserDto): boolean {
  if (!(!!dto.login && !!dto.firstName && !!dto.lastName && !!dto.password)) {
    return false;
  }
  return dto.permissions.every((permission) =>
    allPermissions.includes(permission),
  );
}

export function validateUpdate(id: number, dto: UserDto): boolean {
  if (!(!!dto.login && !!dto.firstName && !!dto.lastName && dto.id === id)) {
    return false;
  }
  return dto.permissions.every((permission) =>
    allPermissions.includes(permission),
  );
}
