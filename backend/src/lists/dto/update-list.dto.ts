import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsString({ each: true })
  albums: [string];
}
