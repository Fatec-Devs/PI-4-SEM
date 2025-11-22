import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { CreateGrupoDto } from './dto/create-grupo.dto.js';
import { UpdateGrupoDto } from './dto/update-grupo.dto.js';

@Injectable()
export class GrupoService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateGrupoDto) {
    return this.prisma.grupo.create({ data: dto as any });
  }

  findAll() {
    return this.prisma.grupo.findMany();
  }

  async findOne(id: number) {
    const g = await this.prisma.grupo.findUnique({ where: { id_grupo: id } });
    if (!g) throw new NotFoundException('Grupo not found');
    return g;
  }

  async update(id: number, dto: UpdateGrupoDto) {
    await this.findOne(id);
    return this.prisma.grupo.update({ where: { id_grupo: id }, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.grupo.delete({ where: { id_grupo: id } });
  }
}
