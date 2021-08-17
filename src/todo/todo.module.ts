import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './todo.repository';

@Module({
  imports:[TypeOrmModule.forFeature([TodoRepository])],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
