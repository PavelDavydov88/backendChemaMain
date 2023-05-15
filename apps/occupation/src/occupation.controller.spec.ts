import { Test, TestingModule } from '@nestjs/testing';
import { OccupationController } from './occupation.controller';
import { OccupationService } from './occupation.service';

describe('OccupationController', () => {
  let occupationController: OccupationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OccupationController],
      providers: [OccupationService],
    }).compile();

    occupationController = app.get<OccupationController>(OccupationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(occupationController.getHello()).toBe('Hello World!');
    });
  });
});
