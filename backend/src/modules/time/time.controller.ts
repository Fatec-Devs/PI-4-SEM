import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TimeService } from './time.service.js';
import { CreateTimeDto } from './dto/create-time.dto.js';
import { UpdateTimeDto } from './dto/update-time.dto.js';

@Controller('times')
export class TimeController {
  constructor(private readonly service: TimeService) {}

  @Post()
  create(@Body() dto: CreateTimeDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateTimeDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
