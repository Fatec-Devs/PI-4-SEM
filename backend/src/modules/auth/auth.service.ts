import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(username: string, senha: string) {
    const user = await this.prisma.user_app.findUnique({ where: { username } });
    if (!user) return null;
    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return null;
    // remove senha before returning
    // @ts-ignore
    const { senha: _s, ...rest } = user;
    return rest;
  }

  async login(username: string, senha: string) {
    const user = await this.validateUser(username, senha);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return { ok: true, user };
  }
}
