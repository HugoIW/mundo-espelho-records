import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track } from './schemas/track.schema';
import { Model } from 'mongoose';
import { CreateTrackDto, FindOneTrackDto, UpdateTrackDto } from './dtos';

@Injectable()
export class TracksService {
  constructor(@InjectModel(Track.name) private trackModel: Model<Track>) {}

  async findAll(): Promise<Track[]> {
    try {
      return await this.trackModel.find().exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(findOneTrackDto: FindOneTrackDto): Promise<Track[] | null> {
    const name =
      typeof findOneTrackDto === 'object'
        ? Object.values(findOneTrackDto)
        : findOneTrackDto;

    try {
      return await this.trackModel
        .find({ name: { $regex: '.*' + name + '.*' } })
        .exec();
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
    try {
      await this.trackModel.findOneAndDelete({ _id });
      return;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
