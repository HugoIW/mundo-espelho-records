import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { Role } from 'src/common/enums/roles.enum';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o nome!' })
  name: string;

  @IsNotEmpty({ message: 'Informe um e-mail!' })
  @IsEmail({}, { message: 'Informe um e-mail válido!' })
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsOptional()
  roles: Role[];

  @IsOptional()
  permissions: string[];
}
