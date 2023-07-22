import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { SignInDto } from './dtos';
import { AuthService } from './auth.service';
import { AuthGuard } from '../libs/guards/auth.guard';
import { Public } from 'src/libs/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile() {
    return 'autenticado!';
  }
}
