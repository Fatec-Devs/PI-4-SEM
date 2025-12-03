/**
 * Script para criar o schema johndeere usando Prisma
 * Execute: npx tsx scripts/setup-schema-prisma.ts
 */

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function setupSchema() {
  try {
    console.log('🔌 Conectando ao banco de dados...');
    
    // Testa conexão
    await prisma.$connect();
    console.log('✅ Conectado com sucesso!');

    console.log('📖 Lendo script SQL...');
    const sqlScript = fs.readFileSync(
      path.join(__dirname, 'setup-johndeere-schema.sql'),
      'utf8'
    );

    console.log('🚀 Executando script de criação do schema...');
    
    // Executa o script SQL bruto
    await prisma.$executeRawUnsafe(sqlScript);
    
    console.log('✅ Schema johndeere criado com sucesso!');
    
    console.log('\n📊 Verificando schema...');
    const tables: any[] = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'johndeere'
      ORDER BY table_name;
    `;
    
    console.log('\n✅ Tabelas criadas no schema johndeere:');
    tables.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });
    
    console.log('\n🎉 Setup concluído com sucesso!');
    console.log('\n📝 Próximos passos:');
    console.log('   1. npx prisma generate');
    console.log('   2. npm run db:seed (opcional)');
    console.log('   3. npm run dev');
    
  } catch (error: any) {
    console.error('❌ Erro ao executar script:', error.message);
    if (error.code) console.error('Código:', error.code);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupSchema();
