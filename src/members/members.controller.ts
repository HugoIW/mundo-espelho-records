import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query
} from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from './schemas/member.schema';
import { CreateMemberDto, UpdateMemberDto } from './dtos';
import { Role } from '../common/enums';
import { Roles } from '../common/decorators';

@Controller('members')
export class MembersController {
  constructor(private memberService: MembersService) {}

  @Get()
  findAll(@Query() name: string): Promise<Member[]> {
    return this.memberService.findAll(name);
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
  delete(@Param('id') _id: string): Promise<Member | null> {
    return this.memberService.delete(_id);
  }
}
