import { IsNumber, IsString } from 'class-validator';

export class CreateProfileDto {
  // @IsNumber()
  // profile_no: number;

  @IsString()
  profile_picture: string;

  @IsString()
  profile_nickname: string;
}
