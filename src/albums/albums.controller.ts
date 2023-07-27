import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { Album } from './schemas/album.schema';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dtos';
import { Roles } from '../common/decorators';
import { Role } from '../common/enums/roles.enum';

@Controller('albums')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @Get()
  findAll(@Query() name: string): Promise<Album[]> {
    return this.albumService.findAll(name);
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
  delete(@Param('id') _id: string): Promise<Album | null> {
    return this.albumService.delete(_id);
  }
}
