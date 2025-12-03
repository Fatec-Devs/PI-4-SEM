// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// async function main() {
//   console.log('🌱 Seeding database...');

//   // Create admin user
//   const adminPassword = await bcrypt.hash('Admin123!', 10);
//   const admin = await prisma.employee.upsert({
//     where: { username: 'admin' },
//     update: {},
//     create: {
//       matricula: 'ADM001',
//       nome: 'Administrador',
//       email: 'admin@johndeere.com',
//       username: 'admin',
//       passwordHash: adminPassword,
//       passwordExpiresAt: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000), // 50 days
//       role: 'ADMIN',
//       status: 'ACTIVE',
//     },
//   });
//   console.log('✅ Admin user created:', admin.username);

//   // Create read-only user
//   const readonlyPassword = await bcrypt.hash('Read123!', 10);
//   const readonly = await prisma.employee.upsert({
//     where: { username: 'readonly' },
//     update: {},
//     create: {
//       matricula: 'USR001',
//       nome: 'Usuário Comum',
//       email: 'user@johndeere.com',
//       username: 'readonly',
//       passwordHash: readonlyPassword,
//       passwordExpiresAt: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
//       role: 'COMUM',
//       status: 'ACTIVE',
//     },
//   });
//   console.log('✅ Read-only user created:', readonly.username);

//   // Create audit log
//   await prisma.auditLog.create({
//     data: {
//       action: 'SEED_DATABASE',
//       entity: 'MULTIPLE',
//       entityId: 'seed-script',
//       performedBy: 'SYSTEM',
//       details: {
//         message: 'Database seeded with initial users',
//         users: [admin.username, readonly.username],
//       },
//     },
//   });
//   console.log('✅ Audit log created');

//   console.log('\n📝 Default credentials:');
//   console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
//   console.log('Admin:');
//   console.log('  Username: admin');
//   console.log('  Password: Admin123!');
//   console.log('\nRead-Only:');
//   console.log('  Username: readonly');
//   console.log('  Password: Read123!');
//   console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
// }

// main()
//   .catch((e) => {
//     console.error('❌ Error seeding database:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
