import { Injectable } from '@nestjs/common';

@Injectable()
export class OccupationService {
  getHello(): string {
    return 'Hello World!';
  }
}
