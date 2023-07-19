import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dtos';
import { isMatchHash } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const credentials = await this.userService.findOne(signInDto.email);
    if (credentials) {
      const isMatch = await isMatchHash(
        signInDto.password,
        credentials.password,
      );

      if (!isMatch) {
        throw new UnauthorizedException();
      }

      const payload = { sub: credentials._id, email: credentials.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    throw new UnauthorizedException();
  }
}
