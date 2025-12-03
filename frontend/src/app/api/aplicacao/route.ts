import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

function isPrismaError(e: unknown): e is { code?: string } {
  return typeof e === "object" && e !== null && "code" in e;
}

export async function GET() {
  try {
    const aplicacoes = await prisma.aplicacao.findMany();
    return NextResponse.json(aplicacoes, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erro ao listar aplicações" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { component_tag, nome, id_time } = data;

    const aplicacao = await prisma.aplicacao.create({
      data: { component_tag, nome, id_time: id_time ?? null }
    });

    return NextResponse.json({ message: "Aplicação criada com sucesso", aplicacao }, { status: 201 });
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return NextResponse.json({ error: "Component tag já está em uso" }, { status: 409 });
    }
    return NextResponse.json({ error: "Erro ao criar aplicação" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id_app, component_tag, nome, id_time } = await request.json();

    if (!id_app) return NextResponse.json({ message: "id_app é obrigatório" }, { status: 400 });

    const existing = await prisma.aplicacao.findUnique({ where: { id_app } });
    if (!existing) return NextResponse.json({ message: "Aplicação não encontrada" }, { status: 404 });

    const updated = await prisma.aplicacao.update({
      where: { id_app },
      data: {
        component_tag: component_tag ?? existing.component_tag,
        nome: nome ?? existing.nome,
        id_time: id_time ?? existing.id_time,
      }
    });

    return NextResponse.json({ message: "Aplicação atualizada com sucesso", updated }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar aplicação" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id_app } = await request.json();
    if (!id_app) return NextResponse.json({ message: "id_app é obrigatório" }, { status: 400 });

    const existing = await prisma.aplicacao.findUnique({ where: { id_app } });
    if (!existing) return NextResponse.json({ message: "Aplicação não encontrada" }, { status: 404 });

    await prisma.aplicacao.delete({ where: { id_app } });
    return NextResponse.json({ message: "Aplicação deletada com sucesso" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erro ao deletar aplicação" }, { status: 500 });
  }
}
