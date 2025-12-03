const pg = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5432/postgres?schema=john_deere'
});

async function testDirectConnection() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Testando conexão direta com PostgreSQL...');
    
    // Definir search_path para o schema john_deere
    await client.query('SET search_path TO john_deere');
    
    // Testar conexão contando usuários
    const userCount = await client.query('SELECT COUNT(*) as total FROM users');
    console.log(`✅ Conexão estabelecida! Total de usuários: ${userCount.rows[0].total}`);
    
    // Listar primeiros usuários
    const users = await client.query(`
      SELECT id, username, email, full_name, matricula, is_active, created_at 
      FROM users 
      LIMIT 5
    `);
    
    console.log('\n👥 Usuários encontrados:');
    users.rows.forEach(user => {
      console.log(`  - ${user.username} (${user.full_name || 'Sem nome'}) - Matrícula: ${user.matricula || 'N/A'} - ${user.is_active ? 'Ativo' : 'Inativo'}`);
    });
    
    // Listar times/equipes
    const teams = await client.query(`
      SELECT id, name, description, is_active 
      FROM teams 
      LIMIT 5
    `);
    
    console.log('\n👥 Times/Equipes encontrados:');
    teams.rows.forEach(team => {
      console.log(`  - ${team.name} ${team.description ? `(${team.description})` : ''} - ${team.is_active ? 'Ativo' : 'Inativo'}`);
    });
    
    // Verificar application_users
    const appUsers = await client.query(`
      SELECT id, username, matricula, is_active, created_at 
      FROM application_users 
      LIMIT 3
    `);
    
    console.log('\n📱 Application Users encontrados:');
    appUsers.rows.forEach(user => {
      console.log(`  - ${user.username} - Matrícula: ${user.matricula} - ${user.is_active ? 'Ativo' : 'Inativo'}`);
    });
    
    // Verificar logs de acesso
    const accessLogs = await client.query(`
      SELECT COUNT(*) as total FROM access_logs
    `);
    
    console.log(`\n📊 Total de logs de acesso: ${accessLogs.rows[0].total}`);
    
    // Verificar permissões do sistema
    const permissions = await client.query(`
      SELECT name, resource, action 
      FROM system_permissions 
      LIMIT 5
    `);
    
    console.log('\n🔐 Permissões do sistema:');
    permissions.rows.forEach(perm => {
      console.log(`  - ${perm.name}: ${perm.resource}.${perm.action}`);
    });
    
  } catch (error) {
    console.error('❌ Erro ao conectar com PostgreSQL:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

testDirectConnection();