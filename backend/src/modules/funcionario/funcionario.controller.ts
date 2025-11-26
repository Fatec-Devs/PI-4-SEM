import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service.js';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto.js';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto.js';

@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly service: FuncionarioService) {
    // constructor injection handled by Nest
  }

  @Post()
  create(@Body() dto: CreateFuncionarioDto) {
      console.log("Recebido no controller:", dto);
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':matricula')
  findOne(@Param('matricula') matricula: string) {
    return this.service.findOne(matricula);
  }

  @Put(':matricula')
  update(@Param('matricula') matricula: string, @Body() dto: UpdateFuncionarioDto) {
    return this.service.update(matricula, dto);
  }

  @Delete(':matricula')
  remove(@Param('matricula') matricula: string) {
    return this.service.remove(matricula);
  }
}
