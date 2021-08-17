import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from './todo.repository';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createTodo = await this.todoRepository.create(createTodoDto);
    const saveTodo = await this.todoRepository.save(createTodo);
    return saveTodo;
  }
}
