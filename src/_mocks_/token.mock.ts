import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { Role } from '../common/enums';
import { User } from '../users/schemas/user.schema';

export const tokenMock = async () => {
  const jwtService = new JwtService({
    secret: jwtConstants.secret,
  });

  const user = new User();
  user._id = faker.string.uuid();
  user.email = faker.internet.email();
  user.roles = [Role.Admin];
  user.permissions = ['admin'];

  const payload = {
    sub: user._id,
    email: user.email,
    roles: user.roles,
    permissions: user.permissions,
  };

  return await jwtService.signAsync(payload);
};
