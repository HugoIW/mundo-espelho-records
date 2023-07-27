import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { authSignInMock, usersCrudMock, usersModelMock } from '../_mocks_';
import { SignInDto } from './dtos';
import { faker } from '@faker-js/faker';

describe('AuthService', () => {
  let service: AuthService;
  const user = usersModelMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: JwtService,
          useValue: authSignInMock,
        },
        {
          provide: getModelToken(User.name),
          useValue: usersCrudMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('should an login', async () => {
      const dto: SignInDto = {
        email: faker.internet.email(),
        password: '12345678',
      };

      usersCrudMock.findOne.mockReturnValueOnce(user);
      const result = await service.signIn(dto);
      expect(result).toBeInstanceOf(Object);
    });

    it('should user not exists', async () => {
      const dto: SignInDto = {
        email: faker.internet.email(),
        password: '12345678',
      };

      usersCrudMock.findOne.mockReturnValueOnce(null);
      await service.signIn(dto).catch((e) => {
        expect(e).toBeInstanceOf(UnauthorizedException)
      });
    });

    it('should not match', async () => {
      const dto: SignInDto = {
        email: faker.internet.email(),
        password: '1234567',
      };

      usersCrudMock.findOne.mockReturnValueOnce(user);
      await service.signIn(dto).catch((e) => {
        expect(e).toBeInstanceOf(UnauthorizedException)
      });
    });
  });
});
