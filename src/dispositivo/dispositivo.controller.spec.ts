import { Test, TestingModule } from '@nestjs/testing';
import { DispositivoController } from './dispositivo.controller';

describe('DispositivoController', () => {
  let controller: DispositivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispositivoController],
    }).compile();

    controller = module.get<DispositivoController>(DispositivoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
