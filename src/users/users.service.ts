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
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(email: string): Promise<User | null> {
    try {
      const search = typeof email === 'object' ? Object.values(email) : email;
      return await this.userModel
        .findOne({ email: { $regex: '.*' + search + '.*' } })
        .exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User | {}> {
    try {
      const emailExists = await this.uniqueEmailValidation(createUserDto.email);
      if (!emailExists) {
        const createdUser = new this.userModel({
          ...createUserDto,
          password: await hashPassword(createUserDto.password),
        });
        return createdUser.save();
      }

      return emailExists;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    _id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    try {
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
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(_id: string) {
    try {
      return await this.userModel.deleteOne({ _id });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
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
