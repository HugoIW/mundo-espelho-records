import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class FindAllTrackDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  name: string;
}
