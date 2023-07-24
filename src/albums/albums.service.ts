import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDto, FindOneAlbumDto, UpdateAlbumDto } from './dtos';

@Injectable()
export class AlbumsService {
  constructor(@InjectModel(Album.name) private albumModel: Model<Album>) {}

  async findAll(): Promise<Album[]> {
    try {
      return await this.albumModel.find().exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(findOneAlbumDtoDto: FindOneAlbumDto): Promise<Album[] | null> {
    try {
      const name =
        typeof FindOneAlbumDto === 'object'
          ? Object.values(findOneAlbumDtoDto)
          : findOneAlbumDtoDto;
      return await this.albumModel
        .find({ name: { $regex: '.*' + name + '.*' } })
        .exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
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
    try {
      await this.albumModel.findOneAndDelete({ _id });
      return;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
