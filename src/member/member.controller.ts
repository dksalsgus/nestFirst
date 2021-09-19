import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Render,
} from '@nestjs/common';
import { Member } from './member.entity';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { LoginMemberDto } from './dto/login-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Render('index')
  @Get('list')
  getMembers(): Promise<Member[]> {
    const members = this.memberService.getMembers();
    return members;
  }

  @Post()
  createMember(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.memberService.createMember(createMemberDto);
    return member;
  }

  @Get(':member_no')
  findById(@Param('member_no') member_no: number): Promise<Member> {
    const findMember = this.memberService.findByMemberNo(member_no);
    return findMember;
  }

  @Post('login')
  loginMember(@Body() loginMemberDto: LoginMemberDto): Promise<Member> {
    const member = this.memberService.loginMember(loginMemberDto);
    return member;
  }

  @Patch(':member_no')
  updateMember(
    @Param('member_no') member_no: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    const member = this.memberService.updateMember(member_no, updateMemberDto);
    return member;
  }

  @Delete(':member_no')
  deleteMember(@Param('member_no') member_no: number): Promise<void> {
    return this.memberService.deleteMember(member_no);
  }
}
