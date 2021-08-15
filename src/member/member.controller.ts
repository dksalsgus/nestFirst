import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Member } from './member.entity';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { LoginMemberDto } from './dto/login-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

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

  @Patch('member/:member_id')
  updateMember(
    @Param('member_id') member_id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    const member = this.memberService.updateMember(member_id, updateMemberDto);
    return member;
  }

  @Delete('member/:member_id')
  deleteMember(@Param('member_id') member_id: string): Promise<void> {
    return this.memberService.deleteMember(member_id);
  }
}
