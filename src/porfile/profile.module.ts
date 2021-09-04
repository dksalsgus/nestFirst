import { Module } from '@nestjs/common';
import { PorfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { MemberModule } from '../member/member.module';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileRepository]),
    MemberModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: multer.diskStorage({
          destination(req, file, cb) {
            cb(null, './uploadFile');
          },
          filename(req, file, cb) {
            cb(null, file.originalname);
          },
        }),
      }),
    }),
  ],
  providers: [PorfileService],
  controllers: [ProfileController],
})
export class PorfileModule {}
