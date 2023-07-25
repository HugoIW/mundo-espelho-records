import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dtos';
import { isMatchHash } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findOne(signInDto.email);
    if (user) {
      const isMatch = await isMatchHash(signInDto.password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException();
      }

      const payload = {
        sub: user._id,
        email: user.email,
        roles: user.roles,
        permissions: user.permissions,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    throw new UnauthorizedException();
  }
}
