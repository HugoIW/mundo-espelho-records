import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Track } from './schemas/track.schema';
import { CreateTrackDto, UpdateTrackDto } from './dtos';
import { Role } from '../common/enums';
import { Roles } from '../common/decorators';

@Controller('tracks')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @Get()
  findAll(@Query() name: string): Promise<Track[]> {
    return this.trackService.findAll(name);
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
  delete(@Param('id') _id: string): Promise<Track | null> {
    return this.trackService.delete(_id);
  }
}
