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
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { FindOneDto } from './dtos/find-one.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @Get()
  findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Get('/findby')
  findOne(@Body() findOneDto: FindOneDto): Promise<Artist | null> {
    return this.artistService.findOne(findOneDto);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  update(
    @Param('id')
    _id: string,
    @Body()
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | null> {
    return this.artistService.update(_id, updateArtistDto);
  }

  @Delete(':id')
  delete(@Param('id') _id: string): Promise<void> {
    return this.artistService.delete(_id);
  }
}