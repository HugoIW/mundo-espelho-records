import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Artist } from '../../artists/schemas/artist.schema';
import { FindOneAlbumDto } from './find-one-album.dto';

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o artista!' })
  artist: Artist;

  @IsString()
  @IsNotEmpty({ message: 'Informe o nome do album!' })
  @Transform(({ value }) => value.toUpperCase())
  name: FindOneAlbumDto;
}
