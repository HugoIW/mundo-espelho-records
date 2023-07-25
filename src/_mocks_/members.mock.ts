import { faker } from '@faker-js/faker';
import { FindAllMemberDto } from '../members/dtos';
import { Album } from '../albums/schemas/album.schema';

export const membersModelMock = {
  exec: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  findOne: jest.fn().mockReturnThis(),
  findOneAndUpdate: jest.fn().mockReturnThis(),
  findOneAndDelete: jest.fn().mockReturnThis(),
  save: jest.fn().mockReturnThis(),
};

export const membersCreateMock = {
  album: new Album,
  name: FindAllMemberDto,
  role: faker.string.sample(),
  bio: faker.string.sample(),
  age: faker.number.int(),
};
