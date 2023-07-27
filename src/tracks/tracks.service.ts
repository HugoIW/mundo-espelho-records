import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track } from './schemas/track.schema';
import { Model } from 'mongoose';
import { CreateTrackDto, UpdateTrackDto } from './dtos';

@Injectable()
export class TracksService {
  constructor(@InjectModel(Track.name) private trackModel: Model<Track>) {}

  async findAll(name: string): Promise<Track[]> {
    return await this.trackModel.find({
      name: { $regex: '.*' + Object.values(name) + '.*', $options: 'i' },
    });
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const trackExists = await this.trackModel.find({
      name: { $exists: true, $in: [createTrackDto.name] },
      album: { $exists: true, $in: [createTrackDto.album] },
    });

    if (!trackExists.length) {
        return await this.trackModel.create(createTrackDto);
    }

    throw new HttpException(
      'Já existe uma música com esse nome no album!',
      HttpStatus.BAD_REQUEST,
    );
  }

  async update(
    _id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track | null> {
    return await this.trackModel.findOneAndUpdate({ _id }, updateTrackDto);
  }

  async delete(_id: string): Promise<Track | null> {
      return await this.trackModel.findOneAndDelete({ _id });
  }
}
