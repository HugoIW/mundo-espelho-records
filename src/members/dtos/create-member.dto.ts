import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Album } from '../../albums/schemas/album.schema';
import { FindOneMemberDto } from './find-one-members.dto';
import { Transform } from 'class-transformer';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o album do integrante!' })
  album: Album;

  @IsString()
  @IsNotEmpty({ message: 'Por favor, informe o nome do integtrante!' })
  @Transform(({ value }) => value.toUpperCase())
  name: FindOneMemberDto;

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
