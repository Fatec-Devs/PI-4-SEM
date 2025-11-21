import { Module } from '@nestjs/common';
import { UserAppService } from './user_app.service';
import { UserAppController } from './user_app.controller';
import { PrismaModule } from '../../shared/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserAppController],
  providers: [UserAppService],
})
export class UserAppModule {}
