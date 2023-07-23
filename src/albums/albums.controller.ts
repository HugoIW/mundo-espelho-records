import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Album } from './schemas/album.schema';
import { AlbumsService } from './albums.service';
import { FindOneAlbumDto } from './dtos/find-one-album.dto';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @Get()
  findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Get('/findby')
  findOne(@Body() findOneAlbumDto: FindOneAlbumDto): Promise<Album[] | null> {
    return this.albumService.findOne(findOneAlbumDto);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id') _id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album | null> {
    return this.albumService.update(_id, updateAlbumDto);
  }

  @Delete(':id')
  delete(@Param('id') _id: string): Promise<void> {
    return this.albumService.delete(_id);
  }
}
