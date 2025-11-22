import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as Prisma from '@prisma/client';

@Injectable()
export class PrismaService extends (Prisma as any).PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
