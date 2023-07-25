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
import { CreateAlbumDto, FindAllAlbumsDto, UpdateAlbumDto } from './dtos';
import { Roles } from '../libs/decorators';
import { Role } from '../libs/enums/roles.enum';

@Controller('albums')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @Get()
  findAll(@Body() findAllAlbumsDto: FindAllAlbumsDto): Promise<Album[]> {
    return this.albumService.findAll(findAllAlbumsDto);
  }

  @Roles(Role.Admin)
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.create(createAlbumDto);
  }

  @Roles(Role.Admin)
  @Put(':id')
  update(
    @Param('id') _id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album | null> {
    return this.albumService.update(_id, updateAlbumDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  delete(@Param('id') _id: string): Promise<void> {
    return this.albumService.delete(_id);
  }
}
