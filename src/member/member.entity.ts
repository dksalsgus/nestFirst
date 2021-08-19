import { Profile } from '../porfile/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  member_no: number;

  @Column({ unique: true })
  member_id: string;

  @Column()
  member_pw: string;

  @Column()
  member_name: string;

  @Column()
  member_gender: string;

  @Column({ unique: true })
  member_email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @OneToOne((_type) => Profile, (profile) => profile.profile_no)
  profile: Profile;
}
