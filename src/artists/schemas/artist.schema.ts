import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema()
export class Artist {
  _id: string;

  @Prop({ unique: true, isnotnull: true })
  name: string;

  @Prop({ isnotnull: true })
  genre: string;

  @Prop()
  bio: string;

  @Prop({ default: new Date() })
  created_at: Date;

  @Prop({ default: new Date() })
  updated_at: Date;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
