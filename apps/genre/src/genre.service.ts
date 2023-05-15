import { Injectable } from '@nestjs/common';

@Injectable()
export class GenreService {
  getHello(): string {
    return 'Hello World!';
  }
}
