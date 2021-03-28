import { SetMetadata } from '@nestjs/common';
import { Priviledge } from '@prisma/client';

export const PRIVILEDGES_KEY = 'priviledges';
export const DUPA = (...priviledges: Priviledge[]) => SetMetadata(PRIVILEDGES_KEY, priviledges);
