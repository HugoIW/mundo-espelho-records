import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from './schemas/member.schema';
import { Model } from 'mongoose';
import { CreateMemberDto, UpdateMemberDto } from './dtos';

@Injectable()
export class MembersService {
  constructor(@InjectModel(Member.name) private memberModel: Model<Member>) {}

  async findAll(name: string): Promise<Member[]> {
    return await this.memberModel.find({
      name: { $regex: '.*' + Object.values(name) + '.*', $options: 'i' },
    });
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    return await this.memberModel.create(createMemberDto);
  }

  async update(
    _id: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<Member | null> {
    return await this.memberModel.findOneAndUpdate({ _id }, updateMemberDto);
  }

  async delete(_id: string): Promise<Member | null> {
      return await this.memberModel.findOneAndDelete({ _id });
  }
}
