import { NextResponse } from "next/server";
import { query } from "../../../../lib/database";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, password } = data;
    
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: "Email e senha são obrigatórios"
      }, { status: 400 });
    }
    
    // Buscar usuário por email
    const result = await query(`
      SELECT id, email, name, matricula, password_hash, role, is_active, last_login_at
      FROM users
      WHERE email = $1 AND is_active = true
      LIMIT 1
    `, [email]);
    
    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: "Usuário não encontrado ou inativo"
      }, { status: 404 });
    }
    
    const user = result.rows[0];
    
    // Verificar senha (comparação direta - em produção use hash seguro)
    if (user.password_hash !== password) {
      return NextResponse.json({
        success: false,
        error: "Senha incorreta"
      }, { status: 401 });
    }
    
    // Atualizar último login
    await query(`
      UPDATE users 
      SET last_login_at = NOW() 
      WHERE id = $1
    `, [user.id]);
    
    return NextResponse.json({
      success: true,
      message: "Login realizado com sucesso",
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          matricula: user.matricula,
          role: user.role,
          last_login_at: user.last_login_at
        }
      }
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Erro ao autenticar usuário:', error);
    
    return NextResponse.json({
      success: false,
      error: "Erro ao autenticar usuário"
    }, { status: 500 });
  }
}