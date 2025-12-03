// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// function generateStrongPassword(length: number = 24): string {
//   const lowercase = 'abcdefghijklmnopqrstuvwxyz';
//   const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   const numbers = '0123456789';
//   const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';
//   const allChars = lowercase + uppercase + numbers + symbols;

//   let password = '';
//   password += lowercase[Math.floor(Math.random() * lowercase.length)];
//   password += uppercase[Math.floor(Math.random() * uppercase.length)];
//   password += numbers[Math.floor(Math.random() * numbers.length)];
//   password += symbols[Math.floor(Math.random() * symbols.length)];

//   for (let i = password.length; i < length; i++) {
//     password += allChars[Math.floor(Math.random() * allChars.length)];
//   }

//   return password
//     .split('')
//     .sort(() => Math.random() - 0.5)
//     .join('');
// }

// async function updateExistingPasswords() {
//   try {
//     console.log('🔄 Buscando usuários de aplicação sem senha em texto...\n');

//     const users = await prisma.applicationUser.findMany({
//       where: {
//         OR: [
//           { passwordPlainText: null },
//           { passwordPlainText: '' }
//         ]
//       },
//       select: {
//         id: true,
//         username: true,
//       }
//     });

//     if (users.length === 0) {
//       console.log('✅ Todos os usuários já têm senhas configuradas!');
//       return;
//     }

//     console.log(`📋 Encontrados ${users.length} usuário(s) para atualizar:\n`);

//     const updatedUsers: { username: string; password: string }[] = [];

//     for (const user of users) {
//       const newPassword = generateStrongPassword();
//       const passwordHash = await bcrypt.hash(newPassword, 10);

//       await prisma.applicationUser.update({
//         where: { id: user.id },
//         data: {
//           passwordHash,
//           passwordPlainText: newPassword,
//           lastRotation: new Date(),
//           passwordExpiresAt: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
//         }
//       });

//       updatedUsers.push({ username: user.username, password: newPassword });
//       console.log(`✅ ${user.username}: Senha atualizada`);
//     }

//     console.log('\n📝 SENHAS GERADAS (copie e guarde):\n');
//     console.log('═'.repeat(80));
//     updatedUsers.forEach(({ username, password }) => {
//       console.log(`${username}: ${password}`);
//     });
//     console.log('═'.repeat(80));
//     console.log('\n✅ Atualização concluída!');

//   } catch (error) {
//     console.error('❌ Erro:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// updateExistingPasswords();
