import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from './schemas/member.schema';
import { Model } from 'mongoose';
import { CreateMemberDto, FindOneMemberDto, UpdateMemberDto } from './dtos';

@Injectable()
export class MembersService {
  constructor(@InjectModel(Member.name) private memberModel: Model<Member>) {}

  async findAll(): Promise<Member[]> {
    try {
      return await this.memberModel.find().exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(findOneAlbumDto: FindOneMemberDto): Promise<Member[]> {
    try {
      const name =
        typeof findOneAlbumDto === 'object'
          ? Object.values(findOneAlbumDto)
          : findOneAlbumDto;
      return await this.memberModel
        .find({ name: { $regex: '.*' + name + '.*' } })
        .exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    try {
      const created = new this.memberModel(createMemberDto);
      return await created.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    _id: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<Member | null> {
    try {
      return await this.memberModel.findOneAndUpdate({ _id }, updateMemberDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(_id: string): Promise<void> {
    try {
      await this.memberModel.findOneAndDelete({ _id });
      return;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
