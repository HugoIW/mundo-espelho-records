import { faker } from '@faker-js/faker';
import { Member } from '../members/schemas/member.schema';

export const membersCrudMock = {
  create: jest.fn(),
  find: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
};

export const membersModelMock = (): Member => {
  const member = new Member();

  member._id = faker.string.uuid();
  member.album = faker.string.uuid();
  member.name = faker.string.sample();
  member.role = faker.string.sample();
  member.age = faker.number.int();
  member.bio = faker.string.sample();
  member.created_at = faker.date.anytime();
  member.updated_at = faker.date.anytime();

  return member;
};
