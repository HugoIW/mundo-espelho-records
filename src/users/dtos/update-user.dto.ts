import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o nome!' })
  @IsOptional()
  name?: string;

  @IsNotEmpty({ message: 'Informe um e-mail!' })
  @IsEmail({}, { message: 'Informe um e-mail válido!' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe a senha!' })
  @IsOptional()
  password?: string;
}
