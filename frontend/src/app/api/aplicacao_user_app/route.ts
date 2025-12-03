import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

function isPrismaError(e: unknown): e is { code?: string } {
  return typeof e === "object" && e !== null && "code" in e;
}

// GET all
export async function GET() {
  try {
    const items = await prisma.aplicacao_user_app.findMany();
    return NextResponse.json(items, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erro ao listar aplicações-usuário" }, { status: 500 });
  }
}

// POST create relation
export async function POST(request: Request) {
  try {
    const { id_app, id_user_app } = await request.json();
    const created = await prisma.aplicacao_user_app.create({ data: { id_app, id_user_app } });
    return NextResponse.json({ message: "Relação criada com sucesso", created }, { status: 201 });
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === 'P2002') {
      return NextResponse.json({ error: "Relação já existe" }, { status: 409 });
    }
    return NextResponse.json({ error: "Erro ao criar relação" }, { status: 500 });
  }
}

// PUT: update composite keys by performing delete+create transaction
export async function PUT(request: Request) {
  try {
    const { oldIdApp, oldIdUserApp, newIdApp, newIdUserApp } = await request.json();
    if (!oldIdApp || !oldIdUserApp) return NextResponse.json({ message: "oldIdApp e oldIdUserApp são obrigatórios" }, { status: 400 });

    // If no new keys provided, nothing to do
    if (!newIdApp && !newIdUserApp) return NextResponse.json({ message: "Nenhum novo valor fornecido" }, { status: 400 });

    await prisma.$transaction([
      prisma.aplicacao_user_app.delete({ where: { id_app_id_user_app: { id_app: oldIdApp, id_user_app: oldIdUserApp } } }),
      prisma.aplicacao_user_app.create({ data: { id_app: newIdApp ?? oldIdApp, id_user_app: newIdUserApp ?? oldIdUserApp } })
    ]);

    return NextResponse.json({ message: "Relação atualizada com sucesso" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar relação" }, { status: 500 });
  }
}

// DELETE relation
export async function DELETE(request: Request) {
  try {
    const { id_app, id_user_app } = await request.json();
    if (!id_app || !id_user_app) return NextResponse.json({ message: "id_app e id_user_app são obrigatórios" }, { status: 400 });

    await prisma.aplicacao_user_app.delete({ where: { id_app_id_user_app: { id_app, id_user_app } } });
    return NextResponse.json({ message: "Relação deletada com sucesso" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erro ao deletar relação" }, { status: 500 });
  }
}
