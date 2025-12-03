const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5432/postgres?schema=public'
});

async function checkDatabase() {
  const client = await pool.connect();
  
  try {
    // Listar todas as tabelas
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    console.log('📊 Tabelas existentes no banco:');
    tables.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });

    if (tables.rows.length === 0) {
      console.log('⚠️  Nenhuma tabela encontrada! É necessário criar o schema.');
    }

    // Verificar dados existentes
    for (const table of tables.rows) {
      const count = await client.query(`SELECT COUNT(*) as total FROM ${table.table_name}`);
      console.log(`  ${table.table_name}: ${count.rows[0].total} registros`);
    }

  } catch (error) {
    console.error('❌ Erro ao verificar banco:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

checkDatabase();