import { Module } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service.js';
import { FuncionarioController } from './funcionario.controller.js';
import { PrismaModule } from '../../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [FuncionarioController],
  providers: [FuncionarioService],
})
export class FuncionarioModule {}
