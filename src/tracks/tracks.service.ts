import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track } from './schemas/track.schema';
import { Model } from 'mongoose';
import { FindOneTrackDto } from './dtos/find-one-track.dto';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';

@Injectable()
export class TracksService {
  constructor(@InjectModel(Track.name) private trackModel: Model<Track>) {}

  async findAll(): Promise<Track[]> {
    return await this.trackModel.find().exec();
  }

  async findOne(findOneTrackDto: FindOneTrackDto): Promise<Track[] | null> {
    const name =
      typeof findOneTrackDto === 'object'
        ? Object.values(findOneTrackDto)
        : findOneTrackDto;

    try {
      return await this.trackModel.find({ name }).exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const tracks = await this.findOne(createTrackDto.name);
    if (
      tracks &&
      tracks.length &&
      tracks.some(
        (track) => track.album.toString() === createTrackDto.album.toString(),
      )
    ) {
      throw new HttpException(
        'Já existe uma música com esse nome no album!',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const created = new this.trackModel(createTrackDto);
      return await created.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    _id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track | null> {
    return await this.trackModel.findOneAndUpdate({ _id }, updateTrackDto);
  }

  async delete(_id: string): Promise<void> {
    await this.trackModel.findOneAndDelete({ _id });
    return;
  }
}
