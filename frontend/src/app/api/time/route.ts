import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const times = await prisma.time.findMany();
    return NextResponse.json(times, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao listar times" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { nome, id_grupo, pdl } = await request.json();
    const created = await prisma.time.create({ data: { nome, id_grupo: id_grupo ?? null, pdl: pdl ?? null } });
    return NextResponse.json({ message: "Time criado com sucesso", created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar time" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id_time, nome, id_grupo, pdl } = await request.json();
    if (!id_time) return NextResponse.json({ message: "id_time é obrigatório" }, { status: 400 });

    const existing = await prisma.time.findUnique({ where: { id_time } });
    if (!existing) return NextResponse.json({ message: "Time não encontrado" }, { status: 404 });

    const updated = await prisma.time.update({
      where: { id_time },
      data: {
        nome: nome ?? existing.nome,
        id_grupo: id_grupo ?? existing.id_grupo,
        pdl: pdl ?? existing.pdl,
      }
    });

    return NextResponse.json({ message: "Time atualizado com sucesso", updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar time" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id_time } = await request.json();
    if (!id_time) return NextResponse.json({ message: "id_time é obrigatório" }, { status: 400 });

    const existing = await prisma.time.findUnique({ where: { id_time } });
    if (!existing) return NextResponse.json({ message: "Time não encontrado" }, { status: 404 });

    await prisma.time.delete({ where: { id_time } });
    return NextResponse.json({ message: "Time deletado com sucesso" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar time" }, { status: 500 });
  }
}
