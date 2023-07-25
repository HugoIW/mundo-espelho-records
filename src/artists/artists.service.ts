import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Artist } from './schemas/artist.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArtistDto, FindAllArtistsDto, UpdateArtistDto } from './dtos';

@Injectable()
export class ArtistsService {
  constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>) {}

  async findAll(findAllArtistsDto: FindAllArtistsDto): Promise<Artist[]> {
    try {
      const search =
        typeof findAllArtistsDto === 'object'
          ? Object.values(findAllArtistsDto)
          : findAllArtistsDto;
      return await this.artistModel
        .find({ name: { $regex: '.*' + search + '.*' } })
        .exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artists = await this.findAll(createArtistDto.name);
    if (
      artists &&
      artists.length &&
      artists.some(
        (artist) => artist.name.toString() === createArtistDto.name.toString(),
      )
    ) {
      throw new HttpException('Artista já existe!', HttpStatus.BAD_REQUEST);
    }

    try {
      const created = new this.artistModel(createArtistDto);
      return created.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    _id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | null> {
    try {
      return await this.artistModel.findOneAndUpdate({ _id }, updateArtistDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(_id: string): Promise<void> {
    try {
      await this.artistModel.findOneAndDelete({ _id });
      return;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
