import { Module } from '@nestjs/common';
import { AplicacaoService } from './aplicacao.service.js';
import { AplicacaoController } from './aplicacao.controller.js';
import { PrismaModule } from '../../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [AplicacaoController],
  providers: [AplicacaoService],
})
export class AplicacaoModule {}
