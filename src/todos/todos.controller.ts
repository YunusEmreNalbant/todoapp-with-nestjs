import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Response } from 'express';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  getTodos() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const res = await this.todosService.update(+id, updateTodoDto);

    if (!res.acknowledged) {
      return response.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        message: 'Güncelleme başarısız!',
      });
    }
    return response.status(HttpStatus.OK).send({
      success: true,
      message: 'Güncelleme başarılı!',
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
