import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 400 })
    }

    // Buscar usuário por username ou email
    const user = await prisma.employee.findFirst({ 
      where: { 
        OR: [
          { username: email },
          { email: email }
        ]
      } 
    })
    
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 401 })
    }

    // Verificar status do usuário
    if (user.status !== "ACTIVE") {
      return NextResponse.json({ error: "Usuário inativo" }, { status: 401 })
    }

    // Verificar senha com bcrypt
    const passwordMatch = await bcrypt.compare(password, user.passwordHash)
    
    if (!passwordMatch) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 })
    }

    // Verificar se a senha expirou
    if (user.passwordExpiresAt && new Date() > user.passwordExpiresAt) {
      return NextResponse.json({ 
        error: "Senha expirada", 
        passwordExpired: true 
      }, { status: 401 })
    }

    // Atualizar último login
    await prisma.employee.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    })

    const isAdmin = user.role === "ADMIN"
    
    return NextResponse.json({ 
      ok: true, 
      isAdmin, 
      user: { 
        id: user.id,
        matricula: user.matricula, 
        nome: user.nome, 
        email: user.email, 
        username: user.username,
        role: user.role
      } 
    }, { status: 200 })
    
  } catch (error) {
    console.error("Erro na autenticação:", error)
    return NextResponse.json({ error: "Erro na autenticação" }, { status: 500 })
  }
}
