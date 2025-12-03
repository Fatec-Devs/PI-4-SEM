// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function updateRoles() {
//   try {
//     console.log('🔄 Atualizando roles dos usuários existentes...\n');

//     const users = await prisma.applicationUser.findMany({
//       select: { id: true, username: true, role: true }
//     });

//     if (users.length === 0) {
//       console.log('❌ Nenhum usuário encontrado.');
//       return;
//     }

//     console.log(`📋 Encontrados ${users.length} usuário(s):\n`);

//     // Atualizar app.machinery.track para ROLE_2 (Maquinário)
//     const user1 = users.find(u => u.username === 'app.machinery.track');
//     if (user1) {
//       await prisma.applicationUser.update({
//         where: { id: user1.id },
//         data: { role: 'ROLE_2' }
//       });
//       console.log(`✅ ${user1.username}: ROLE_2 (Dashboard de Maquinário)`);
//     }

//     // Atualizar teste para ROLE_3 (Relatórios)
//     const user2 = users.find(u => u.username === 'teste');
//     if (user2) {
//       await prisma.applicationUser.update({
//         where: { id: user2.id },
//         data: { role: 'ROLE_3' }
//       });
//       console.log(`✅ ${user2.username}: ROLE_3 (Dashboard de Relatórios)`);
//     }

//     console.log('\n✅ Atualização concluída!');
//     console.log('\n📝 Credenciais de login:');
//     console.log('   app.machinery.track (ROLE_2): &*T-SaDW20;r(dXB]wzL@|Hf');
//     console.log('   teste (ROLE_3): +=);*adH%-pc=j4BlVg!8K1v');

//   } catch (error) {
//     console.error('❌ Erro ao atualizar roles:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// updateRoles();
