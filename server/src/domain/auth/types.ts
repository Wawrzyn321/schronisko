import { Permission } from '@prisma/client';

export type LoggedInUser = {
  id: number;
  login: string;
  permissions: Permission[];
};

export type JWTValidationPayload = {
  sub: number;
  login: string;
  permissions: Permission[];
};
