import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './domain/auth/auth.module';
import { JwtAuthGuard } from './domain/auth/jwt-auth.guard';
import { UsersModule } from './domain/users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PagesModule } from './domain/pages/pages.module';
import { NewsModule } from './domain/news/news.module';

@Module({
  imports: [AuthModule, UsersModule, PagesModule, NewsModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'static'),
    //exclude: ['/api*'],
  }),
  ],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }]
})
export class AppModule { }
