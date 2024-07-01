import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  tags: [string];
}
