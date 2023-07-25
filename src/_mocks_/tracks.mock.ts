import { FindAllTrackDto } from '../tracks/dtos';
import { Album } from '../albums/schemas/album.schema';
import { faker } from '@faker-js/faker';

export const tracksModelMock = {
  exec: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  findOne: jest.fn().mockReturnThis(),
  findOneAndUpdate: jest.fn().mockReturnThis(),
  findOneAndDelete: jest.fn().mockReturnThis(),
  save: jest.fn().mockReturnThis(),
};

export const tracksCreateMock = {
  album: new Album(),
  name: FindAllTrackDto,
  release: faker.date.anytime(),
};
