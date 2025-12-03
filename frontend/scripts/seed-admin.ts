import 'dotenv/config'
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5432/postgres?schema=public' })
const prisma = new PrismaClient({ adapter })

async function seedAdmin() {
  try {
    // Verificar se o grupo 'Administradores' existe, se não, criar
    const grupoExistente = await prisma.grupo.findFirst({
      where: { nome: 'Administradores' }
    });

    let grupoId;
    if (!grupoExistente) {
      const novoGrupo = await prisma.grupo.create({
        data: { nome: 'Administradores' }
      });
      grupoId = novoGrupo.id_grupo;
      console.log('✅ Grupo "Administradores" criado com ID:', grupoId);
    } else {
      grupoId = grupoExistente.id_grupo;
      console.log('✅ Grupo "Administradores" já existe com ID:', grupoId);
    }

    // Verificar se o funcionário admin já existe
    const adminExistente = await prisma.funcionario.findFirst({
      where: { 
        OR: [
          { matricula: 'ADMIN001' },
          { username: 'admin@johndeere.com' }
        ]
      }
    });

    if (!adminExistente) {
      // Inserir funcionário admin
      const admin = await prisma.funcionario.create({
        data: {
          matricula: 'ADMIN001',
          nome: 'Administrador',
          username: 'admin@johndeere.com',
          senha: 'root', // Em produção, use hash de senha!
          email: 'admin@johndeere.com'
        }
      });
      console.log('✅ Funcionário admin criado com matrícula:', admin.matricula);

      // Associar ao grupo Administradores
      await prisma.funcionario_grupo.create({
        data: {
          matricula_funcionario: 'ADMIN001',
          id_grupo: grupoId
        }
      });
      console.log('✅ Funcionário admin associado ao grupo Administradores');
    } else {
      console.log('✅ Funcionário admin já existe com matrícula:', adminExistente.matricula);
    }

    console.log('🎉 Seed de admin aplicado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao aplicar seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
