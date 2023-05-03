import { Test, TestingModule } from '@nestjs/testing';
import { OtherController } from './other.controller';
import { OtherService } from './other.service';

describe('OtherController', () => {
  let otherController: OtherController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OtherController],
      providers: [OtherService],
    }).compile();

    otherController = app.get<OtherController>(OtherController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(otherController.getHello()).toBe('Hello World!');
    });
  });
});
