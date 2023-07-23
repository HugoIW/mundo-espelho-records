import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { FindOneTrackDto } from './find-one-track.dto';
import { Album } from 'src/albums/schemas/album.schema';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o album!' })
  album: Album;

  @IsString()
  @IsNotEmpty({ message: 'Informe o nome da faixa!' })
  @Transform(({ value }) => value.toUpperCase())
  name: FindOneTrackDto;

  @IsDate()
  @IsOptional()
  release: Date;
}
