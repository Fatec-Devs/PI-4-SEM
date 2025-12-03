import { NextResponse } from "next/server";
import { query } from "../../../../lib/database";

// GET - Listar todos os times do schema john_deere
export async function GET() {
  try {
    const result = await query(`
      SELECT id, name, description, is_active, created_at, updated_at
      FROM teams
      ORDER BY name ASC
    `);
    
    return NextResponse.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    }, { status: 200 });
    
  } catch (error) {
    console.error('Erro ao listar times:', error);
    return NextResponse.json({
      success: false,
      error: "Erro ao listar times do banco john_deere"
    }, { status: 500 });
  }
}

// POST - Criar novo time no schema john_deere
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description } = data;
    
    if (!name) {
      return NextResponse.json({
        success: false,
        error: "Nome do time é obrigatório"
      }, { status: 400 });
    }
    
    const result = await query(`
      INSERT INTO teams (name, description)
      VALUES ($1, $2)
      RETURNING id, name, description, is_active, created_at
    `, [name, description || null]);
    
    return NextResponse.json({
      success: true,
      message: "Time criado com sucesso",
      data: result.rows[0]
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Erro ao criar time:', error);
    
    return NextResponse.json({
      success: false,
      error: "Erro ao criar time"
    }, { status: 500 });
  }
}