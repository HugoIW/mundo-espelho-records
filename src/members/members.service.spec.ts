import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';
import { getModelToken } from '@nestjs/mongoose';
import { Member } from './schemas/member.schema';
import { membersCrudMock, membersModelMock } from '../_mocks_';
import { CreateMemberDto, UpdateMemberDto } from './dtos';
import { faker } from '@faker-js/faker';

describe('MembersService', () => {
  let service: MembersService;
  const member = membersModelMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        {
          provide: getModelToken(Member.name),
          useValue: membersCrudMock,
        },
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
  });

  describe('findAll', () => {
    it('should return all members', async () => {
      membersCrudMock.find.mockReturnValueOnce([member]);
      const artists = await service.findAll('');
      expect(artists).toHaveLength(1);
      expect(membersCrudMock.find).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    const dto: CreateMemberDto = {
      album: faker.string.uuid(),
      name: faker.string.sample(),
      role: faker.string.sample(),
      bio: faker.string.sample(),
      age: faker.number.int(),
    };

    it('should return a new member', async () => {
      membersCrudMock.create.mockReturnValueOnce([member]);
      const created = await service.create(dto);
      expect(created).toHaveLength(1);
      expect(membersCrudMock.create).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    const id = faker.string.uuid();
    const dto: UpdateMemberDto = {
      album: faker.string.uuid(),
      name: faker.string.sample(),
      role: faker.string.sample(),
      bio: faker.string.sample(),
      age: faker.number.int(),
    };

    it('should return a update member', async () => {
      membersCrudMock.findOneAndUpdate.mockReturnValueOnce([member]);
      const updated = await service.update(id, dto);
      expect(updated).toHaveLength(1);
      expect(membersCrudMock.findOneAndUpdate).toBeCalledTimes(1);
    });
  });

  describe('delete', () => {
    const id = faker.string.uuid();

    it('should return a delete member', async () => {
      membersCrudMock.findOneAndDelete.mockReturnValueOnce([member]);
      const deleted = await service.delete(id);
      expect(deleted).toHaveLength(1);
      expect(membersCrudMock.findOneAndDelete).toBeCalledTimes(1);
    });
  });
});
