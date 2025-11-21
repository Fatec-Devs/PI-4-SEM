import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';

@Injectable()
export class TimeService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTimeDto) {
    return this.prisma.time.create({ data: dto as any });
  }

  findAll() {
    return this.prisma.time.findMany();
  }

  async findOne(id: number) {
    const t = await this.prisma.time.findUnique({ where: { id_time: id } });
    if (!t) throw new NotFoundException('Time not found');
    return t;
  }

  async update(id: number, dto: UpdateTimeDto) {
    await this.findOne(id);
    return this.prisma.time.update({ where: { id_time: id }, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.time.delete({ where: { id_time: id } });
  }
}
