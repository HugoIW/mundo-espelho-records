import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Album } from '../../albums/schemas/album.schema';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  _id: string;

  @Prop({
    unique: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: '_id',
  })
  album: Album;

  @Prop()
  name: string;

  @Prop({ default: new Date() })
  release: Date;

  @Prop({ default: new Date() })
  created_at: Date;

  @Prop({ default: new Date() })
  updated_at: Date;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
