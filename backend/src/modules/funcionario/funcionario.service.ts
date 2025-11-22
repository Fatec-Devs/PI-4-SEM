import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto.js';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto.js';

@Injectable()
export class FuncionarioService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateFuncionarioDto) {
    return this.prisma.funcionario.create({ data: dto as any });
  }

  findAll() {
    return this.prisma.funcionario.findMany();
  }

  async findOne(matricula: string) {
    const f = await this.prisma.funcionario.findUnique({ where: { matricula } });
    if (!f) throw new NotFoundException('Funcionario not found');
    return f;
  }

  async update(matricula: string, dto: UpdateFuncionarioDto) {
    await this.findOne(matricula);
    return this.prisma.funcionario.update({ where: { matricula }, data: dto as any });
  }

  async remove(matricula: string) {
    await this.findOne(matricula);
    return this.prisma.funcionario.delete({ where: { matricula } });
  }
}
