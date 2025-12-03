/**
 * Cria o banco pi-fatec se não existir e depois cria o schema johndeere
 */

require('dotenv').config();
const { Client } = require('pg');

async function setup() {
  // Primeiro conecta ao banco postgres padrão
  const adminClient = new Client({
    host: 'pi-fatec.cih0me2uwv6k.us-east-1.rds.amazonaws.com',
    port: 5432,
    user: 'postgres',
    password: 'Gazive20',
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('🔌 Conectando ao banco postgres...');
    await adminClient.connect();
    console.log('✅ Conectado!');

    // Verifica se banco pifatec existe
    const checkDb = await adminClient.query(`
      SELECT 1 FROM pg_database WHERE datname = 'pifatec';
    `);

    if (checkDb.rows.length === 0) {
      console.log('📦 Criando banco pifatec...');
      await adminClient.query('CREATE DATABASE pifatec;');
      console.log('✅ Banco pifatec criado!');
    } else {
      console.log('✅ Banco pifatec já existe!');
    }

    await adminClient.end();

    // Agora conecta ao banco pifatec para criar o schema
    const dbClient = new Client({
      host: 'pi-fatec.cih0me2uwv6k.us-east-1.rds.amazonaws.com',
      port: 5432,
      user: 'postgres',
      password: 'Gazive20',
      database: 'pifatec',
      ssl: { rejectUnauthorized: false }
    });

    console.log('\n🔌 Conectando ao banco pifatec...');
    await dbClient.connect();
    console.log('✅ Conectado!');

    console.log('📖 Lendo script SQL...');
    const fs = require('fs');
    const path = require('path');
    const sqlScript = fs.readFileSync(
      path.join(__dirname, 'setup-johndeere-schema.sql'),
      'utf8'
    );

    console.log('🚀 Executando script de criação do schema johndeere...');
    await dbClient.query(sqlScript);
    
    console.log('✅ Schema johndeere criado com sucesso!');
    
    const tables = await dbClient.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'johndeere'
      ORDER BY table_name;
    `);
    
    console.log('\n📊 Tabelas criadas no schema johndeere:');
    tables.rows.forEach(row => {
      console.log(`   ✓ ${row.table_name}`);
    });
    
    await dbClient.end();
    
    console.log('\n🎉 Setup concluído com sucesso!');
    console.log('\n📝 Atualize seu .env:');
    console.log('DATABASE_URL="postgresql://postgres:Gazive20@pi-fatec.cih0me2uwv6k.us-east-1.rds.amazonaws.com:5432/pifatec?schema=johndeere"');
    console.log('\n📝 Próximos passos:');
    console.log('   1. Atualizar .env com a URL acima');
    console.log('   2. npx prisma generate');
    console.log('   3. npm run db:seed');
    console.log('   4. npm run dev');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

setup();
