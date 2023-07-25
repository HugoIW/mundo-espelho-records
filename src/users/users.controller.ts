import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { Roles } from '../libs/decorators';
import { Role } from '../libs/enums';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Roles(Role.Admin)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Roles(Role.Admin)
  @Get('/find')
  findOne(@Body() email: string): Promise<User | null> {
    return this.userService.findOne(email);
  }

  @Roles(Role.Admin)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User | {}> {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.Admin)
  @Put(':id')
  update(
    @Param('id') _id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.userService.update(_id, updateUserDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  delete(@Param('id') _id: string) {
    return this.userService.delete(_id);
  }
}
