import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindOneDto {
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  name: string;
}
