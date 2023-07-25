import { Test, TestingModule } from '@nestjs/testing';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { getModelToken } from '@nestjs/mongoose';
import { Member } from './schemas/member.schema';
import { membersCreateMock, membersModelMock } from '../_mocks_/members.mock';
import { CreateMemberDto, FindOneMemberDto, UpdateMemberDto } from './dtos';
import { faker } from '@faker-js/faker';

describe('MembersController', () => {
  let controller: MembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [
        MembersService,
        {
          provide: getModelToken(Member.name),
          useValue: membersModelMock,
        },
      ],
    }).compile();

    controller = module.get<MembersController>(MembersController);
  });

  describe('findAll', () => {
    it('should return all members', async () => {
      expect(controller.findAll()).toBeInstanceOf(Promise<Member[]>);
    });
  });

  describe('findOne', () => {
    it('should return all members', async () => {
      const dto: FindOneMemberDto = FindOneMemberDto;
      expect(controller.findOne(dto)).toBeInstanceOf(Promise<Member[]>);
    });
  });

  describe('create', () => {
    it('should return an members', async () => {
      const dto: CreateMemberDto = membersCreateMock;
      expect(() => {
        try {
          expect(controller.create(dto)).toBeInstanceOf(Promise<Member>);
        } catch (error) {
          expect(controller.create(dto)).toThrow();
        }
      });
    });
  });

  describe('update', () => {
    it('should return an member', async () => {
      const id = faker.string.uuid();
      const dto: UpdateMemberDto = membersCreateMock;
      expect(controller.update(id, dto)).toBeInstanceOf(Promise<Member>);
    });
  });

  describe('delete', () => {
    it('should return void', async () => {
      const id = faker.string.uuid();
      expect(controller.delete(id)).toBeInstanceOf(Promise<void>);
    });
  });
});
