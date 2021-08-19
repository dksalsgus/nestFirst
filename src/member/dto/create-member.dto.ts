import { IsEmail, IsString } from 'class-validator';

export class CreateMemberDto {
  member_no: number;

  @IsString()
  member_id: string;

  @IsString()
  member_pw: string;

  @IsString()
  member_name: string;

  @IsString()
  member_gender: string;

  @IsEmail()
  member_email: string;
}
