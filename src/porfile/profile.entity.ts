import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from '../member/member.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  profile_no: number;

  @Column({ nullable: true, length: 50 })
  profile_picture: string;

  @Column({ nullable: true, length: 20 })
  profile_nickname: string;

  @OneToOne((_type) => Member, (member) => member.member_no)
  @JoinColumn()
  member: Member;
}
