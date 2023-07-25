import { Test, TestingModule } from '@nestjs/testing';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Track } from './schemas/track.schema';
import { CreateTrackDto, FindAllTrackDto } from './dtos';
import { faker } from '@faker-js/faker';
import { tracksCreateMock, tracksModelMock } from '../_mocks_';

describe('TracksController', () => {
  let controller: TracksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TracksController],
      providers: [
        TracksService,
        {
          provide: getModelToken(Track.name),
          useValue: tracksModelMock,
        },
      ],
    }).compile();

    controller = module.get<TracksController>(TracksController);
  });

  describe('findAll', () => {
    it('should return all tracks', () => {
      const dto: FindAllTrackDto = FindAllTrackDto
      expect(controller.findAll(dto)).toBeInstanceOf(Promise<Track[]>);
    });
  });

  describe('create', () => {
    it('should return an track', () => {
      const dto: CreateTrackDto = tracksCreateMock;
      expect(() => {
        try {
          expect(controller.create(dto)).toBeInstanceOf(Promise<Track>);
        } catch (error) {
          expect(controller.create(dto)).toThrow();
        }
      });
    });
  });

  describe('update', () => {
    it('should return an track', () => {
      const id = faker.string.uuid();
      const dto: CreateTrackDto = tracksCreateMock;
      expect(controller.update(id, dto)).toBeInstanceOf(Promise<Track>);
    });
  });

  describe('delete', () => {
    it('should return void', () => {
      const id = faker.string.uuid();
      expect(controller.delete(id)).toBeInstanceOf(Promise<void>);
    });
  });
});
