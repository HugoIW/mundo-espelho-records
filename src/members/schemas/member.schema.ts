import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Album } from '../../albums/schemas/album.schema';

export type MemberDocument = HydratedDocument<Member>;

@Schema()
export class Member {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: '_id' })
  album: string;

  @Prop()
  name: string;

  @Prop()
  role: string;

  @Prop()
  bio: string;

  @Prop()
  age: number;

  @Prop({ default: new Date() })
  created_at: Date;

  @Prop({ default: new Date() })
  updated_at: Date;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
