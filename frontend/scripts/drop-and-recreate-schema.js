require('dotenv').config();
const { Client } = require('pg');

async function dropAndRecreateSchema() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL?.replace('?schema=johndeere', ''),
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados');

    // Drop schema johndeere CASCADE (remove todas as tabelas)
    console.log('🗑️  Removendo schema johndeere...');
    await client.query(`DROP SCHEMA IF EXISTS johndeere CASCADE;`);

    // Recriar schema
    console.log('📦 Criando schema johndeere...');
    await client.query(`CREATE SCHEMA IF NOT EXISTS johndeere;`);

    console.log('✅ Schema recriado com sucesso!');
    console.log('\n📋 Próximo passo: Execute "npx prisma db push" para criar as tabelas');

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

dropAndRecreateSchema();
