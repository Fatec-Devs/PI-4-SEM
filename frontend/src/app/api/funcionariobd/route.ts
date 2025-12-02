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

    const {matricula, nome, email, username, senha, id_time} = await req.json();

    if (!matricula){
        return NextResponse.json({ message: "Matricula é obrigatória"})
    }

    if (!nome && !email && !username && !senha && !id_time){
        return NextResponse.json({ message: "Pelo menos um campo deve ser fornecido para atualização"})
    }

    const funcionario = await prisma.funcionario.findUnique({
        where: {matricula}
    })

    if (!funcionario){
        return NextResponse.json(
            { message: "Funcionário não encontrado"}, { status: 404}
        )
    }

    await prisma.funcionario.update({
        where: { matricula },
        data: {
            nome: nome || funcionario.nome,
    }})
}

export async function DELETE(req: Request) {
    const {matricula} = await req.json();

    const funcionario = await prisma.funcionario.findUnique({
        where: {matricula}
    })

    if(!funcionario){
        return NextResponse.json(
        {message: "Funcionário não encontrado"},
        {status: 404}
    )
    }

    await prisma.funcionario.delete({
        where: {matricula}
    });

    return NextResponse.json({message: "Funcionário deletado com sucesso"}, {status: 200});
}