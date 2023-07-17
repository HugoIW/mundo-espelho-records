import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Connection, Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { hashPassword } from 'src/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User | {}> {
    const emailExists = await this.uniqueEmailValidation(createUserDto.email);
    if (!emailExists) {
      const createdUser = new this.userModel({
        ...createUserDto,
        password: await hashPassword(createUserDto.password),
      });
      return createdUser.save();
    }

    return emailExists;
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

  async delete(_id: string) {
    return await this.userModel.deleteOne({ _id });
  }

  private async uniqueEmailValidation(email: string) {
    const emailExists = await this.userModel.findOne({ email }).exec();
    if (emailExists) {
      throw new HttpException(
        'Esse e-mail já existe em nosso sistema!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return 0;
  }
}
