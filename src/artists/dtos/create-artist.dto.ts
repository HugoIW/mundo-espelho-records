import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { FindAllArtistsDto } from './find-all-artists.dto';

export class CreateArtistDto {
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty({ message: 'Informe o nome do artista / banda!' })
  name: FindAllArtistsDto;

  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty({ message: 'Informe o genero do artista / banda!' })
  genre: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe a biografia do artista / banda!' })
  bio: string;
}
