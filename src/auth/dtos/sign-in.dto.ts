import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o e-mail!' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe a senha!' })
  password: string;
}
