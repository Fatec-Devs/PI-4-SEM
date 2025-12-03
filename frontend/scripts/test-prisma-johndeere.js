const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5432/postgres?schema=john_deere';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function testPrismaConnection() {
  try {
    console.log('🔄 Testando conexão Prisma com schema john_deere...');
    
    // Testar conexão listando usuários
    const userCount = await prisma.users.count();
    console.log(`✅ Conexão estabelecida! Total de usuários: ${userCount}`);
    
    // Listar primeiros usuários
    const users = await prisma.users.findMany({
      take: 5,
      select: {
        id: true,
        username: true,
        email: true,
        full_name: true,
        matricula: true,
        is_active: true,
        created_at: true
      }
    });
    
    console.log('\n👥 Usuários encontrados:');
    users.forEach(user => {
      console.log(`  - ${user.username} (${user.full_name || 'Sem nome'}) - Matrícula: ${user.matricula || 'N/A'}`);
    });
    
    // Listar times/equipes
    const teams = await prisma.teams.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        description: true,
        is_active: true
      }
    });
    
    console.log('\n👥 Times/Equipes encontrados:');
    teams.forEach(team => {
      console.log(`  - ${team.name} ${team.description ? `(${team.description})` : ''} - ${team.is_active ? 'Ativo' : 'Inativo'}`);
    });
    
    // Verificar application_users
    const appUsers = await prisma.application_users.findMany({
      take: 3,
      select: {
        id: true,
        username: true,
        matricula: true,
        is_active: true,
        created_at: true
      }
    });
    
    console.log('\n📱 Application Users encontrados:');
    appUsers.forEach(user => {
      console.log(`  - ${user.username} - Matrícula: ${user.matricula} - ${user.is_active ? 'Ativo' : 'Inativo'}`);
    });
    
  } catch (error) {
    console.error('❌ Erro ao conectar com Prisma:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrismaConnection();