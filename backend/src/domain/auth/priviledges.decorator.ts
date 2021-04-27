import { SetMetadata } from '@nestjs/common';
import { Priviledge } from '@prisma/client';

export const PRIVILEDGES_KEY = 'priviledges';
export const RequirePriviledge = (...priviledges: Priviledge[]) => SetMetadata(PRIVILEDGES_KEY, priviledges);
