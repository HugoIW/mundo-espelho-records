import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Artist } from '../../artists/schemas/artist.schema';

export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
  _id: string;

  @Prop({ unique: false, type: mongoose.Schema.Types.ObjectId, ref: 'Artist' })
  artist: Artist;

  @Prop({ unique: true })
  name: string;

  @Prop({ default: new Date() })
  created_at: Date;

  @Prop({ default: new Date() })
  updatedat: Date;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
