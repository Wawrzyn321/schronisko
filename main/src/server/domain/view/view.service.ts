import { Injectable, OnModuleInit } from '@nestjs/common';
import * as createServer from 'next';
import { NextServer } from 'next/dist/server/next';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

  async onModuleInit(): Promise<void> {
    //@ts-ignore
    this.server = createServer({ dev: true, dir: './src/client' });
    await this.server.prepare();
  }

  getNextServer(): NextServer {
    return this.server;
  }
}
