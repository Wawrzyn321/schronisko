import { User } from '@prisma/client';
import * as EmailValidator from 'email-validator';
import { priviledges } from './priviledges';

export interface UserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
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
      create: dto.priviledges.map(priviledge => ({priviledge})),
    },
  };
};

export function validate(dto: UserDto): boolean {
  if (!(EmailValidator.validate(dto.email) && !!dto.firstName && !!dto.lastName && !!dto.password)) {
    return false;
  }
  return dto.priviledges.every(priviledge => priviledges.includes(priviledge));
};