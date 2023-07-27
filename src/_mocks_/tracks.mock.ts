import { Track } from '../tracks/schemas/track.schema';
import { faker } from '@faker-js/faker';

export const tracksCrudMock = {
  create: jest.fn(),
  find: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
};

export const tracksModelMock = (): Track => {
  const track = new Track();

  track._id = faker.string.uuid();
  track.album = faker.string.uuid();
  track.name = faker.string.sample();
  track.release = faker.date.anytime();
  track.created_at = faker.date.anytime();
  track.updated_at = faker.date.anytime();

  return track;
};
