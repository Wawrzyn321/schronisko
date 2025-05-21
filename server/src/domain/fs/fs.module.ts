import { Module } from '@nestjs/common';
import { FsServiceInterface } from './interface';
import { FsService } from './fs.service';

@Module({
  providers: [
    {
      provide: FsServiceInterface,
      useClass: FsService,
    },
  ],
  exports: [FsServiceInterface],
})
export class FsModule {}
