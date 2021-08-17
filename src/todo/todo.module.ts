import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './todo.repository';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepository]), MemberModule],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
