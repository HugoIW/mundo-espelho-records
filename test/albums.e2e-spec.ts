import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { albumsCrudMock, albumsModelMock, tokenMock } from '../src/_mocks_';
import { faker } from '@faker-js/faker';
import { AlbumsModule } from '../src/albums/albums.module';
import { AlbumsService } from '../src/albums/albums.service';
import { CreateAlbumDto, UpdateAlbumDto } from '../src/albums/dtos';

describe('USersController (e2e)', () => {
  let app: INestApplication;
  let token: string | undefined;
  const album = albumsModelMock();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AlbumsModule],
    })
      .overrideProvider(AlbumsService)
      .useValue(albumsCrudMock)
      .compile();

    token = await tokenMock();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/albums (GET)', async () => {
    const response = request(app.getHttpServer())
      .get('/albums')
      .set({ Authorization: 'Bearer ' + token });

    albumsCrudMock.findAll.mockImplementation(() => [album, album, album]);
    expect((await response).statusCode).toEqual(200);
    expect((await response).body).toBeInstanceOf(Array);
  });

  it('/albums (POST)', async () => {
    const dto: CreateAlbumDto = {
      artist: faker.string.uuid(),
      name: faker.string.sample(),
    };

    const response = await request(app.getHttpServer())
      .post('/albums')
      .set({ Authorization: 'Bearer ' + token })
      .send(dto);

    albumsCrudMock.create.mockImplementation(() => album);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('/albums/id (PUT)', async () => {
    const id = faker.string.uuid();
    const dto: UpdateAlbumDto = {
      artist: faker.string.uuid(),
      name: faker.string.sample(),
    };

    const response = await request(app.getHttpServer())
      .put('/albums/' + id)
      .set({ Authorization: 'Bearer ' + token })
      .send(dto);

    albumsCrudMock.update.mockImplementation(() => album);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('/albums/id (DELETE)', async () => {
    const id = faker.string.uuid();
    const response = request(app.getHttpServer())
      .delete('/albums/' + id)
      .set({ Authorization: 'Bearer ' + token });

    albumsCrudMock.delete.mockImplementation(() => album);
    expect((await response).statusCode).toEqual(200);
    expect((await response).body).toBeInstanceOf(Object);
  });
});
