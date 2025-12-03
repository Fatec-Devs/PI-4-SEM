import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

function isPrismaError(e: unknown): e is { code?: string } {
  return typeof e === "object" && e !== null && "code" in e;
}

export async function GET() {
  try {
    const users = await prisma.user_app.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erro ao listar user_app" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { username, senha, matricula_funcionario } = await request.json();
    const created = await prisma.user_app.create({ data: { username, senha, matricula_funcionario: matricula_funcionario ?? null } });
    return NextResponse.json({ message: "User_app criado com sucesso", created }, { status: 201 });
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === 'P2002') return NextResponse.json({ error: "Username já em uso" }, { status: 409 });
    return NextResponse.json({ error: "Erro ao criar user_app" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id_user_app, username, senha, matricula_funcionario } = await request.json();
    if (!id_user_app) return NextResponse.json({ message: "id_user_app é obrigatório" }, { status: 400 });

    const existing = await prisma.user_app.findUnique({ where: { id_user_app } });
    if (!existing) return NextResponse.json({ message: "User_app não encontrado" }, { status: 404 });

    const updated = await prisma.user_app.update({
      where: { id_user_app },
      data: {
        username: username ?? existing.username,
        senha: senha ?? existing.senha,
        matricula_funcionario: matricula_funcionario ?? existing.matricula_funcionario,
      }
    });

    return NextResponse.json({ message: "User_app atualizado com sucesso", updated }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar user_app" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id_user_app } = await request.json();
    if (!id_user_app) return NextResponse.json({ message: "id_user_app é obrigatório" }, { status: 400 });

    const existing = await prisma.user_app.findUnique({ where: { id_user_app } });
    if (!existing) return NextResponse.json({ message: "User_app não encontrado" }, { status: 404 });

    await prisma.user_app.delete({ where: { id_user_app } });
    return NextResponse.json({ message: "User_app deletado com sucesso" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erro ao deletar user_app" }, { status: 500 });
  }
}
