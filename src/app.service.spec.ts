import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('UsersService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return server is running', () => {
      const result = service.getHello();
      expect(result).toBe('Server is running &#128640;');
    });
  });
});
