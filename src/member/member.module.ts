import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberRepository } from './member.repository';

@Module({
  providers: [MemberService],
  controllers: [MemberController],
  imports: [TypeOrmModule.forFeature([MemberRepository])],
  exports: [MemberService],
})
export class MemberModule {}
