import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const grupos = await prisma.grupo.findMany();
    return NextResponse.json(grupos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao listar grupos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { nome } = await request.json();
    const created = await prisma.grupo.create({ data: { nome } });
    return NextResponse.json({ message: "Grupo criado com sucesso", created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar grupo" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id_grupo, nome } = await request.json();
    if (!id_grupo) return NextResponse.json({ message: "id_grupo é obrigatório" }, { status: 400 });

    const existing = await prisma.grupo.findUnique({ where: { id_grupo } });
    if (!existing) return NextResponse.json({ message: "Grupo não encontrado" }, { status: 404 });

    const updated = await prisma.grupo.update({ where: { id_grupo }, data: { nome: nome ?? existing.nome } });
    return NextResponse.json({ message: "Grupo atualizado com sucesso", updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar grupo" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id_grupo } = await request.json();
    if (!id_grupo) return NextResponse.json({ message: "id_grupo é obrigatório" }, { status: 400 });

    const existing = await prisma.grupo.findUnique({ where: { id_grupo } });
    if (!existing) return NextResponse.json({ message: "Grupo não encontrado" }, { status: 404 });

    await prisma.grupo.delete({ where: { id_grupo } });
    return NextResponse.json({ message: "Grupo deletado com sucesso" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar grupo" }, { status: 500 });
  }
}
