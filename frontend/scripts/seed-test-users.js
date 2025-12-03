const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5432/postgres?schema=public'
});

async function seedTestUsers() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Inserindo funcionários de teste...');
    
    // Criar grupo de Usuários se não existir
    const grupoResult = await client.query(`
      INSERT INTO grupo (nome) 
      SELECT 'Usuários' 
      WHERE NOT EXISTS (
        SELECT 1 FROM grupo WHERE nome = 'Usuários'
      )
      RETURNING id_grupo
    `);

    let grupoId;
    if (grupoResult.rows.length > 0) {
      grupoId = grupoResult.rows[0].id_grupo;
    } else {
      const existingGrupo = await client.query(
        'SELECT id_grupo FROM grupo WHERE nome = $1',
        ['Usuários']
      );
      grupoId = existingGrupo.rows[0].id_grupo;
    }

    // Funcionários de teste
    const funcionarios = [
      { matricula: 'FUNC001', nome: 'Carlos Silva', username: 'carlos.silva@johndeere.com', senha: 'senha123', email: 'carlos.silva@johndeere.com' },
      { matricula: 'FUNC002', nome: 'Ana Souza', username: 'ana.souza@johndeere.com', senha: 'senha123', email: 'ana.souza@johndeere.com' },
      { matricula: 'FUNC003', nome: 'Pedro Almeida', username: 'pedro.almeida@johndeere.com', senha: 'senha123', email: 'pedro.almeida@johndeere.com' },
      { matricula: 'FUNC004', nome: 'Maria Santos', username: 'maria.santos@johndeere.com', senha: 'senha123', email: 'maria.santos@johndeere.com' },
      { matricula: 'FUNC005', nome: 'João Oliveira', username: 'joao.oliveira@johndeere.com', senha: 'senha123', email: 'joao.oliveira@johndeere.com' },
    ];

    for (const func of funcionarios) {
      const result = await client.query(`
        INSERT INTO funcionario (matricula, nome, username, senha, email) 
        SELECT $1, $2, $3, $4, $5
        WHERE NOT EXISTS (
          SELECT 1 FROM funcionario WHERE matricula = $1 OR username = $3
        )
        RETURNING matricula
      `, [func.matricula, func.nome, func.username, func.senha, func.email]);

      if (result.rows.length > 0) {
        // Associar ao grupo Usuários
        await client.query(
          `INSERT INTO funcionario_grupo (matricula_funcionario, id_grupo)
           VALUES ($1, $2)`,
          [func.matricula, grupoId]
        );
        console.log(`✅ Funcionário ${func.nome} criado`);
      } else {
        console.log(`⏭️  Funcionário ${func.nome} já existe`);
      }
    }

    console.log('🎉 Funcionários de teste inseridos com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao inserir funcionários de teste:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seedTestUsers();