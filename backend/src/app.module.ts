import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { FuncionarioModule } from './modules/funcionario/funcionario.module.js';
import { GrupoModule } from './modules/grupo/grupo.module.js';
import { TimeModule } from './modules/time/time.module.js';
import { AplicacaoModule } from './modules/aplicacao/aplicacao.module.js';
import { UserAppModule } from './modules/user_app/user_app.module.js';

@Module({
  imports: [PrismaModule, FuncionarioModule, GrupoModule, TimeModule, AplicacaoModule, UserAppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
