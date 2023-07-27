import { Test, TestingModule } from '@nestjs/testing';
import { AlbumsService } from './albums.service';
import { Album } from './schemas/album.schema';
import { getModelToken } from '@nestjs/mongoose';
import { albumsModelMock, albumsCrudMock } from '../_mocks_';
import { faker } from '@faker-js/faker';
import { CreateAlbumDto } from './dtos';
import { HttpException } from '@nestjs/common';

describe('AlbumsService', () => {
  let service: AlbumsService;
  const album = albumsModelMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumsService,
        {
          provide: getModelToken(Album.name),
          useValue: albumsCrudMock,
        },
      ],
    }).compile();

    service = module.get<AlbumsService>(AlbumsService);
  });

  describe('findAll', () => {
    it('should return all albums', async () => {
      albumsCrudMock.find.mockReturnValue([album, album]);
      const albums = await service.findAll('');
      expect(albums).toHaveLength(2);
    });
  });

  describe('create', () => {
    const dto: CreateAlbumDto = {
      artist: faker.string.uuid(),
      name: faker.string.sample(),
    };

    it('should create a new album', async () => {
      albumsCrudMock.find.mockReturnValueOnce([]);
      albumsCrudMock.create.mockReturnValueOnce([album]);
      const created = await service.create(dto);
      expect(created).toHaveLength(1);
    });

    it('should HttpException with a message: "O album já existe para esse artista!"', async () => {
      albumsCrudMock.create.mockReturnValueOnce(album);
      await service.create(dto).catch((e) => {
        expect(e).toBeInstanceOf(HttpException);
        expect(e).toMatchObject({
          message: 'O album já existe para esse artista!',
        });
      });
      expect(albumsCrudMock.create).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    const id = faker.string.uuid();
    const dto: CreateAlbumDto = {
      artist: faker.string.uuid(),
      name: faker.string.sample(),
    };

    it('should update the album', async () => {
      albumsCrudMock.findOneAndUpdate.mockReturnValueOnce([album]);
      const updated = await service.update(id, dto);
      expect(updated).toHaveLength(1);
      expect(albumsCrudMock.findOneAndUpdate).toBeCalledTimes(1);
    });
  });

  describe('delete', () => {
    const id = faker.string.uuid();

    it('should delete the album', async () => {
      albumsCrudMock.findOneAndDelete.mockReturnValueOnce([album]);
      const deleted = await service.delete(id);
      expect(deleted).toHaveLength(1);
      expect(albumsCrudMock.findOneAndDelete).toBeCalledTimes(1);
    });
  });
});
