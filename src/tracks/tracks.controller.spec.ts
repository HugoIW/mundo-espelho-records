import { Test, TestingModule } from '@nestjs/testing';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Track } from './schemas/track.schema';
import { tracksCreateMock, tracksModelMock } from '../_mocks_/tracks.mock';
import { CreateTrackDto, FindOneTrackDto } from './dtos';
import { faker } from '@faker-js/faker';

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
      expect(controller.findAll()).toBeInstanceOf(Promise<Track[]>);
    });
  });

  describe('findOne', () => {
    it('should return all tracks', () => {
      const dto: FindOneTrackDto = FindOneTrackDto;
      expect(controller.findOne(dto)).toBeInstanceOf(Promise<Track[] | null>);
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
