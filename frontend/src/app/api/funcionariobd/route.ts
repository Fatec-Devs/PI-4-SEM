import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const funcionarios = await prisma.funcionario.findMany({
      select: {
        matricula: true,
        nome: true,
        email: true,
        username: true
      }
    });

    return NextResponse.json(funcionarios, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao listar funcionarios" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
    try {
        const data = await request.json();

        const { matricula, nome, email, username, senha } = data;

        const funcionario = await prisma.funcionario.create({
            data: {
                matricula,
                nome,
                username,
                senha,
                email
            }
        });

        return NextResponse.json(
            {message: "Funcionário criado com sucesso", funcionario},
            {status: 201}
        )
    } catch (error: any){
          if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Username já está em uso" },
        { status: 409 }
      );
    }
        return NextResponse.json(
            {error: "Erro ao criar funcionário"},
            {status: 500}
        );
    }
}

export async function PUT(req: Request) {
    const {matricula, nome, email, username, senha} = await req.json();

    if (!matricula){
        return NextResponse.json({ message: "Matricula é obrigatória"}, { status: 400 })
    }

    const funcionario = await prisma.funcionario.findUnique({ where: { matricula } })
    if (!funcionario){
        return NextResponse.json({ message: "Funcionário não encontrado"}, { status: 404 })
    }

    try {
      const updated = await prisma.funcionario.update({
        where: { matricula },
        data: {
          nome: nome ?? funcionario.nome,
          email: email ?? funcionario.email,
          username: username ?? funcionario.username,
          senha: senha ?? funcionario.senha,
        }
      })
      return NextResponse.json({ message: "Funcionário atualizado com sucesso", funcionario: updated }, { status: 200 })
    } catch (error: any) {
      if (error.code === "P2002") {
        return NextResponse.json({ error: "Username já está em uso" }, { status: 409 })
      }
      return NextResponse.json({ error: "Erro ao atualizar funcionário" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    const {matricula, matriculas} = await req.json();

    // Exclusão em massa
    if (matriculas && Array.isArray(matriculas) && matriculas.length > 0) {
        try {
            // Verificar se todos os funcionários existem
            const funcionarios = await prisma.funcionario.findMany({
                where: {
                    matricula: {
                        in: matriculas
                    }
                }
            });

            if (funcionarios.length !== matriculas.length) {
                return NextResponse.json(
                    { error: "Alguns funcionários não foram encontrados" },
                    { status: 404 }
                );
            }

            // Deletar funcionários e suas associações (cascade via foreign keys)
            await prisma.funcionario_grupo.deleteMany({
                where: {
                    matricula_funcionario: {
                        in: matriculas
                    }
                }
            });

            await prisma.user_app.deleteMany({
                where: {
                    matricula_funcionario: {
                        in: matriculas
                    }
                }
            });

            const deletedCount = await prisma.funcionario.deleteMany({
                where: {
                    matricula: {
                        in: matriculas
                    }
                }
            });

            return NextResponse.json({
                message: `${deletedCount.count} funcionários deletados com sucesso`,
                deletedCount: deletedCount.count
            }, { status: 200 });

        } catch (error) {
            console.error('Erro na exclusão em massa:', error);
            return NextResponse.json(
                { error: "Erro ao deletar funcionários em massa" },
                { status: 500 }
            );
        }
    }

    // Exclusão individual
    if (!matricula) {
        return NextResponse.json(
            { error: "Matrícula é obrigatória" },
            { status: 400 }
        );
    }

    const funcionario = await prisma.funcionario.findUnique({
        where: {matricula}
    })

    if(!funcionario){
        return NextResponse.json(
        {message: "Funcionário não encontrado"},
        {status: 404}
    )
    }

    // Deletar associações primeiro
    await prisma.funcionario_grupo.deleteMany({
        where: { matricula_funcionario: matricula }
    });

    await prisma.user_app.deleteMany({
        where: { matricula_funcionario: matricula }
    });

    await prisma.funcionario.delete({
        where: {matricula}
    });

    return NextResponse.json({message: "Funcionário deletado com sucesso"}, {status: 200});
}
