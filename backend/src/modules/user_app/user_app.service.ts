import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../..//prisma/prisma.service.js';
import { CreateUserAppDto } from './dto/create-user_app.dto.js';
import { UpdateUserAppDto } from './dto/update-user_app.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserAppService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserAppDto) {
    const data: any = { ...dto };
    if (dto.senha) {
      data.senha = await bcrypt.hash(dto.senha, 10);
    }
    return this.prisma.user_app.create({ data });
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
    const data: any = { ...dto };
    if (dto.senha) {
      data.senha = await bcrypt.hash(dto.senha, 10);
    }
    return this.prisma.user_app.update({ where: { id_user_app: id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.user_app.delete({ where: { id_user_app: id } });
  }
}
