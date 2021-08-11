import { Body, Controller, Get, Post } from '@nestjs/common';
import { Member } from './member.entity';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';

@Controller()
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get('members')
  getMembers(): Promise<Member[]> {
    const members = this.memberService.getMembers();
    return members;
  }

  @Post('member')
  createMember(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.memberService.createMember(createMemberDto);
    return member;
  }
}
