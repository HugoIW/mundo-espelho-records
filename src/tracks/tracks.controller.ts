import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Track } from './schemas/track.schema';
import { FindOneTrackDto } from './dtos/find-one-track.dto';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';
import { Role } from '../libs/enums/roles.enum';
import { Roles } from '../libs/decorators/roles.decorator';

@Controller('tracks')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @Get()
  findAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Get('/findby')
  findOne(@Body() findOneTrackDto: FindOneTrackDto): Promise<Track[] | null> {
    return this.trackService.findOne(findOneTrackDto);
  }

  @Roles(Role.Admin)
  @Post()
  create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Roles(Role.Admin)
  @Put(':id')
  update(
    @Param('id') _id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track | null> {
    return this.trackService.update(_id, updateTrackDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  delete(@Param('id') _id: string): Promise<void> {
    return this.trackService.delete(_id);
  }
}
