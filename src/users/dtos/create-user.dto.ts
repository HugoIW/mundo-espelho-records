import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o nome!' })
  name: string;

  @IsNotEmpty({ message: 'Informe um e-mail!' })
  @IsEmail({}, { message: 'Informe um e-mail válido!' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe a senha!' })
  password: string;
}
