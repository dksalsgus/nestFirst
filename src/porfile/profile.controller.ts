import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PorfileService } from './profile.service';
import { Profile } from './profile.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class ProfileController {
  constructor(private porfileService: PorfileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profile_picture'))
  createProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body('profile_nickname') profile_nickname: string,
  ): Promise<Profile> {
    const profile = this.porfileService.createProfile(file, profile_nickname);
    return profile;
  }
}
