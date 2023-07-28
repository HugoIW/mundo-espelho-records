import { faker } from '@faker-js/faker';
import { User } from '../users/schemas/user.schema';
import { hashPassword } from '../utils';
import { Role } from '../common/enums';

export const usersCrudMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const usersModelMock = async (): Promise<User> => {
  const user = new User();

  user.name = faker.person.firstName();
  user.email = faker.internet.email();
  user.password = await hashPassword('12345678');
  user.roles = [Role.Admin];
  user.permissions = ['admin'];

  return user;
};
