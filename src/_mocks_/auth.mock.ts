import { faker } from '@faker-js/faker';

export const authSignInMock = {
  email: faker.internet.email(),
  password: faker.string.sample(),
};
