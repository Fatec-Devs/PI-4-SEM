const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5432/postgres?schema=public'
});

async function createSchema() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Criando schema do sistema John Deere...');
    
    // Criar tabela grupo
    await client.query(`
      CREATE TABLE IF NOT EXISTS grupo (
        id_grupo SERIAL PRIMARY KEY,
        nome TEXT NOT NULL
      )
    `);
    console.log('✅ Tabela grupo criada');

    // Criar tabela funcionario
    await client.query(`
      CREATE TABLE IF NOT EXISTS funcionario (
        matricula TEXT PRIMARY KEY,
        nome TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        email TEXT
      )
    `);
    console.log('✅ Tabela funcionario criada');

    // Criar tabela funcionario_grupo
    await client.query(`
      CREATE TABLE IF NOT EXISTS funcionario_grupo (
        matricula_funcionario TEXT,
        id_grupo INTEGER,
        PRIMARY KEY (matricula_funcionario, id_grupo),
        FOREIGN KEY (matricula_funcionario) REFERENCES funcionario(matricula) ON DELETE RESTRICT,
        FOREIGN KEY (id_grupo) REFERENCES grupo(id_grupo) ON DELETE RESTRICT
      )
    `);
    console.log('✅ Tabela funcionario_grupo criada');

    // Criar tabela time
    await client.query(`
      CREATE TABLE IF NOT EXISTS time (
        id_time SERIAL PRIMARY KEY,
        nome TEXT NOT NULL,
        id_grupo INTEGER,
        pdl TEXT,
        FOREIGN KEY (id_grupo) REFERENCES grupo(id_grupo) ON DELETE SET NULL
      )
    `);
    console.log('✅ Tabela time criada');

    // Criar tabela aplicacao
    await client.query(`
      CREATE TABLE IF NOT EXISTS aplicacao (
        id_app SERIAL PRIMARY KEY,
        component_tag TEXT UNIQUE NOT NULL,
        nome TEXT NOT NULL,
        id_time INTEGER,
        FOREIGN KEY (id_time) REFERENCES time(id_time) ON DELETE SET NULL
      )
    `);
    console.log('✅ Tabela aplicacao criada');

    // Criar tabela user_app
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_app (
        id_user_app SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        senha TEXT NOT NULL,
        matricula_funcionario TEXT,
        FOREIGN KEY (matricula_funcionario) REFERENCES funcionario(matricula) ON DELETE SET NULL
      )
    `);
    console.log('✅ Tabela user_app criada');

    // Criar tabela aplicacao_user_app
    await client.query(`
      CREATE TABLE IF NOT EXISTS aplicacao_user_app (
        id_app INTEGER,
        id_user_app INTEGER,
        PRIMARY KEY (id_app, id_user_app),
        FOREIGN KEY (id_app) REFERENCES aplicacao(id_app) ON DELETE CASCADE,
        FOREIGN KEY (id_user_app) REFERENCES user_app(id_user_app) ON DELETE CASCADE
      )
    `);
    console.log('✅ Tabela aplicacao_user_app criada');

    // Inserir grupo Administradores
    const grupoResult = await client.query(`
      INSERT INTO grupo (nome) 
      SELECT 'Administradores' 
      WHERE NOT EXISTS (
        SELECT 1 FROM grupo WHERE nome = 'Administradores'
      )
      RETURNING id_grupo
    `);

    let grupoId;
    if (grupoResult.rows.length > 0) {
      grupoId = grupoResult.rows[0].id_grupo;
      console.log('✅ Grupo "Administradores" criado com ID:', grupoId);
    } else {
      const existingGrupo = await client.query(
        'SELECT id_grupo FROM grupo WHERE nome = $1',
        ['Administradores']
      );
      grupoId = existingGrupo.rows[0].id_grupo;
      console.log('✅ Grupo "Administradores" já existe com ID:', grupoId);
    }

    // Inserir funcionário admin
    const adminResult = await client.query(`
      INSERT INTO funcionario (matricula, nome, username, senha, email) 
      SELECT 'ADMIN001', 'Administrador', 'admin@johndeere.com', 'root', 'admin@johndeere.com'
      WHERE NOT EXISTS (
        SELECT 1 FROM funcionario WHERE matricula = 'ADMIN001' OR username = 'admin@johndeere.com'
      )
      RETURNING matricula
    `);

    if (adminResult.rows.length > 0) {
      console.log('✅ Funcionário admin criado com matrícula:', adminResult.rows[0].matricula);
      
      // Associar ao grupo
      await client.query(
        `INSERT INTO funcionario_grupo (matricula_funcionario, id_grupo)
         VALUES ($1, $2)`,
        ['ADMIN001', grupoId]
      );
      console.log('✅ Funcionário admin associado ao grupo Administradores');
    } else {
      console.log('✅ Funcionário admin já existe');
    }

    console.log('🎉 Schema John Deere criado com sucesso!');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Erro ao criar schema:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

createSchema();