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
import { ArtistsService } from './artists.service';
import { Artist } from './schemas/artist.schema';
import { CreateArtistDto, UpdateArtistDto } from './dtos';
import { Roles } from '../common/decorators';
import { Role } from '../common/enums';

@Controller('artists')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @Get()
  findAll(@Query() name: string): Promise<Artist[]> {
    return this.artistService.findAll(name);
  }

  @Roles(Role.Admin)
  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Roles(Role.Admin)
  @Put(':id')
  update(
    @Param('id')
    _id: string,
    @Body()
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | null> {
    return this.artistService.update(_id, updateArtistDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  delete(@Param('id') _id: string): Promise<Artist | null> {
    return this.artistService.delete(_id);
  }
}
