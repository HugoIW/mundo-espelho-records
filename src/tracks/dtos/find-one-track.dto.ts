import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneTrackDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o nome da faixa!' })
  @Transform(({ value }) => value.toUpperCase())
  name: string;
}
