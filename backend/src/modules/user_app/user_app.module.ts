import { Module } from '@nestjs/common';
import { UserAppService } from './user_app.service.js';
import { UserAppController } from './user_app.controller.js';
import { PrismaModule } from '../../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [UserAppController],
  providers: [UserAppService],
})
export class UserAppModule {}
