import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Artist } from './schemas/artist.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArtistDto, UpdateArtistDto } from './dtos';

@Injectable()
export class ArtistsService {
  constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>) {}

  async findAll(name: string): Promise<Artist[]> {
    return await this.artistModel.find({
      name: { $regex: '.*' + Object.values(name) + '.*', $options: 'i' },
    });
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artistExists = await this.artistModel.find({
      name: { $exists: true, $in: [createArtistDto.name] },
    });

    if (!artistExists.length) {
      return await this.artistModel.create(createArtistDto);
    }

    throw new HttpException('Artista já existe!', HttpStatus.BAD_REQUEST);
  }

  async update(
    _id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | null> {
    return await this.artistModel.findOneAndUpdate({ _id }, updateArtistDto);
  }

  async delete(_id: string): Promise<Artist | null> {
    return await this.artistModel.findOneAndDelete({ _id });
  }
}
