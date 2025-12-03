import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

function isPrismaError(e: unknown): e is { code?: string } {
  return typeof e === "object" && e !== null && "code" in e;
}

export async function GET() {
  try {
    const items = await prisma.funcionario_grupo.findMany();
    return NextResponse.json(items, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erro ao listar vínculo funcionário-grupo" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { matricula_funcionario, id_grupo } = await request.json();
    const created = await prisma.funcionario_grupo.create({ data: { matricula_funcionario, id_grupo } });
    return NextResponse.json({ message: "Vínculo criado com sucesso", created }, { status: 201 });
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === 'P2002') return NextResponse.json({ error: "Vínculo já existe" }, { status: 409 });
    return NextResponse.json({ error: "Erro ao criar vínculo" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { oldMatricula, oldIdGrupo, newMatricula, newIdGrupo } = await request.json();
    if (!oldMatricula || !oldIdGrupo) return NextResponse.json({ message: "oldMatricula e oldIdGrupo são obrigatórios" }, { status: 400 });

    if (!newMatricula && !newIdGrupo) return NextResponse.json({ message: "Nenhum novo valor fornecido" }, { status: 400 });

    await prisma.$transaction([
      prisma.funcionario_grupo.delete({ where: { matricula_funcionario_id_grupo: { matricula_funcionario: oldMatricula, id_grupo: oldIdGrupo } } }),
      prisma.funcionario_grupo.create({ data: { matricula_funcionario: newMatricula ?? oldMatricula, id_grupo: newIdGrupo ?? oldIdGrupo } })
    ]);

    return NextResponse.json({ message: "Vínculo atualizado com sucesso" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar vínculo" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { matricula_funcionario, id_grupo } = await request.json();
    if (!matricula_funcionario || !id_grupo) return NextResponse.json({ message: "matricula_funcionario e id_grupo são obrigatórios" }, { status: 400 });

    await prisma.funcionario_grupo.delete({ where: { matricula_funcionario_id_grupo: { matricula_funcionario, id_grupo } } });
    return NextResponse.json({ message: "Vínculo deletado com sucesso" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erro ao deletar vínculo" }, { status: 500 });
  }
}
