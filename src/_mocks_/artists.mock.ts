import { faker } from '@faker-js/faker';
import { FindOneDto } from '../artists/dtos';

export const artistsModelMock = {
  exec: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  findOne: jest.fn().mockReturnThis(),
  findOneAndUpdate: jest.fn().mockReturnThis(),
  findOneAndDelete: jest.fn().mockReturnThis(),
  save: jest.fn().mockReturnThis(),
};

export const artistsCreateMock = {
  name: FindOneDto,
  genre: faker.string.sample(),
  bio: faker.string.sample(),
};
