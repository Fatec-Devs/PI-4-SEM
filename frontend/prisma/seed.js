/**
 * Script de Seed para o Schema John Deere (JavaScript Version)
 * Sistema John Deere - User Management
 * 
 * Popula dados iniciais:
 * - Usuário Admin padrão
 * - Times de exemplo
 * - Usuários de aplicação de teste
 */

require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// Função para hash de senha
async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

// Função para gerar senha aleatória
function generateRandomPassword() {
  const length = 12;
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';
  const allChars = uppercase + lowercase + numbers + symbols;
  
  let password = '';
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

// Função para calcular expiração
function calculatePasswordExpiration() {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 50);
  return expirationDate;
}

async function main() {
  console.log("🌱 Starting seed process for John Deere schema...");

  // 1. Criar usuário Admin padrão
  console.log("Creating admin user...");
  
  const adminPassword = "Admin@123456";
  const adminPasswordHash = await hashPassword(adminPassword);

  const admin = await prisma.employee.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      matricula: "ADM001",
      nome: "Administrador do Sistema",
      username: "admin",
      email: "admin@johndeere.com",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      status: "ACTIVE",
      passwordExpiresAt: calculatePasswordExpiration(),
    },
  });

  console.log(`✅ Admin user created: ${admin.username}`);

  // 2. Criar usuário comum de exemplo
  console.log("Creating regular user...");
  
  const userPassword = "User@123456";
  const userPasswordHash = await hashPassword(userPassword);

  const regularUser = await prisma.employee.upsert({
    where: { username: "user.comum" },
    update: {},
    create: {
      matricula: "USR001",
      nome: "Usuário Comum",
      username: "user.comum",
      email: "user.comum@johndeere.com",
      passwordHash: userPasswordHash,
      role: "COMUM",
      status: "ACTIVE",
      passwordExpiresAt: calculatePasswordExpiration(),
    },
  });

  console.log(`✅ Regular user created: ${regularUser.username}`);

  // 3. Criar times de exemplo
  console.log("Creating teams...");
  
  const teamsData = [
    { codigo: "DEV", nome: "Desenvolvimento", descricao: "Time responsável pelo desenvolvimento de software" },
    { codigo: "INFRA", nome: "Infraestrutura", descricao: "Time responsável pela infraestrutura e DevOps" },
    { codigo: "QA", nome: "Qualidade", descricao: "Time responsável por testes e garantia de qualidade" },
    { codigo: "PROD", nome: "Produção", descricao: "Time responsável pela produção e operações" },
  ];

  const teams = [];
  for (const teamData of teamsData) {
    const team = await prisma.team.upsert({
      where: { codigo: teamData.codigo },
      update: {},
      create: teamData,
    });
    teams.push(team);
    console.log(`  ✅ Team created: ${team.nome}`);
  }

  // 4. Associar usuário comum ao time de Desenvolvimento
  console.log("Creating team associations...");
  
  await prisma.employeeTeam.upsert({
    where: {
      funcionarioId_grupoId: {
        funcionarioId: regularUser.id,
        grupoId: teams[0].id,
      },
    },
    update: {},
    create: {
      funcionarioId: regularUser.id,
      grupoId: teams[0].id,
    },
  });

  console.log(`  ✅ User ${regularUser.username} assigned to team ${teams[0].nome}`);

  // 5. Associar admin a todos os times (para demonstração)
  console.log("Assigning admin to all teams...");
  
  for (const team of teams) {
    await prisma.employeeTeam.upsert({
      where: {
        funcionarioId_grupoId: {
          funcionarioId: admin.id,
          grupoId: team.id,
        },
      },
      update: {},
      create: {
        funcionarioId: admin.id,
        grupoId: team.id,
      },
    });
  }

  console.log(`  ✅ Admin assigned to all teams`);

  // 6. Criar usuários de aplicação
  console.log("Creating application users...");
  
  const appUsersData = [
    { username: "app.iot.sensors", description: "Sistema de sensores IoT" },
    { username: "app.machinery.track", description: "Sistema de rastreamento de máquinas" },
  ];

  for (const appUserData of appUsersData) {
    const randomPassword = generateRandomPassword();
    console.log(`  🔑 Generated password for ${appUserData.username}: ${randomPassword}`);
    
    const appUser = await prisma.applicationUser.create({
      data: {
        username: appUserData.username,
        description: appUserData.description,
        awsSecretArn: `arn:aws:secretsmanager:us-east-1:123456789012:secret:johndeere/appuser/${appUserData.username}`,
        status: "ACTIVE",
        lastRotation: new Date(),
        passwordExpiresAt: calculatePasswordExpiration(),
      },
    });

    // Criar entrada no histórico de senhas
    await prisma.passwordHistory.create({
      data: {
        userId: appUser.id,
        passwordHash: await hashPassword(randomPassword),
        createdBy: admin.username,
      },
    });

    console.log(`  ✅ Application user created: ${appUser.username}`);
  }

  // 7. Criar log de auditoria do seed
  console.log("Creating audit log...");
  
  await prisma.auditLog.create({
    data: {
      action: "SEED_DATABASE",
      entity: "MULTIPLE",
      entityId: "seed-script",
      performedBy: "system",
      details: {
        message: "Database seeded with initial data",
        timestamp: new Date().toISOString(),
        users_created: 2,
        teams_created: 4,
        app_users_created: 2,
      },
    },
  });

  console.log("✅ Seed completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`  - Admin user: admin / Admin@123456`);
  console.log(`  - Regular user: user.comum / User@123456`);
  console.log(`  - Teams: ${teams.length}`);
  console.log(`  - Application users: ${appUsersData.length}`);
  console.log("\n⚠️  IMPORTANT: Change default passwords in production!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
