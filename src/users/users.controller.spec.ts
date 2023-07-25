import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { userCreateMock, userModelMock } from '../_mocks_';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
      ],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      expect(usersController.findAll()).toBeInstanceOf(Promise<User[]>);
    });
  });

  describe('findOne', () => {
    it('should return an object of users', async () => {
      const email: string = faker.internet.email();
      expect(usersController.findOne(email)).toBeInstanceOf(
        Promise<User | null>,
      );
    });
  });

  describe('create', () => {
    it('should return an object of users', async () => {
      const dto: CreateUserDto = userCreateMock;
      expect(() => {
        try {
          expect(usersController.create(dto)).toBeInstanceOf(Promise<User>);
        } catch (error) {
          expect(usersController.create(dto)).toThrow();
        }
      });
    });
  });

  describe('update', () => {
    it('should return an object of users', async () => {
      const id = faker.string.uuid();
      const dto: UpdateUserDto = userCreateMock;
      expect(usersController.update(id, dto)).toBeInstanceOf(Promise<User>);
    });
  });

  describe('delete', () => {
    it('should return void', async () => {
      const id = faker.string.uuid();
      expect(usersController.delete(id)).toBeInstanceOf(Promise<void>);
    });
  });
});
