import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { FindOneAlbumDto } from './dtos/find-one-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(@InjectModel(Album.name) private albumModel: Model<Album>) {}

  async findAll(): Promise<Album[]> {
    return await this.albumModel.find().exec();
  }

  async findOne(findOneAlbumDtoDto: FindOneAlbumDto): Promise<Album[] | null> {
    const name =
      typeof FindOneAlbumDto === 'object'
        ? Object.values(findOneAlbumDtoDto)
        : findOneAlbumDtoDto;
    return await this.albumModel.find({ name }).exec();
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const albums = await this.findOne(createAlbumDto.name);
    if (
      albums &&
      albums.length &&
      albums.some(
        (album) => album.artist.toString() === createAlbumDto.artist.toString(),
      )
    ) {
      throw new HttpException(
        'O album já existe para esse artista!',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const created = new this.albumModel(createAlbumDto);
      return await created.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    _id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album | null> {
    try {
      return await this.albumModel.findOneAndUpdate({ _id }, updateAlbumDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(_id: string): Promise<void> {
    await this.albumModel.findOneAndDelete({ _id });
    return;
  }
}
