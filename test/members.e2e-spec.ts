import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { membersCrudMock, membersModelMock, tokenMock } from '../src/_mocks_';
import { faker } from '@faker-js/faker';
import { MembersModule } from '../src/members/members.module';
import { MembersService } from '../src/members/members.service';
import { CreateMemberDto, UpdateMemberDto } from '../src/members/dtos';

describe('USersController (e2e)', () => {
  let app: INestApplication;
  let token: string | undefined;
  const member = membersModelMock();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, MembersModule],
    })
      .overrideProvider(MembersService)
      .useValue(membersCrudMock)
      .compile();

    token = await tokenMock();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/members (GET)', async () => {
    const response = request(app.getHttpServer())
      .get('/members')
      .set({ Authorization: 'Bearer ' + token });

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
      .set({ Authorization: 'Bearer ' + token })
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
      .set({ Authorization: 'Bearer ' + token })
      .send(dto);

    membersCrudMock.update.mockImplementation(() => member);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('/members/id (DELETE)', async () => {
    const id = faker.string.uuid();
    const response = request(app.getHttpServer())
      .delete('/members/' + id)
      .set({ Authorization: 'Bearer ' + token });

    membersCrudMock.delete.mockImplementation(() => member);
    expect((await response).statusCode).toEqual(200);
    expect((await response).body).toBeInstanceOf(Object);
  });
});
