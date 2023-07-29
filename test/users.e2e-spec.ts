import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersModule } from '../src/users/users.module';
import { tokenMock, usersCrudMock, usersModelMock } from '../src/_mocks_';
import { UsersService } from '../src/users/users.service';
import { faker } from '@faker-js/faker';
import { CreateUserDto, UpdateUserDto } from '../src/users/dtos';
import { Role } from '../src/common/enums';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let token: string | undefined;
  const user = usersModelMock();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersCrudMock)
      .compile();

    token = await tokenMock();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', async () => {
    const response = request(app.getHttpServer())
      .get('/users')
      .set({ Authorization: 'Bearer ' + token });

    usersCrudMock.findAll.mockImplementation(() => [user, user, user]);
    expect((await response).statusCode).toEqual(200);
    expect((await response).body).toBeInstanceOf(Array);
  });

  it('/users/find (GET)', async () => {
    const response = request(app.getHttpServer())
      .get('/users/find')
      .set({ Authorization: 'Bearer ' + token })
      .query({ email: faker.internet.email() });

    usersCrudMock.findOne.mockImplementation(() => user);
    expect((await response).statusCode).toEqual(200);
    expect((await response).body).toBeInstanceOf(Object);
  });

  it('/users (POST)', async () => {
    const dto: CreateUserDto = {
      name: faker.string.sample(),
      email: faker.internet.email(),
      password: faker.string.sample(12),
      roles: [Role.Admin],
      permissions: ['admin'],
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .set({ Authorization: 'Bearer ' + token })
      .send(dto);

    usersCrudMock.create.mockImplementation(() => user);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('/users/id (PUT)', async () => {
    const id = faker.string.uuid();
    const dto: UpdateUserDto = {
      name: faker.string.sample(),
      email: faker.internet.email(),
      password: faker.string.sample(12),
      roles: [Role.Admin],
      permissions: ['admin'],
    };

    const response = await request(app.getHttpServer())
      .put('/users/' + id)
      .set({ Authorization: 'Bearer ' + token })
      .send(dto);

    usersCrudMock.update.mockImplementation(() => user);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('/users/id (DELETE)', async () => {
    const id = faker.string.uuid();
    const response = request(app.getHttpServer())
      .delete('/users/' + id)
      .set({ Authorization: 'Bearer ' + token });

    usersCrudMock.delete.mockImplementation(() => user);
    expect((await response).statusCode).toEqual(200);
    expect((await response).body).toBeInstanceOf(Object);
  });
});
