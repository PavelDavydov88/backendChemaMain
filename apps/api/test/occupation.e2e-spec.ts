import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from "../src/app.module";
import { SharedModule } from "@app/shared/modules/shared/shared.module";
import {bootstrap} from '../src/main'
describe('AppController (e2e)', () => {
  // let app: INestApplication;

  // beforeEach(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule,SharedModule],
  //   }).compile();
  //
  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });


  it('/ (GET)', async () => {
    await request(await bootstrap())
      .get('/film/hi')
      .expect(200)
      .expect('hello from film controller!');
  });
});
