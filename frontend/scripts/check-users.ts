// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   console.log('Verificando usuários existentes...\n');

//   const employees = await prisma.employee.findMany({
//     select: {
//       id: true,
//       matricula: true,
//       username: true,
//       email: true,
//       role: true,
//       status: true,
//     },
//   });

//   console.log(`Total de funcionários: ${employees.length}\n`);

//   if (employees.length > 0) {
//     console.log('Funcionários cadastrados:');
//     employees.forEach((emp) => {
//       console.log(`  - ${emp.username} (${emp.email}) - Role: ${emp.role}`);
//     });
//   } else {
//     console.log('Nenhum funcionário cadastrado.');
//   }

//   const appUsers = await prisma.applicationUser.findMany({
//     select: {
//       id: true,
//       username: true,
//       description: true,
//       status: true,
//     },
//   });

//   console.log(`\nTotal de usuários de aplicação: ${appUsers.length}\n`);

//   if (appUsers.length > 0) {
//     console.log('Usuários de aplicação cadastrados:');
//     appUsers.forEach((user) => {
//       console.log(`  - ${user.username} - ${user.description || 'Sem descrição'}`);
//     });
//   } else {
//     console.log('Nenhum usuário de aplicação cadastrado.');
//   }
// }

// main()
//   .catch((e) => {
//     console.error('Erro:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
