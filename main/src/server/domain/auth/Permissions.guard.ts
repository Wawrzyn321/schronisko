import { LoggedInUser } from './types';
import { PrismaService } from 'prisma-connect/prisma.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '@prisma/client';
import { PERMISSIONS_KEY } from './Permissions.decorator';

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
      return false;
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
    return requiredPermissions.some((permission) =>
      user.permissions?.includes(permission),
    );
  }
}
