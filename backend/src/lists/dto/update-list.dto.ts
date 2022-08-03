import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { Album } from '../schemas/list.schema';

export class UpdateListDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  tags: [string];

  @IsOptional()
  @IsBoolean()
  finished: boolean;

  @IsOptional()
  @IsArray()
  albums: [Album];
}
