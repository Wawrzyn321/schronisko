import { Permission } from '@prisma-app/client';

export const allPermissions: Permission[] = [
  Permission.USER,
  Permission.PAGE,
  Permission.NEWS,
  Permission.ANIMAL,
  Permission.ANIMAL_VIEW_ONLY,
];
