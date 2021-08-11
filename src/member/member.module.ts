import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberRepository } from './nenber.repository';

@Module({
  providers: [MemberService],
  controllers: [MemberController],
  imports: [TypeOrmModule.forFeature([MemberRepository])],
})
export class MemberModule {}
