import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { CreateAplicacaoDto } from './dto/create-aplicacao.dto.js';
import { UpdateAplicacaoDto } from './dto/update-aplicacao.dto.js';

@Injectable()
export class AplicacaoService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateAplicacaoDto) {
    return this.prisma.aplicacao.create({ data: dto as any });
  }

  findAll() {
    return this.prisma.aplicacao.findMany();
  }

  async findOne(id: number) {
    const a = await this.prisma.aplicacao.findUnique({ where: { id_app: id } });
    if (!a) throw new NotFoundException('Aplicacao not found');
    return a;
  }

  async update(id: number, dto: UpdateAplicacaoDto) {
    await this.findOne(id);
    return this.prisma.aplicacao.update({ where: { id_app: id }, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.aplicacao.delete({ where: { id_app: id } });
  }
}
