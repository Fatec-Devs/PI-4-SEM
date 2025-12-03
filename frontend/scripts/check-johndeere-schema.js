const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5432/postgres?schema=john_deere'
});

async function checkJohnDeereSchema() {
  const client = await pool.connect();
  
  try {
    // Verificar se o schema john_deere existe
    const schemaExists = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name = 'john_deere'
    `);
    
    if (schemaExists.rows.length === 0) {
      console.log('❌ Schema john_deere não encontrado!');
      return;
    }
    
    console.log('✅ Schema john_deere encontrado!');

    // Listar todas as tabelas do schema john_deere
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'john_deere' 
      ORDER BY table_name
    `);
    
    console.log('📊 Tabelas existentes no schema john_deere:');
    tables.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });

    if (tables.rows.length === 0) {
      console.log('⚠️  Nenhuma tabela encontrada no schema john_deere!');
    }

    // Verificar dados existentes
    for (const table of tables.rows) {
      try {
        const count = await client.query(`SELECT COUNT(*) as total FROM john_deere.${table.table_name}`);
        console.log(`  ${table.table_name}: ${count.rows[0].total} registros`);
      } catch (error) {
        console.log(`  ${table.table_name}: erro ao contar registros`);
      }
    }

    // Verificar estrutura de algumas tabelas principais
    console.log('\n🔍 Estrutura das tabelas:');
    for (const table of tables.rows.slice(0, 3)) { // Limitar a 3 primeiras tabelas
      const columns = await client.query(`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_schema = 'john_deere' AND table_name = $1
        ORDER BY ordinal_position
      `, [table.table_name]);
      
      console.log(`\n  📋 ${table.table_name}:`);
      columns.rows.forEach(col => {
        console.log(`    - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? '(NOT NULL)' : '(NULL)'}`);
      });
    }

  } catch (error) {
    console.error('❌ Erro ao verificar schema john_deere:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

checkJohnDeereSchema();