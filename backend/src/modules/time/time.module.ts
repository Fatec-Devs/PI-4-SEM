import { Module } from '@nestjs/common';
import { TimeService } from './time.service.js';
import { TimeController } from './time.controller.js';
import { PrismaModule } from '../../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [TimeController],
  providers: [TimeService],
})
export class TimeModule {}
