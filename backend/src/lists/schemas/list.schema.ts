import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ListDocument = List & Document;

@Schema({ timestamps: true })
export class List {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ default: false })
  finished: boolean;

  @Prop()
  tags: string[];

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] })
  // albums: Album[];
}

export const ListSchema = SchemaFactory.createForClass(List);
