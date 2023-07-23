import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindOneAlbumDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o album!' })
  @Transform(({ value }) => value.toUpperCase())
  name: string;
}
