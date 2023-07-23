import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { FindOneAlbumDto } from './find-one-album.dto';
import { Artist } from 'src/artists/schemas/artist.schema';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o artista!' })
  artist: Artist;

  @IsString()
  @IsNotEmpty({ message: 'Informe o nome do album!' })
  @Transform(({ value }) => value.toUpperCase())
  name: FindOneAlbumDto;
}
