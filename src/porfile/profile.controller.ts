import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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

  @Delete(':profile_no')
  deleteProfile(@Param('profile_no') profile_no: number): Promise<void> {
    return this.porfileService.deleteProfile(profile_no);
  }

  @Get(':profile_no')
  detailProfile(@Param('profile_no') profile_no: number): Promise<Profile> {
    return this.porfileService.detailProfile(profile_no);
  }

  @Patch(':profile_no')
  @UseInterceptors(FileInterceptor('profile_picture'))
  updateProfile(
    @Param('profile_no') profile_no: number,
    @UploadedFile() file: Express.Multer.File,
    @Body('profile_nickname') profile_nickname: string,
  ): Promise<Profile> {
    const updateProfile = this.porfileService.updateProfile(
      profile_no,
      profile_nickname,
      file,
    );
    return updateProfile;
  }
}
