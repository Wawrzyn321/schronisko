import { CacheService } from './cache.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
