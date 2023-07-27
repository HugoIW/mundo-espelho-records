import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Album } from '../../albums/schemas/album.schema';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o album!' })
  album: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe o nome da faixa!' })
  @Transform(({ value }) => value.toUpperCase())
  name: string;

  @IsDate()
  @IsOptional()
  release: Date;
}
