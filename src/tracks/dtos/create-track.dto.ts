import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { FindAllTrackDto } from './find-all-track.dto';
import { Album } from '../../albums/schemas/album.schema';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o album!' })
  album: Album;

  @IsString()
  @IsNotEmpty({ message: 'Informe o nome da faixa!' })
  @Transform(({ value }) => value.toUpperCase())
  name: FindAllTrackDto;

  @IsDate()
  @IsOptional()
  release: Date;
}
