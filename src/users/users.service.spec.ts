import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersCrudMock, usersModelMock } from '../_mocks_';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { faker } from '@faker-js/faker';
import { CreateUserDto, UpdateUserDto } from './dtos';

describe('UsersService', () => {
  let service: UsersService;
  const user = usersModelMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: usersCrudMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      usersCrudMock.find.mockReturnValueOnce([user, user]);
      const users = await service.findAll();
      expect(users).toHaveLength(2);
      expect(usersCrudMock.find).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return an user', async () => {
      usersCrudMock.findOne.mockReturnValueOnce([user]);
      const result = await service.findOne(faker.internet.email());
      expect(result).toHaveLength(1);
      expect(usersCrudMock.findOne).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    const dto: CreateUserDto = {
      name: faker.string.sample(),
      email: faker.internet.email(),
      password: faker.string.sample(12),
      roles: [],
      permissions: ['admin'],
    };

    it('should return a new user', async () => {
      usersCrudMock.find.mockReturnValueOnce([]);
      usersCrudMock.create.mockReturnValueOnce([user]);
      const created = await service.create(dto);
      expect(created).toHaveLength(1);
      expect(usersCrudMock.create).toBeCalledTimes(1);
    });

    it('should error HttpException with message: "E-mail already exists!"', async () => {
      usersCrudMock.find.mockReturnValueOnce([user]);
      usersCrudMock.create.mockReturnValueOnce([user]);
      await service.create(dto).catch((e) => {
        expect(e).toBeInstanceOf(HttpException);
        expect(e).toMatchObject({ message: 'E-mail already exists!' });
      });
      expect(usersCrudMock.create).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    const id = faker.string.uuid();
    const dto: UpdateUserDto = {
      name: faker.string.sample(),
      email: faker.internet.email(),
      password: faker.string.sample(12),
      roles: [],
      permissions: ['admin'],
    };

    it('should return a update user', async () => {
      usersCrudMock.findOneAndUpdate.mockReturnValueOnce([user]);
      const updated = await service.update(id, dto);
      expect(updated).toHaveLength(1);
      expect(usersCrudMock.findOneAndUpdate).toBeCalledTimes(1);
    });
  });

  describe('delete', () => {
    const id = faker.string.uuid();

    it('should return a update user', async () => {
      usersCrudMock.findOneAndDelete.mockReturnValueOnce([user]);
      const deleted = await service.delete(id);
      expect(deleted).toHaveLength(1);
      expect(usersCrudMock.findOneAndDelete).toBeCalledTimes(1);
    });
  });
});
