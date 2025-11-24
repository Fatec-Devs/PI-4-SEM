import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// Use the installed @prisma/client package (runtime placed in node_modules)
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends (PrismaClient as any) implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
