const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5432/postgres?schema=public'
});

async function seedAdmin() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Verificar e criar grupo Administradores
    const grupoResult = await client.query(
      `INSERT INTO grupo (nome) 
       SELECT 'Administradores' 
       WHERE NOT EXISTS (
         SELECT 1 FROM grupo WHERE nome = 'Administradores'
       )
       RETURNING id_grupo`
    );

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

    // Verificar e criar funcionário admin
    const adminResult = await client.query(
      `INSERT INTO funcionario (matricula, nome, username, senha, email) 
       SELECT 'ADMIN001', 'Administrador', 'admin@johndeere.com', 'root', 'admin@johndeere.com'
       WHERE NOT EXISTS (
         SELECT 1 FROM funcionario WHERE matricula = 'ADMIN001' OR username = 'admin@johndeere.com'
       )
       RETURNING matricula`
    );

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

    await client.query('COMMIT');
    console.log('🎉 Seed de admin aplicado com sucesso!');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Erro ao aplicar seed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seedAdmin();