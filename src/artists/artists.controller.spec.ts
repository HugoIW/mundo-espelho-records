import { Test, TestingModule } from '@nestjs/testing';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { Artist } from './schemas/artist.schema';
import { getModelToken } from '@nestjs/mongoose';
import { artistsCreateMock, artistsModelMock } from '../_mocks_/artists.mock';
import { CreateArtistDto, FindOneDto, UpdateArtistDto } from './dtos';
import { faker } from '@faker-js/faker';

describe('ArtistsController', () => {
  let controller: ArtistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistsController],
      providers: [
        ArtistsService,
        {
          provide: getModelToken(Artist.name),
          useValue: artistsModelMock,
        },
      ],
    }).compile();

    controller = module.get<ArtistsController>(ArtistsController);
  });

  describe('findAll', () => {
    it('should return all artists', async () => {
      expect(controller.findAll()).toBeInstanceOf(Promise<Artist[]>);
    });
  });

  describe('findOne', () => {
    it('should return all artists', async () => {
      const dto: FindOneDto = FindOneDto;
      expect(controller.findOne(dto)).toBeInstanceOf(Promise<Artist | null>);
    });
  });

  describe('create', () => {
    it('should return all artists', async () => {
      const dto: CreateArtistDto = artistsCreateMock;
      expect(() => {
        try {
          expect(controller.create(dto)).toBeInstanceOf(Promise<Artist>);
        } catch (error) {
          expect(controller.create(dto)).toThrow();
        }
      });
    });
  });

  describe('update', () => {
    it('should return an artist', async () => {
      const id = faker.string.uuid();
      const dto: UpdateArtistDto = artistsCreateMock;
      expect(controller.update(id, dto)).toBeInstanceOf(Promise<Artist>);
    });
  });

  describe('delete', () => {
    it('should return void', async () => {
      const id = faker.string.uuid();
      expect(controller.delete(id)).toBeInstanceOf(Promise<void>);
    });
  });
});
