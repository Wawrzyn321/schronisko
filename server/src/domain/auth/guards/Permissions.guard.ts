import { LoggedInUser } from '../types';
import { PrismaService } from '../../../prisma-connect/prisma.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '@prisma-app/client';
import { PERMISSIONS_KEY } from '../decorators/Permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user }: { user: LoggedInUser } = context
      .switchToHttp()
      .getRequest();

    if (!user) {
      throw new ForbiddenException();
    }

    try {
      const dbUser = await this.prismaService.user.findUnique({
        where: { id: user.id },
      });

      if (!dbUser || !dbUser.isActive) {
        throw new ForbiddenException();
      }
    } catch (e: unknown) {
      console.warn(e);
      return false;
    }

    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }
    return (
      requiredPermissions.some((permission) =>
        user.permissions?.includes(permission),
      ) || checkAnimalPermissions(requiredPermissions, user.permissions)
    );
  }
}

function checkAnimalPermissions(
  requiredPermissions: Permission[],
  userPermissions: Permission[],
): boolean {
  const isAnimalViewOnlyRequired = requiredPermissions.find(
    (p) => p === Permission.ANIMAL_VIEW_ONLY,
  );
  if (!isAnimalViewOnlyRequired) {
    return false;
  }
  // if user has ANIMAL, they already have ANIMAL_VIEW_ONLY
  return userPermissions.includes(Permission.ANIMAL);
}
