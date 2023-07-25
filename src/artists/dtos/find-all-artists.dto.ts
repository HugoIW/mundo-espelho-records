import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllArtistsDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  name: string;
}
