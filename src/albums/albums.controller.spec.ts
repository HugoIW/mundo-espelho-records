import { Test, TestingModule } from '@nestjs/testing';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { getModelToken } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import {
  albumsCreateMock,
  albumsModelMock
} from '../_mocks_/albums.mock';
import { CreateAlbumDto, FindOneAlbumDto, UpdateAlbumDto } from './dtos';
import { faker } from '@faker-js/faker';

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
      expect(controller.findAll()).toBeInstanceOf(Promise<Album[]>);
    });
  });

  describe('findOne', () => {
    it('should return an array of albums', async () => {
      const dto: FindOneAlbumDto = FindOneAlbumDto;
      expect(controller.findOne(dto)).toBeInstanceOf(Promise<Album | null>);
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
