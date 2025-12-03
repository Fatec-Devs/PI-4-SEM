import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 400 })
    }

    const user = await prisma.funcionario.findUnique({ where: { username: email } })
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 401 })
    }

    if (user.senha !== password) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 })
    }

    const isAdmin = user.username === "admin@johndeere.com"
    return NextResponse.json({ ok: true, isAdmin, user: { matricula: user.matricula, nome: user.nome, email: user.email, username: user.username } }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Erro na autenticação" }, { status: 500 })
  }
}
