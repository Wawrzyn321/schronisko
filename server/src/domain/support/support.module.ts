import { SanitizeService } from './sanitize.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [SanitizeService],
  exports: [SanitizeService],
})
export class SupportModule {}
