import { faker } from '@faker-js/faker';

export const userModelMock = {
  exec: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  findOne: jest.fn().mockReturnThis(),
  findOneAndUpdate: jest.fn().mockReturnThis(),
  findOneAndDelete: jest.fn().mockReturnThis(),
  save: jest.fn().mockReturnThis(),
};

export const userCreateMock = {
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.string.uuid(),
  roles: [],
  permissions: ['admin'],
};
