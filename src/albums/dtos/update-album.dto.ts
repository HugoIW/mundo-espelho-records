import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o artista!' })
  artist: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe o nome do album!' })
  @Transform(({ value }) => value.toUpperCase())
  name: string;
}
