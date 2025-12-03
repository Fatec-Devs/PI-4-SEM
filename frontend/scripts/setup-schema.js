/**
 * Script para criar o schema johndeere no RDS
 * Execute: node scripts/setup-schema.js
 */

require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function setupSchema() {
  const dbUrl = process.env.DATABASE_URL?.replace('?schema=johndeere', '') || 
                process.env.DATABASE_URL;
  
  console.log('📦 DATABASE_URL configurado:', dbUrl ? '✅' : '❌');
  
  if (!dbUrl) {
    console.error('❌ DATABASE_URL não encontrado no .env');
    process.exit(1);
  }

  const client = new Client({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false // Para RDS
    }
  });

  try {
    console.log('🔌 Conectando ao banco de dados...');
    await client.connect();
    console.log('✅ Conectado com sucesso!');

    console.log('📖 Lendo script SQL...');
    const sqlScript = fs.readFileSync(
      path.join(__dirname, 'setup-johndeere-schema.sql'),
      'utf8'
    );

    console.log('🚀 Executando script de criação do schema...');
    await client.query(sqlScript);
    
    console.log('✅ Schema johndeere criado com sucesso!');
    console.log('\n📊 Verificando schema...');
    
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'johndeere'
      ORDER BY table_name;
    `);
    
    console.log('\n✅ Tabelas criadas no schema johndeere:');
    result.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });
    
    console.log('\n🎉 Setup concluído com sucesso!');
    console.log('\n📝 Próximos passos:');
    console.log('   1. npx prisma generate');
    console.log('   2. npm run db:seed (opcional)');
    console.log('   3. npm run dev');
    
  } catch (error) {
    console.error('❌ Erro ao executar script:', error.message);
    if (error.detail) console.error('Detalhe:', error.detail);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupSchema();
