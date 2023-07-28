import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { artistsCrudMock, artistsModelMock } from '../src/_mocks_';
import { faker } from '@faker-js/faker';
import { ArtistsModule } from '../src/artists/artists.module';
import { ArtistsService } from '../src/artists/artists.service';
import { CreateArtistDto, UpdateArtistDto } from '../src/artists/dtos';

describe('USersController (e2e)', () => {
  let app: INestApplication;
  const artist = artistsModelMock();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ArtistsModule],
    })
      .overrideProvider(ArtistsService)
      .useValue(artistsCrudMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/artists (GET)', async () => {
    const response = request(app.getHttpServer()).get('/artists');

    artistsCrudMock.findAll.mockImplementation(() => [artist, artist, artist]);
    expect((await response).statusCode).toEqual(200);
    expect((await response).body).toBeInstanceOf(Array);
  });

  it('/artists (POST)', async () => {
    const dto: CreateArtistDto = {
      name: faker.string.sample(),
      genre: faker.string.sample(),
      bio: faker.string.sample(),
    };

    const response = await request(app.getHttpServer())
      .post('/artists')
      .send(dto);

    artistsCrudMock.create.mockImplementation(() => artist);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('/artists/id (PUT)', async () => {
    const id = faker.string.uuid();
    const dto: UpdateArtistDto = {
      name: faker.string.sample(),
      genre: faker.string.sample(),
      bio: faker.string.sample(),
    };

    const response = await request(app.getHttpServer())
      .put('/artists/' + id)
      .send(dto);

    artistsCrudMock.update.mockImplementation(() => artist);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('/artists/id (DELETE)', async () => {
    const id = faker.string.uuid();
    const response = request(app.getHttpServer()).delete('/artists/' + id);

    artistsCrudMock.delete.mockImplementation(() => artist);
    expect((await response).statusCode).toEqual(200);
    expect((await response).body).toBeInstanceOf(Object);
  });
});
