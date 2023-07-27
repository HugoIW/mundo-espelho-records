import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { Roles } from '../common/decorators';
import { Role } from '../common/enums';

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
  findOne(@Request() email: string): Promise<User | null> {
    return this.userService.findOne(email);
  }

  @Roles(Role.Admin)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User | null> {
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
  delete(@Param('id') _id: string): Promise<User | null> {
    return this.userService.delete(_id);
  }
}
