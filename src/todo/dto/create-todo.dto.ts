import { Member } from 'src/member/member.entity';

export class CreateTodoDto {
  todo_kind: string;

  todo_title: string;

  todo_content: string;

  member: Member;
}
