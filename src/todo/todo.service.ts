import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from './todo.repository';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { MemberRepository } from '../member/member.repository';
import { MemberService } from '../member/member.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { getManager, Transaction } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
    private memberService: MemberService,
  ) {}

  async createTodo(
    member_no: number,
    createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    const member = await this.memberService.findByMemberNo(member_no);
    if (!member) {
      throw new NotFoundException(`Not Found member_no  = ${member_no}`);
    }
    createTodoDto.member = member;
    const createTodo = await this.todoRepository.create(createTodoDto);
    const saveTodo = await this.todoRepository.save(createTodo);
    return saveTodo;
  }

  async getTodos(member_no: number): Promise<Todo[]> {
    const member = await this.memberService.findByMemberNo(member_no);
    if (!member) {
      throw new NotFoundException(`Not Found member_no = ${member_no}`);
    }
    const todos = await this.todoRepository.find({ member });
    return todos;
  }

  async findByTodoNo(todo_no: number): Promise<Todo> {
    const findTodo = await this.todoRepository.findOne({ todo_no });
    if (!findTodo) {
      throw new NotFoundException(`Not Found todo_no = ${todo_no}`);
    }
    return findTodo;
  }

  async deleteTodo(todo_no: number): Promise<void> {
    await this.todoRepository.delete(todo_no);
  }

  async updateTodo(
    todo_no: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    // await getManager().transaction(async (transactionentityManager) => {
    //   await transactionentityManager.save(findTodo);
    // });
    const findTodo = await this.findByTodoNo(todo_no);
    if (!findTodo) {
      throw new NotFoundException(`Not Found todo_no =${todo_no}`);
    }
    findTodo.todo_kind = updateTodoDto.todo_kind;
    findTodo.todo_title = updateTodoDto.todo_title;
    findTodo.todo_content = updateTodoDto.todo_content;
    const updateTodo = await this.todoRepository.save(findTodo);
    return updateTodo;
  }
}
