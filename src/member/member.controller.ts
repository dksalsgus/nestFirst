import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Member } from './member.entity';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { LoginMemberDto } from './dto/login-member.dto';

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

  @Get('member/:member_id')
  findById(@Param('member_id') member_id: string): Promise<Member> {
    const findMember = this.memberService.findByMemberId(member_id);
    return findMember;
  }

  @Post('login')
  loginMember(@Body() loginMemberDto: LoginMemberDto): Promise<Member> {
    const member = this.memberService.loginMember(loginMemberDto);
    return member;
  }
}
