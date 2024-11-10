import { Test, TestingModule } from '@nestjs/testing';
import { ArriendoController } from './arriendo.controller';

describe('ArriendoController', () => {
  let controller: ArriendoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArriendoController],
    }).compile();

    controller = module.get<ArriendoController>(ArriendoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
