import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './check.health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });
});
