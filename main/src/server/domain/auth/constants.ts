import type { Permission } from '@prisma/client';

export const allPermissions: Permission[] = ['USER', 'PAGE', 'NEWS', 'ANIMAL'];

export const jwtConstants = {
  secret: 'secretKey',
  ttl: '4h',
};
