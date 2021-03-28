import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Priviledge } from '@prisma/client';
import { PRIVILEDGES_KEY } from './priviledges.decorator';

@Injectable()
export class PriviledgesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPriviledges = this.reflector.getAllAndOverride<Priviledge[]>(PRIVILEDGES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPriviledges) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredPriviledges.some((priviledge) => user.priviledges?.includes(priviledge));
  }
}