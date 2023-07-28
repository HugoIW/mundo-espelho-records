import { faker } from '@faker-js/faker';
import { Album } from '../albums/schemas/album.schema';

export const albumsCrudMock = {
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
};

export const albumsModelMock = (): Album => {
  const album = new Album();

  album._id = faker.string.uuid();
  album.artist = faker.string.uuid();
  album.name = faker.string.sample();
  album.created_at = faker.date.anytime();
  album.updatedat = faker.date.anytime();

  return album;
};
