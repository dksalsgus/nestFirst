import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('increment')
  member_no: bigint;

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
}
