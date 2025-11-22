import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { CreateUserAppDto } from './dto/create-user_app.dto.js';
import { UpdateUserAppDto } from './dto/update-user_app.dto.js';

@Injectable()
export class UserAppService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUserAppDto) {
    return this.prisma.user_app.create({ data: dto as any });
  }

  findAll() {
    return this.prisma.user_app.findMany();
  }

  async findOne(id: number) {
    const u = await this.prisma.user_app.findUnique({ where: { id_user_app: id } });
    if (!u) throw new NotFoundException('User app not found');
    return u;
  }

  async update(id: number, dto: UpdateUserAppDto) {
    await this.findOne(id);
    return this.prisma.user_app.update({ where: { id_user_app: id }, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.user_app.delete({ where: { id_user_app: id } });
  }
}
