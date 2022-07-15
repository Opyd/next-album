import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ListDocument = List & Document;

@Schema()
export class Album {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  mbid: string;

  @Prop({ default: false })
  finished: boolean;
}

@Schema({ timestamps: true })
export class List {
  _id: mongoose.Schema.Types.ObjectId;

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
