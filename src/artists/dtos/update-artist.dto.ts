import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { FindOneDto } from './find-one.dto';

export class UpdateArtistDto {
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty({ message: 'Informe o nome do artista / banda!' })
  name: FindOneDto;

  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty({ message: 'Informe o genero do artista / banda!' })
  genre: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe a biografia do artista / banda!' })
  bio: string;
}
