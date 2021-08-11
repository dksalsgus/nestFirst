import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './member.entity';
import { MemberRepository } from './nenber.repository';
import { CreateMemberDto } from './dto/create-member.dto';

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
    const saveMember = await this.memberRepository.save(createMember);
    if (!saveMember) {
      console.log(`Don't save ${createMember}`);
      return;
    }
    return saveMember;
  }
}
