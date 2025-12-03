import pg from 'pg';

const { Pool } = pg;

// Configurar pool de conexões com PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5432/postgres?schema=john_deere',
  // Configurar search_path padrão para john_deere
  options: '-c search_path=john_deere'
});

// Função para executar queries com schema john_deere
export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    // Garantir que estamos usando o schema john_deere
    await client.query('SET search_path TO john_deere');
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

// Função para transações
export async function transaction(callback: (client: pg.PoolClient) => Promise<any>) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SET search_path TO john_deere');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export { pool };
export default { query, transaction, pool };