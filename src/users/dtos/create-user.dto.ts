import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { Role } from 'src/common/enums/roles.enum';

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

  @IsOptional()
  roles: Role[];

  @IsOptional()
  permissions: string[];
}
