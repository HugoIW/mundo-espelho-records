import { FindAllAlbumsDto } from '../albums/dtos';
import { Artist } from '../artists/schemas/artist.schema';

export const albumsModelMock = {
  exec: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  findOne: jest.fn().mockReturnThis(),
  findOneAndUpdate: jest.fn().mockReturnThis(),
  findOneAndDelete: jest.fn().mockReturnThis(),
  save: jest.fn().mockReturnThis(),
};

export const albumsCreateMock = {
  artist: new Artist,
  name: FindAllAlbumsDto,
};
