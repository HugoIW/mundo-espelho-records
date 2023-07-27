import { faker } from '@faker-js/faker';
import { User } from '../users/schemas/user.schema';
import { hashPassword } from '../utils';

export const usersCrudMock = {
  create: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  findOne: jest.fn().mockReturnThis(),
  findOneAndUpdate: jest.fn().mockReturnThis(),
  findOneAndDelete: jest.fn().mockReturnThis(),
};

export const usersModelMock = async (): Promise<User> => {
  const user = new User();

  user.name = faker.person.firstName();
  user.email = faker.internet.email();
  user.password = await hashPassword('12345678');
  user.roles = [];
  user.permissions = ['admin'];

  return user;
};
