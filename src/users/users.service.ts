import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { hashPassword } from '../utils';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(email: string): Promise<User | null> {
    return await this.userModel.findOne({
      email: { $regex: '.*' + email + '.*', $options: 'i' },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const userExists = await this.userModel.find({
      email: { $exists: true, $in: [createUserDto.email] },
    });

    if (!userExists.length) {
      return await this.userModel.create(createUserDto);
    }

    throw new HttpException(
      'E-mail already exists!',
      HttpStatus.BAD_REQUEST,
    );
  }

  async update(
    _id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return await this.userModel.findOneAndUpdate(
      { _id },
      {
        ...updateUserDto,
        ...(updateUserDto.password
          ? { password: await hashPassword(updateUserDto.password) }
          : {}),
      },
      {
        new: false,
      },
    );
  }

  async delete(_id: string): Promise<User | null> {
    return await this.userModel.findOneAndDelete({ _id });
  }
}
