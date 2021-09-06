import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { Profile } from './profile.entity';
import { MemberService } from '../member/member.service';
import { unlink } from 'fs';

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
    const member = await this.memberService.findByMemberNo(8);
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

  async deleteProfile(profile_no: number): Promise<void> {
    const findProfile = await this.profileRepository.findOne(profile_no);
    if (!findProfile) {
      throw new NotFoundException(`Not Fouond Profile No ${profile_no}`);
    }
    unlink('./uploadFile/' + findProfile.profile_picture, function (err) {
      console.log(err);
    });
    const del = await this.profileRepository.delete(profile_no);
  }

  async detailProfile(profile_no: number): Promise<Profile> {
    const findProfile = await this.profileRepository.findOne(profile_no);
    if (!findProfile) {
      throw new NotFoundException(`Not Found Profile No ${profile_no}`);
    }
    return findProfile;
  }

  async updateProfile(
    profile_no: number,
    profile_nickname: string,
    file: Express.Multer.File,
  ): Promise<Profile> {
    const findProfile = await this.profileRepository.findOne(profile_no);
    if (!findProfile) {
      throw new NotFoundException(`Not Found Profile No ${profile_no}`);
    }

    unlink('./uploadFile/' + findProfile.profile_picture, function (err) {
      console.log(err);
    });

    findProfile.profile_nickname = profile_nickname;
    findProfile.profile_picture = file.originalname;

    const updateProfile = this.profileRepository.save(findProfile);
    return updateProfile;
  }
}
