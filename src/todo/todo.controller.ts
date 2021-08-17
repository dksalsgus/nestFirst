import { Body, Controller, Param, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';
import { MemberService } from '../member/member.service';

@Controller('todo')
export class TodoController {
  constructor(
    private todoService: TodoService,
    private memberService: MemberService,
  ) {}

  @Post(':member_no')
  async createTodo(
    @Param('member_no') member_no: bigint,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    createTodoDto.member = await this.memberService.findByMemberNo(member_no);
    return this.todoService.createTodo(createTodoDto);
  }
}
