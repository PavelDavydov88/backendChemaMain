import { Injectable } from '@nestjs/common';

@Injectable()
export class OtherService {
  getHello(): string {
    return 'Hello World!';
  }
}
