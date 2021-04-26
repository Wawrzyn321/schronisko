import { User, UserPriviledges } from '@prisma/client';
import * as EmailValidator from 'email-validator';
import { priviledges } from './priviledges';

export interface UserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isActive: boolean;
  priviledges: any[];
}

export async function toUser(dto: UserDto, dataHasher: (str: string) => Promise<string>): Promise<any> {
  return {
    email: dto.email,
    firstName: dto.firstName,
    lastName: dto.lastName,
    passwordHash: await dataHasher(dto.password),
    isActive: true,
    priviledges: {
      create: dto.priviledges.map(priviledge => ({ priviledge })),
    },
  };
};

export function toUserUpdate(dto: UserDto) {
  return {
    email: dto.email,
    firstName: dto.firstName,
    lastName: dto.lastName,
    isActive: dto.isActive,
    priviledges: {
      create: dto.priviledges.map(p => ({ priviledge: p })),
    },
  };
};

export function validateCreate(dto: UserDto): boolean {
  if (!(EmailValidator.validate(dto.email) && !!dto.firstName && !!dto.lastName && !!dto.password)) {
    return false;
  }
  return dto.priviledges.every(priviledge => priviledges.includes(priviledge));
};

export function validateUpdate(id: number, dto: UserDto): boolean {
  if (!(EmailValidator.validate(dto.email) && !!dto.firstName && !!dto.lastName && dto.id === id)) {
    return false;
  }
  return dto.priviledges.every(priviledge => priviledges.includes(priviledge));
};
