import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Resetando senha do usuário admin...\n');

  const newPassword = 'Admin123!';
  const passwordHash = await bcrypt.hash(newPassword, 10);

  const admin = await prisma.employee.update({
    where: { username: 'admin' },
    data: {
      passwordHash,
      passwordExpiresAt: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('✅ Senha do admin resetada com sucesso!');
  console.log('\n📝 Credenciais:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Username: admin');
  console.log('Password: Admin123!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
