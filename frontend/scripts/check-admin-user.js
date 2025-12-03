require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    console.log('🔍 Verificando usuário admin...\n');

    const admin = await prisma.employee.findUnique({
      where: { username: "admin" }
    });

    if (!admin) {
      console.log('❌ Usuário admin NÃO ENCONTRADO no banco!');
      return;
    }

    console.log('✅ Usuário admin encontrado:');
    console.log('  ID:', admin.id);
    console.log('  Username:', admin.username);
    console.log('  Email:', admin.email);
    console.log('  Role:', admin.role);
    console.log('  Status:', admin.status);
    console.log('  Password Hash:', admin.passwordHash);
    console.log('  Created At:', admin.createdAt);

    // Testar senha
    console.log('\n🔐 Testando senha "Admin@123456"...');
    const passwordMatch = await bcrypt.compare("Admin@123456", admin.passwordHash);
    
    if (passwordMatch) {
      console.log('✅ Senha CORRETA! O hash está funcionando.');
    } else {
      console.log('❌ Senha INCORRETA! O hash não está batendo.');
      console.log('\n🔧 Vamos criar um novo hash...');
      const newHash = await bcrypt.hash("Admin@123456", 12);
      console.log('Novo hash gerado:', newHash);
      
      // Atualizar no banco
      await prisma.employee.update({
        where: { username: "admin" },
        data: { passwordHash: newHash }
      });
      console.log('✅ Hash atualizado no banco!');
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();
