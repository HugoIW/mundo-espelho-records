import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { membersCrudMock, membersModelMock } from '../src/_mocks_';
import { faker } from '@faker-js/faker';
import { MembersModule } from '../src/members/members.module';
import { MembersService } from '../src/members/members.service';
import { CreateMemberDto, UpdateMemberDto } from '../src/members/dtos';

describe('USersController (e2e)', () => {
  let app: INestApplication;
  const member = membersModelMock();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, MembersModule],
    })
      .overrideProvider(MembersService)
      .useValue(membersCrudMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/members (GET)', async () => {
    const response = request(app.getHttpServer()).get('/members');

    membersCrudMock.findAll.mockImplementation(() => [member, member, member]);
    expect((await response).statusCode).toEqual(200);
    expect((await response).body).toBeInstanceOf(Array);
  });

  it('/members (POST)', async () => {
    const dto: CreateMemberDto = {
      album: faker.string.uuid(),
      name: faker.string.sample(),
      role: faker.string.sample(),
      bio: faker.string.sample(),
      age: faker.number.int(),
    };

    const response = await request(app.getHttpServer())
      .post('/members')
      .send(dto);

    membersCrudMock.create.mockImplementation(() => member);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('/members/id (PUT)', async () => {
    const id = faker.string.uuid();
    const dto: UpdateMemberDto = {
      album: faker.string.uuid(),
      name: faker.string.sample(),
      role: faker.string.sample(),
      bio: faker.string.sample(),
      age: faker.number.int(),
    };

    const response = await request(app.getHttpServer())
      .put('/members/' + id)
      .send(dto);

    membersCrudMock.update.mockImplementation(() => member);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('/members/id (DELETE)', async () => {
    const id = faker.string.uuid();
    const response = request(app.getHttpServer()).delete('/members/' + id);

    membersCrudMock.delete.mockImplementation(() => member);
    expect((await response).statusCode).toEqual(200);
    expect((await response).body).toBeInstanceOf(Object);
  });
});
