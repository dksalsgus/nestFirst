import { Module } from '@nestjs/common';
import { PorfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileRepository]), MemberModule],
  providers: [PorfileService],
  controllers: [ProfileController],
})
export class PorfileModule {}
