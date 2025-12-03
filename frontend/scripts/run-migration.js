import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { Pool } from 'pg'

async function main() {
  const fileArg = process.argv[2] || 'prisma/migrations/1_add_admin_user/migration.sql'
  const sqlPath = path.resolve(fileArg)
  const sql = fs.readFileSync(sqlPath, 'utf-8')

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    console.error('DATABASE_URL não definido no .env')
    process.exit(1)
  }

  const pool = new Pool({ connectionString })
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query(sql)
    await client.query('COMMIT')
    console.log(`Migração executada com sucesso: ${sqlPath}`)
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Falha ao executar migração:', err)
    process.exitCode = 1
  } finally {
    client.release()
    await pool.end()
  }
}

main()
