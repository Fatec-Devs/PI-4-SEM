const pg = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5432/postgres?schema=john_deere'
});

async function checkTableStructure() {
  const client = await pool.connect();
  
  try {
    console.log('🔍 Verificando estrutura real das tabelas do schema john_deere...');
    
    // Definir search_path para o schema john_deere
    await client.query('SET search_path TO john_deere');
    
    // Verificar estrutura da tabela users
    console.log('\n📋 Estrutura da tabela users:');
    const usersColumns = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default 
      FROM information_schema.columns 
      WHERE table_schema = 'john_deere' AND table_name = 'users'
      ORDER BY ordinal_position
    `);
    
    usersColumns.rows.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? '(NOT NULL)' : '(NULL)'} ${col.column_default ? `DEFAULT: ${col.column_default}` : ''}`);
    });
    
    // Verificar dados existentes na tabela users
    console.log('\n📊 Dados da tabela users:');
    const usersData = await client.query('SELECT * FROM users LIMIT 2');
    usersData.rows.forEach((row, index) => {
      console.log(`  Registro ${index + 1}:`, JSON.stringify(row, null, 2));
    });
    
    // Verificar estrutura da tabela teams
    console.log('\n📋 Estrutura da tabela teams:');
    const teamsColumns = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default 
      FROM information_schema.columns 
      WHERE table_schema = 'john_deere' AND table_name = 'teams'
      ORDER BY ordinal_position
    `);
    
    teamsColumns.rows.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? '(NOT NULL)' : '(NULL)'} ${col.column_default ? `DEFAULT: ${col.column_default}` : ''}`);
    });
    
    // Verificar dados existentes na tabela teams
    console.log('\n📊 Dados da tabela teams:');
    const teamsData = await client.query('SELECT * FROM teams');
    teamsData.rows.forEach((row, index) => {
      console.log(`  Registro ${index + 1}:`, JSON.stringify(row, null, 2));
    });
    
    // Verificar estrutura da tabela application_users
    console.log('\n📋 Estrutura da tabela application_users:');
    const appUsersColumns = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default 
      FROM information_schema.columns 
      WHERE table_schema = 'john_deere' AND table_name = 'application_users'
      ORDER BY ordinal_position
    `);
    
    appUsersColumns.rows.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? '(NOT NULL)' : '(NULL)'} ${col.column_default ? `DEFAULT: ${col.column_default}` : ''}`);
    });
    
    // Verificar dados existentes na tabela application_users
    console.log('\n📊 Dados da tabela application_users:');
    const appUsersData = await client.query('SELECT * FROM application_users LIMIT 2');
    appUsersData.rows.forEach((row, index) => {
      console.log(`  Registro ${index + 1}:`, JSON.stringify(row, null, 2));
    });
    
  } catch (error) {
    console.error('❌ Erro ao verificar estrutura:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

checkTableStructure();