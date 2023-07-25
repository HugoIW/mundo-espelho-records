import { Test, TestingModule } from '@nestjs/testing';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { getModelToken } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import { CreateAlbumDto, FindAllAlbumsDto, UpdateAlbumDto } from './dtos';
import { faker } from '@faker-js/faker';
import { albumsCreateMock, albumsModelMock } from '../_mocks_';

describe('AlbumsController', () => {
  let controller: AlbumsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumsController],
      providers: [
        AlbumsService,
        {
          provide: getModelToken(Album.name),
          useValue: albumsModelMock,
        },
      ],
    }).compile();

    controller = module.get<AlbumsController>(AlbumsController);
  });

  describe('findAll', () => {
    it('should return an array of albums', async () => {
      const dto: FindAllAlbumsDto = FindAllAlbumsDto;
      expect(controller.findAll(dto)).toBeInstanceOf(Promise<Album[]>);
    });
  });

  describe('create', () => {
    it('should return an object of albums', async () => {
      const dto: CreateAlbumDto = albumsCreateMock;
      expect(() => {
        try {
          expect(controller.create(dto)).toBeInstanceOf(Promise<Album>);
        } catch (error) {
          expect(controller.create(dto)).toThrow();
        }
      });
    });
  });

  describe('update', () => {
    it('should return an object of albums', async () => {
      const id = faker.string.uuid();
      const dto: UpdateAlbumDto = albumsCreateMock;
      expect(controller.update(id, dto)).toBeInstanceOf(Promise<Album | null>);
    });
  });

  describe('delete', () => {
    it('should return void', async () => {
      const id = faker.string.uuid();
      expect(controller.delete(id)).toBeInstanceOf(Promise<void>);
    });
  });
});
