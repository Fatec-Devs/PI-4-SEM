import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Resetando senha do usuário comum (read-only)...\n');

  const newPassword = 'Read123!';
  const passwordHash = await bcrypt.hash(newPassword, 10);

  const user = await prisma.employee.update({
    where: { username: 'user.comum' },
    data: {
      passwordHash,
      passwordExpiresAt: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('✅ Senha do usuário comum resetada com sucesso!');
  console.log('\n📝 Credenciais:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Username: user.comum');
  console.log('Password: Read123!');
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
