import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDto, UpdateAlbumDto } from './dtos';

@Injectable()
export class AlbumsService {
  constructor(@InjectModel(Album.name) private albumModel: Model<Album>) {}

  async findAll(name: string): Promise<Album[]> {
    return await this.albumModel
      .find({
        name: { $regex: '.*' + Object.values(name) + '.*', $options: 'i' },
      });
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const albumsExists = await this.albumModel.find({
      name: { $exists: true, $in: [createAlbumDto.name] },
      artist: { $exists: true, $in: [createAlbumDto.artist] },
    });

    if (!albumsExists.length) {
      return await this.albumModel.create(createAlbumDto);
    }

    throw new HttpException(
      'O album já existe para esse artista!',
      HttpStatus.BAD_REQUEST,
    );
  }

  async update(
    _id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album | null> {
    return await this.albumModel.findOneAndUpdate({ _id }, updateAlbumDto);
  }

  async delete(_id: string): Promise<Album | null> {
    return await this.albumModel.findOneAndDelete({ _id });
  }
}
