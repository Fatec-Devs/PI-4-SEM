import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { encrypt, decrypt } from "../../..//lib/crypto";

function isPrismaError(e: unknown): e is { code?: string } {
  return typeof e === "object" && e !== null && "code" in e;
}

// ==================== GET ====================
export async function GET() {
  try {
    const funcionarios = await prisma.funcionario.findMany();

    // Descriptografar senha antes de retornar
    const funcionariosComSenha = funcionarios.map(f => {
      // Parse the encrypted string to object
      let senhaDescriptografada = "";
      try {
        const senhaObj = JSON.parse(f.senha);
        senhaDescriptografada = decrypt(senhaObj);
      } catch {
        senhaDescriptografada = "";
      }
      return {
        ...f,
        senha: senhaDescriptografada
      };
    });

    return NextResponse.json(funcionariosComSenha, { status: 200 });

  } catch {
    return NextResponse.json(
      { error: "Erro ao listar funcionários" }, 
      { status: 500 }
    );
  }
}

// ==================== POST ====================
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { matricula, nome, email, username, senha } = data;

    const senhaCriptografada = JSON.stringify(encrypt(senha));

    const funcionario = await prisma.funcionario.create({
      data: {
        matricula,
        nome,
        username,
        senha: senhaCriptografada,
        email
      }
    });

    return NextResponse.json(
      { message: "Funcionário criado com sucesso", funcionario },
      { status: 201 }
    );

  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return NextResponse.json(
        { error: "Username já está em uso" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao criar funcionário" },
      { status: 500 }
    );
  }
}

// ==================== PUT ====================
export async function PUT(req: Request) {
  try {
    const { matricula, nome, email, username, senha } = await req.json();

    if (!matricula) {
      return NextResponse.json({ message: "Matricula é obrigatória" });
    }

    const funcionario = await prisma.funcionario.findUnique({
      where: { matricula }
    });

    if (!funcionario) {
      return NextResponse.json(
        { message: "Funcionário não encontrado" },
        { status: 404 }
      );
    }

    let senhaAtualizada = funcionario.senha;
    if (senha) {
      senhaAtualizada = JSON.stringify(encrypt(senha));
    }

    const funcionarioAtualizado = await prisma.funcionario.update({
      where: { matricula },
      data: {
        nome: nome ?? funcionario.nome,
        email: email ?? funcionario.email,
        username: username ?? funcionario.username,
        senha: senhaAtualizada,
      }
    });

    return NextResponse.json(
      { message: "Funcionário atualizado com sucesso", funcionarioAtualizado },
      { status: 200 }
    );

  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar funcionário" },
      { status: 500 }
    );
  }
}

// ==================== DELETE ====================
export async function DELETE(req: Request) {
  try {
    const { matricula } = await req.json();

    const funcionario = await prisma.funcionario.findUnique({
      where: { matricula }
    });

    if (!funcionario) {
      return NextResponse.json(
        { message: "Funcionário não encontrado" },
        { status: 404 }
      );
    }

    await prisma.funcionario.delete({
      where: { matricula }
    });

    return NextResponse.json(
      { message: "Funcionário deletado com sucesso" },
      { status: 200 }
    );

  } catch {
    return NextResponse.json(
      { error: "Erro ao deletar funcionário" },
      { status: 500 }
    );
  }
}
