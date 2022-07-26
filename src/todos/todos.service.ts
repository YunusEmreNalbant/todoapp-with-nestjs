import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from '../schemas/todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    return createdTodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.todoModel.updateOne({ id }, { $set: { ...updateTodoDto } });
  }

  async remove(id: number) {
    return this.todoModel.deleteOne({ id });
  }
}
