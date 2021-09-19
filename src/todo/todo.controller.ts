import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Render,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';
import { MemberService } from '../member/member.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(
    private todoService: TodoService,
    private memberService: MemberService,
  ) {}

  @Post(':member_no')
  createTodo(
    @Param('member_no') member_no: number,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return this.todoService.createTodo(member_no, createTodoDto);
  }

  @Render('index')
  @Get('list/:member_no')
  listTodo(@Param('member_no') member_no: number): Promise<Todo[]> {
    const todos = this.todoService.getTodos(member_no);
    return todos;
  }

  @Get(':todo_no')
  findByTodoNo(@Param('todo_no') todo_no: number): Promise<Todo> {
    const todo = this.todoService.findByTodoNo(todo_no);
    return todo;
  }

  @Delete(':todo_no')
  deleteTodo(@Param('todo_no') todo_no: number): Promise<void> {
    return this.todoService.deleteTodo(todo_no);
  }

  @Patch(':todo_no')
  updateTodo(
    @Param('todo_no') todo_no: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    const updateTodo = this.todoService.updateTodo(todo_no, updateTodoDto);
    return updateTodo;
  }
}
