import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { Profile } from './profile.entity';
import { MemberService } from '../member/member.service';

@Injectable()
export class PorfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
    private memberService: MemberService,
  ) {}

  async createProfile(
    file: Express.Multer.File,
    profile_nickname: string,
  ): Promise<Profile> {
    const member = await await this.memberService.findByMemberNo(8);
    const newProfile = await this.profileRepository.create({
      profile_nickname: profile_nickname,
      profile_picture: file.originalname,
      member: member,
    });
    if (!newProfile) {
      throw new BadRequestException();
    }
    const saveProfile = await this.profileRepository.save(newProfile);
    return saveProfile;
  }
}
