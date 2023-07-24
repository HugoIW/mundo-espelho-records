import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneMemberDto {
  @IsString()
  @IsNotEmpty({ message: 'Por favor, informe o nome do membro!' })
  @Transform(({ value }) => value.toUpperCase())
  name: string;
}
