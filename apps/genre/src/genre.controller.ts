import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';

@Controller()
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  getHello(): string {
    return this.genreService.getHello();
  }
}
