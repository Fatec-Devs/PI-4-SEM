import { Module } from '@nestjs/common';
import { AplicacaoService } from './aplicacao.service';
import { AplicacaoController } from './aplicacao.controller';
import { PrismaModule } from '../../shared/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AplicacaoController],
  providers: [AplicacaoService],
})
export class AplicacaoModule {}
