import { Member } from 'src/member/member.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  todo_no: number;

  @Column({ nullable: false, length: 20 })
  todo_kind: string;

  @Column({ nullable: false, length: 50 })
  todo_title: string;

  @Column({ length: 200 })
  todo_content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne((_type) => Member, (member) => member.member_no, {
    eager: false,
    lazy: false,
  })
  member: Member;
}
