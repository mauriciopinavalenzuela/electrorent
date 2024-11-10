import { Test, TestingModule } from '@nestjs/testing';
import { ArriendoService } from './arriendo.service';

describe('ArriendoService', () => {
  let service: ArriendoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArriendoService],
    }).compile();

    service = module.get<ArriendoService>(ArriendoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
