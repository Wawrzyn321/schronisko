import { CacheService } from './cache.service';
import { Module } from '@nestjs/common';
import { CacheServiceInterface } from './interface';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: CacheServiceInterface,
      useClass: CacheService,
    },
    ConfigService,
  ],
  imports: [ConfigModule],
  exports: [CacheServiceInterface],
})
export class CacheModule {}
