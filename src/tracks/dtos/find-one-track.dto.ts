import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneTrackDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o nome da faixa!' })
  name: string;
}
