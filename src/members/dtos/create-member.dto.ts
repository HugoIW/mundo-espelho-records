import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o album do integrante!' })
  album: string;

  @IsString()
  @IsNotEmpty({ message: 'Por favor, informe o nome do integtrante!' })
  @Transform(({ value }) => value.toUpperCase())
  name: string;

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
