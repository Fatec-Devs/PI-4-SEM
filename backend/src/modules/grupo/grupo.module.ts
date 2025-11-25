import { Module } from '@nestjs/common';
import { GrupoService } from './grupo.service.js';
import { GrupoController } from './grupo.controller.js';
import { PrismaModule } from '../../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [GrupoController],
  providers: [GrupoService],
})
export class GrupoModule {}
