import { Test, TestingModule } from '@nestjs/testing';
import { ArtistsService } from './artists.service';
import { getModelToken } from '@nestjs/mongoose';
import { Artist } from './schemas/artist.schema';
import { artistsCrudMock, artistsModelMock } from '../_mocks_';
import { faker } from '@faker-js/faker';
import { CreateArtistDto, UpdateArtistDto } from './dtos';
import { HttpException } from '@nestjs/common';

describe('ArtistsService', () => {
  let service: ArtistsService;
  const artist = artistsModelMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistsService,
        {
          provide: getModelToken(Artist.name),
          useValue: artistsCrudMock,
        },
      ],
    }).compile();

    service = module.get<ArtistsService>(ArtistsService);
  });

  describe('findAll', () => {
    it('should return all artists or one artist', async () => {
      artistsCrudMock.find.mockReturnValueOnce([artist]);
      const artists = await service.findAll('');
      expect(artists).toHaveLength(1);
      expect(artistsCrudMock.find).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    const dto: CreateArtistDto = {
      name: faker.string.sample(),
      genre: faker.string.sample(),
      bio: faker.string.sample(),
    };

    it('should create a new artist', async () => {
      artistsCrudMock.find.mockReturnValueOnce([]);
      artistsCrudMock.create.mockReturnValueOnce([artist]);
      const created = await service.create(dto);
      expect(created).toHaveLength(1);
      expect(artistsCrudMock.create).toBeCalledTimes(1);
    });

    it('should error case artist exist', async () => {
      artistsCrudMock.find.mockReturnValueOnce([artist]);
      artistsCrudMock.create.mockReturnValueOnce([artist]);
      await service.create(dto).catch((e) => {
        expect(e).toBeInstanceOf(HttpException);
        expect(e).toMatchObject({
          message: 'Artista já existe!',
        });
      });
      expect(artistsCrudMock.create).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    const id = faker.string.uuid();
    const dto: UpdateArtistDto = {
      name: faker.string.sample(),
      genre: faker.string.sample(),
      bio: faker.string.sample(),
    };

    it('should create a new artist', async () => {
      artistsCrudMock.findOneAndUpdate.mockReturnValueOnce([artist]);
      const updated = await service.update(id, dto);
      expect(updated).toHaveLength(1);
      expect(artistsCrudMock.findOneAndUpdate).toBeCalledTimes(1);
    });
  });

  describe('delete', () => {
    const id = faker.string.uuid();

    it('should create a new artist', async () => {
      artistsCrudMock.findOneAndDelete.mockReturnValueOnce([artist]);
      const deleted = await service.delete(id);
      expect(deleted).toHaveLength(1);
      expect(artistsCrudMock.findOneAndDelete).toBeCalledTimes(1);
    });
  });
});
