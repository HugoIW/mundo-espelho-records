import { Test, TestingModule } from '@nestjs/testing';
import { TracksService } from './tracks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Track } from './schemas/track.schema';
import { tracksCrudMock, tracksModelMock } from '../_mocks_';
import { CreateTrackDto, UpdateTrackDto } from './dtos';
import { faker } from '@faker-js/faker';
import { HttpException } from '@nestjs/common';

describe('TracksService', () => {
  let service: TracksService;
  const track = tracksModelMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TracksService,
        {
          provide: getModelToken(Track.name),
          useValue: tracksCrudMock,
        },
      ],
    }).compile();

    service = module.get<TracksService>(TracksService);
  });

  describe('findAll', () => {
    it('should return all tracks', async () => {
      tracksCrudMock.find.mockReturnValueOnce([track]);
      const tracks = await service.findAll('');
      expect(tracks).toHaveLength(1);
      expect(tracksCrudMock.find).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    const dto: CreateTrackDto = {
      album: faker.string.uuid(),
      name: faker.string.sample(),
      release: faker.date.anytime(),
    };

    it('should return a new track', async () => {
      tracksCrudMock.find.mockReturnValueOnce([]);
      tracksCrudMock.create.mockReturnValueOnce([track]);
      const created = await service.create(dto);
      expect(created).toHaveLength(1);
      expect(tracksCrudMock.create).toBeCalledTimes(1);
    });

    it('should error HttpException with message: "Já existe uma música com esse nome no album!"', async () => {
      tracksCrudMock.find.mockReturnValueOnce([track]);
      tracksCrudMock.create.mockReturnValueOnce([track]);
      await service.create(dto).catch((e) => {
        expect(e).toBeInstanceOf(HttpException);
        expect(e).toMatchObject({
          message: 'Já existe uma música com esse nome no album!',
        });
      });
      expect(tracksCrudMock.create).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    const id = faker.string.uuid();
    const dto: UpdateTrackDto = {
      album: faker.string.uuid(),
      name: faker.string.sample(),
      release: faker.date.anytime(),
    };

    it('should return a update track', async () => {
      tracksCrudMock.findOneAndUpdate.mockReturnValueOnce([track]);
      const updated = await service.update(id, dto);
      expect(updated).toHaveLength(1);
      expect(tracksCrudMock.findOneAndUpdate).toBeCalledTimes(1);
    });
  });

  describe('delete', () => {
    const id = faker.string.uuid();

    it('should return a delete track', async () => {
      tracksCrudMock.findOneAndDelete.mockReturnValueOnce([track]);
      const deleted = await service.delete(id);
      expect(deleted).toHaveLength(1);
      expect(tracksCrudMock.findOneAndDelete).toBeCalledTimes(1);
    });
  });
});
