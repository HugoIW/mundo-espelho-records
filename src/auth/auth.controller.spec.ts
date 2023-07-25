import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { authSignInMock } from '../_mocks_';
import { SignInDto } from './dtos';
import { faker } from '@faker-js/faker';

const moduleMocker = new ModuleMocker(global);

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .useMocker((token) => {
        const results = Object.assign({
          access_token: faker.string.alphanumeric(100),
        });
        if (token === AuthService) {
          return { signIn: jest.fn().mockResolvedValue(results) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = moduleRef.get(AuthController);
  });

  describe('signIn', () => {
    it('should return a promise', () => {
      const dto: SignInDto = authSignInMock;
      expect(controller.signIn(dto)).toBeInstanceOf(Promise<any>);
    });
  });
});
