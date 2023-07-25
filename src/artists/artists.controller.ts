import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from './schemas/artist.schema';
import { CreateArtistDto, UpdateArtistDto, FindAllArtistsDto } from './dtos';
import { Roles } from '../libs/decorators';
import { Role } from '../libs/enums';

@Controller('artists')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @Get()
  findAll(@Body() findAllArtistsDto: FindAllArtistsDto): Promise<Artist[]> {
    return this.artistService.findAll(findAllArtistsDto);
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
  delete(@Param('id') _id: string): Promise<void> {
    return this.artistService.delete(_id);
  }
}
