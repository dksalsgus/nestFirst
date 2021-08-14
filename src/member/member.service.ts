import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './member.entity';
import { MemberRepository } from './nenber.repository';
import { CreateMemberDto } from './dto/create-member.dto';
import * as bcrypt from 'bcrypt';
import { LoginMemberDto } from './dto/login-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberRepository)
    private memberRepository: MemberRepository,
  ) {}

  async getMembers(): Promise<Member[]> {
    const members = await this.memberRepository.find();
    if (!members) {
      throw new NotFoundException('Not Found Members');
    }
    return members;
  }

  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    const createMember = await this.memberRepository.create(createMemberDto);
    const hashPw = await bcrypt.hash(createMember.member_pw, 10);
    createMember.member_pw = hashPw;

    const saveMember = await this.memberRepository.save(createMember);
    if (!saveMember) {
      console.log(`Don't save ${createMember}`);
      return;
    }
    return saveMember;
  }

  async findByMemberId(member_id: string): Promise<Member> {
    const findMember = this.memberRepository.findOne({ member_id });
    if (!findMember) {
      throw new NotFoundException(`Not found ${member_id}`);
    }
    return findMember;
  }

  async loginMember(loginMemberDto: LoginMemberDto): Promise<Member> {
    const member = await this.findByMemberId(loginMemberDto.member_id);
    if (!member) {
      throw new NotFoundException(`Not found ${loginMemberDto.member_id}`);
    }

    if (await bcrypt.compare(loginMemberDto.member_pw, member.member_pw))
      return member;
    else throw new BadRequestException(`incorrect password`);
  }
}
