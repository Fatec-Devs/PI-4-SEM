import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserAppService } from './user_app.service';
import { CreateUserAppDto } from './dto/create-user_app.dto';
import { UpdateUserAppDto } from './dto/update-user_app.dto';

@Controller('user-apps')
export class UserAppController {
  constructor(private readonly service: UserAppService) {}

  @Post()
  create(@Body() dto: CreateUserAppDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateUserAppDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
