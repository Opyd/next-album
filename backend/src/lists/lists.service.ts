import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument } from './schemas/list.schema';
import { Model } from 'mongoose';

@Injectable()
export class ListsService {
  constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}

  create(createListDto: CreateListDto, authorId: string) {
    return this.listModel.create({
      author: authorId,
      name: createListDto.name,
      finished: false,
      tags: createListDto.tags,
      albums: [],
    });
  }

  async findAll(authorId: string) {
    const list = await this.listModel.findOne({ author: authorId }).exec();
    return list;
  }

  findOne(id: string, authorId: string) {
    return this.listModel.findOne({ _id: id, author: authorId });
  }

  update(id: string, updateListDto: UpdateListDto) {
    return this.listModel
      .findByIdAndUpdate(id, updateListDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.listModel.findOneAndRemove({ _id: id });
  }
}
