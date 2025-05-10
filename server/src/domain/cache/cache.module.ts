import { CacheService } from './cache.service';
import { Module } from '@nestjs/common';
import { CacheServiceInterface } from './interface';

@Module({
  providers: [
    {
      provide: CacheServiceInterface,
      useClass: CacheService,
    },
  ],
  exports: [CacheServiceInterface],
})
export class CacheModule {}
