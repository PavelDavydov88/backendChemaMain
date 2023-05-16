import { Film } from '@app/shared/models/film.model';
import { HttpStatus, Injectable } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/sequelize";
import { response } from "express";
import { catchError } from "rxjs";

@Injectable()
export class FilmService {
  constructor(@InjectModel(Film) private filmRepository : typeof Film) {
  }

  async getFilmById(id : number) {
    const response = await this.filmRepository.findOne({raw:true, where : {'id' : id}})
    if (!response) return { statusCode: 404, error: 'Not Found', message: `Film with Id=${id} not found` };
    response["listURl"] = ['URL11', 'URL2', 'URL5'];
    return response;

  }

}
