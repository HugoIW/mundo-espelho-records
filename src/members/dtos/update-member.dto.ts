import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Album } from '../../albums/schemas/album.schema';
import { FindAllMemberDto } from './find-all-members.dto';
import { Transform } from 'class-transformer';

export class UpdateMemberDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o album do integrante!' })
  album: Album;

  @IsString()
  @IsNotEmpty({ message: 'Por favor, informe o nome do integrante!' })
  @Transform(({ value }) => value.toUpperCase())
  name: FindAllMemberDto;

  @IsString()
  @IsNotEmpty({ message: 'Informe o função do integrante!' })
  @Transform(({ value }) => value.toUpperCase())
  role: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsNumber()
  @IsOptional()
  age: number;
}
