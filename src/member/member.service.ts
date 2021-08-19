import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './member.entity';
import { MemberRepository } from './member.repository';
import { CreateMemberDto } from './dto/create-member.dto';
import * as bcrypt from 'bcrypt';
import { LoginMemberDto } from './dto/login-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

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

  async findByMemberNo(member_no: number): Promise<Member> {
    const findMember = this.memberRepository.findOne({ member_no });
    if (!findMember) {
      throw new NotFoundException(`Not found ${member_no}`);
    }
    return findMember;
  }

  async loginMember(loginMemberDto: LoginMemberDto): Promise<Member> {
    const member = await this.memberRepository.findOne(
      loginMemberDto.member_id,
    );
    if (!member) {
      throw new NotFoundException(`Not found ${loginMemberDto.member_id}`);
    }

    if (await bcrypt.compare(loginMemberDto.member_pw, member.member_pw))
      return member;
    else throw new BadRequestException(`incorrect password`);
  }

  async updateMember(
    member_no: number,
    updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    const member = await this.findByMemberNo(member_no);
    if (!member) {
      throw new NotFoundException(`Not found ${member_no}`);
    }

    member.member_name = updateMemberDto.member_name;
    member.member_email = updateMemberDto.member_email;
    member.member_gender = updateMemberDto.member_gender;
    member.member_pw = await bcrypt.hash(updateMemberDto.member_pw, 10);

    const updateMember = this.memberRepository.save(member);
    return updateMember;
  }

  async deleteMember(member_no: number): Promise<void> {
    const ret = await this.memberRepository.delete({ member_no });
    if (ret.affected === 0) {
      throw new NotFoundException(`Not Found ${member_no}`);
    }
  }
}
