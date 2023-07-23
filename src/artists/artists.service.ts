import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Artist } from './schemas/artist.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { FindOneDto } from './dtos/find-one.dto';

@Injectable()
export class ArtistsService {
  constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>) {}

  async findAll(): Promise<Artist[]> {
    return await this.artistModel.find().exec();
  }

  async findOne(findOneDto: FindOneDto): Promise<Artist | null> {
    const name =
      typeof findOneDto === 'object' ? Object.values(findOneDto) : findOneDto;
    return await this.artistModel.findOne({ name }).exec();
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    if (await this.findOne(createArtistDto.name)) {
      throw new HttpException('Artista já existe!', HttpStatus.BAD_REQUEST);
    }

    try {
      const created = new this.artistModel(createArtistDto);
      return created.save();
    } catch (error) {
      throw new HttpException(
        'Não foi possível criar o artista!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    _id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | null> {
    try {
      return await this.artistModel.findOneAndUpdate({ _id }, updateArtistDto);
    } catch (error) {
      throw new HttpException(
        'Não foi possível editar o artista!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(_id: string): Promise<void> {
    await this.artistModel.findOneAndDelete({ _id });
    return;
  }
}
