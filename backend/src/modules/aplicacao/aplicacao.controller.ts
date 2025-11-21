import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AplicacaoService } from './aplicacao.service';
import { CreateAplicacaoDto } from './dto/create-aplicacao.dto';
import { UpdateAplicacaoDto } from './dto/update-aplicacao.dto';

@Controller('aplicacoes')
export class AplicacaoController {
  constructor(private readonly service: AplicacaoService) {}

  @Post()
  create(@Body() dto: CreateAplicacaoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAplicacaoDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
