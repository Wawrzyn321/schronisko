import type { Permission } from '@prisma/client';
import { allPermissions } from './permissions';

export interface UserPermissionsWrapper {
  permission: Permission;
}

export interface UserDto {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  password: string;
  isActive: boolean;
  permissions: Permission[];
}

export interface UserCreateDto {
  login: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  isActive: true;
  permissions: {
    create: UserPermissionsWrapper[];
  }
}

export interface UserUpdateDto {
  login: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  permissions: {
    create: UserPermissionsWrapper[];
  }
}

export async function toUser(dto: UserDto, dataHasher: (str: string) => Promise<string>): Promise<UserCreateDto> {
  return {
    login: dto.login,
    firstName: dto.firstName,
    lastName: dto.lastName,
    passwordHash: await dataHasher(dto.password),
    isActive: true,
    permissions: {
      create: dto.permissions.map(permission => ({ permission })),
    },
  };
};

export function toUserUpdate(dto: UserDto): UserUpdateDto {
  return {
    login: dto.login,
    firstName: dto.firstName,
    lastName: dto.lastName,
    isActive: dto.isActive,
    permissions: {
      create: dto.permissions.map(p => ({ permission: p })),
    },
  };
};

export function validateCreate(dto: UserDto): boolean {
  if (!(!!dto.login && !!dto.firstName && !!dto.lastName && !!dto.password)) {
    return false;
  }
  return dto.permissions.every(permission => allPermissions.includes(permission));
};

export function validateUpdate(id: number, dto: UserDto): boolean {
  if (!(!!dto.login && !!dto.firstName && !!dto.lastName && dto.id === id)) {
    return false;
  }
  return dto.permissions.every(permission => allPermissions.includes(permission));
};
