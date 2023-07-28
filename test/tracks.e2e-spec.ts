import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { tracksCrudMock, tracksModelMock } from '../src/_mocks_';
import { faker } from '@faker-js/faker';
import { TracksModule } from '../src/tracks/tracks.module';
import { TracksService } from '../src/tracks/tracks.service';
import { CreateTrackDto, UpdateTrackDto } from '../src/tracks/dtos';

describe('USersController (e2e)', () => {
  let app: INestApplication;
  const track = tracksModelMock();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TracksModule],
    })
      .overrideProvider(TracksService)
      .useValue(tracksCrudMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tracks (GET)', async () => {
    const response = request(app.getHttpServer()).get('/tracks');

    tracksCrudMock.findAll.mockImplementation(() => [track, track, track]);
    expect((await response).statusCode).toEqual(200);
    expect((await response).body).toBeInstanceOf(Array);
  });

  it('/tracks (POST)', async () => {
    const dto: CreateTrackDto = {
      album: faker.string.uuid(),
      name: faker.string.sample(),
      release: faker.date.anytime(),
    };

    const response = await request(app.getHttpServer())
      .post('/tracks')
      .send(dto);

    tracksCrudMock.create.mockImplementation(() => track);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('/tracks/id (PUT)', async () => {
    const id = faker.string.uuid();
    const dto: UpdateTrackDto = {
      album: faker.string.uuid(),
      name: faker.string.sample(),
      release: faker.date.anytime(),
    };

    const response = await request(app.getHttpServer())
      .put('/tracks/' + id)
      .send(dto);

    tracksCrudMock.update.mockImplementation(() => track);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('/tracks/id (DELETE)', async () => {
    const id = faker.string.uuid();
    const response = request(app.getHttpServer()).delete('/tracks/' + id);

    tracksCrudMock.delete.mockImplementation(() => track);
    expect((await response).statusCode).toEqual(200);
    expect((await response).body).toBeInstanceOf(Object);
  });
});
