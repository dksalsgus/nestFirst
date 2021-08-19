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
  @OneToOne((_tpye) => Member, (member) => member.member_no)
  @JoinColumn()
  profile_no: number;

  @Column({ nullable: true, length: 50 })
  profile_picture: string;

  @Column({ nullable: true, length: 20 })
  profile_nickname: string;
}
