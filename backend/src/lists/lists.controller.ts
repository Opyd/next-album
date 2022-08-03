import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { JwtGuard } from '../auth/guard';
import { Request } from 'express';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createListDto: CreateListDto, @Req() req: Request) {
    return this.listsService.create(createListDto, req.user['_id']);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() req: Request) {
    //shows all lists of bearer user
    return this.listsService.findAll(req.user['_id']);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.listsService.findOne(id, req.user['_id']);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
    @Req() req: Request,
  ) {
    const list = await this.listsService.findOne(id, req.user['_id']);

    if (!list) {
      throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
    }

    return this.listsService.update(id, updateListDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const list = await this.listsService.findOne(id, req.user['_id']);

    if (!list) {
      throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
    }
    return this.listsService.remove(id);
  }
}
