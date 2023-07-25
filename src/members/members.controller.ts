import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from './schemas/member.schema';
import { CreateMemberDto, FindAllMemberDto, UpdateMemberDto } from './dtos';
import { Role } from '../libs/enums';
import { Roles } from '../libs/decorators';

@Controller('members')
export class MembersController {
  constructor(private memberService: MembersService) {}

  @Get()
  findAll(@Body() findAllMemberDto: FindAllMemberDto): Promise<Member[]> {
    return this.memberService.findAll(findAllMemberDto);
  }

  @Roles(Role.Admin)
  @Post()
  create(@Body() createMemberDto: CreateMemberDto): Promise<Member | null> {
    return this.memberService.create(createMemberDto);
  }

  @Roles(Role.Admin)
  @Put(':id')
  update(
    @Param('id') _id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Promise<Member | null> {
    return this.memberService.update(_id, updateMemberDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  delete(@Param('id') _id: string): Promise<void> {
    return this.memberService.delete(_id);
  }
}
