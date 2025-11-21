import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/prisma/prisma.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { GrupoModule } from './modules/grupo/grupo.module';
import { TimeModule } from './modules/time/time.module';
import { AplicacaoModule } from './modules/aplicacao/aplicacao.module';
import { UserAppModule } from './modules/user_app/user_app.module';

@Module({
  imports: [PrismaModule, FuncionarioModule, GrupoModule, TimeModule, AplicacaoModule, UserAppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
