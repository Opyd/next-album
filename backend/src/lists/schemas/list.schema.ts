import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type AlbumDocument = List & Document;

@Schema()
export class Album {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  mbid: string;

  @Prop({ default: false })
  finished: boolean;
}

export type ListDocument = List & Document;

@Schema({ timestamps: true })
export class List {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop()
  name: string;

  @Prop({ default: false })
  finished: boolean;

  @Prop([String])
  tags: string[];

  @Prop([Album])
  albums: Album[];
}

export const ListSchema = SchemaFactory.createForClass(List);
export const AlbumSchema = SchemaFactory.createForClass(Album);
