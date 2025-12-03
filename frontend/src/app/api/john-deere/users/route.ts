import { NextResponse } from "next/server";
import { query } from "../../../../lib/database";

export async function GET() {
  try {
    const result = await query(`
      SELECT id, email, name, matricula, role, is_active, created_at, updated_at, last_login_at
      FROM users
      ORDER BY created_at DESC
    `);
    
    return NextResponse.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    return NextResponse.json({
      success: false,
      error: "Erro ao listar usuários do banco john_deere"
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, name, matricula, password_hash, role = 'user' } = data;
    
    if (!email || !name || !matricula || !password_hash) {
      return NextResponse.json({
        success: false,
        error: "Campos obrigatórios: email, name, matricula, password_hash"
      }, { status: 400 });
    }
    
    const result = await query(`
      INSERT INTO users (email, name, matricula, password_hash, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, name, matricula, role, is_active, created_at
    `, [email, name, matricula, password_hash, role]);
    
    return NextResponse.json({
      success: true,
      message: "Usuário criado com sucesso",
      data: result.rows[0]
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);
    
    if (error.code === '23505') {
      return NextResponse.json({
        success: false,
        error: "Email ou matrícula já existe"
      }, { status: 409 });
    }
    
    return NextResponse.json({
      success: false,
      error: "Erro ao criar usuário"
    }, { status: 500 });
  }
}