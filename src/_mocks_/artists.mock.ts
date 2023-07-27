import { faker } from '@faker-js/faker';
import { Artist } from '../artists/schemas/artist.schema';

export const artistsCrudMock = {
  find: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
};

export const artistsModelMock = (): Artist => {
  const artist = new Artist();

  artist._id = faker.string.uuid();
  artist.name = faker.string.sample();
  artist.genre = faker.string.sample();
  artist.bio = faker.string.sample();
  artist.created_at = faker.date.anytime();
  artist.updated_at = faker.date.anytime();

  return artist;
};
