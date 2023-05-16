import { Controller, Get, Inject, Param } from "@nestjs/common";
import { AppService } from './app.service';
import {ClientProxy} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(
              @Inject('AUTH_SERVICE') private readonly authService : ClientProxy,
              @Inject('FILM_SERVICE') private readonly filmService : ClientProxy,
              ) {}

  @Get()
  getPersons() {
    return this.authService.send(
        {
          cmd: 'get-user'
        },
        {}
    );
  }

  @Get('/film/:id')
  async getFilmById(@Param("id") id: number){
    console.log('id = ' + id);
    return  this.filmService.send(
      {
        cmd: 'get-film'
      },
      id
    );
  }
}
