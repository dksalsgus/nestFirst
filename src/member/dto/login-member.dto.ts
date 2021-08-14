import { IsString } from 'class-validator';

export class LoginMemberDto {
  @IsString()
  member_id: string;
  @IsString()
  member_pw: string;
}
