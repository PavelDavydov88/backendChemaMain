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

  async getFilms(payload : any) {
    console.log("payload " + payload);
    const [response, data] = await this.filmRepository.sequelize.query(
      "SELECT distinct  on (film.id) film.id,  film.name, film.rating, film.year, genre.name as genre_name, country.name as country_name \n" +
      "FROM film \n" +
      "LEFT OUTER JOIN film_genre ON film_genre.film_id=film.id \n" +
      "LEFT OUTER JOIN genre ON genre.id=film_genre.genre_id \n" +
      "LEFT OUTER JOIN film_country ON film_country.film_id=film.id \n" +
      "LEFT OUTER JOIN country ON country.id=film_country.country_id \n" +
      "where \n" +
      "CASE WHEN ('драма' <> '') then genre.name = 'драма' ELSE genre.name like '%' END \n" +
      "and \n" +
      "CASE WHEN ('США' <> '') then country.name = 'США' ELSE country.name like '%' END  \n" +
      "and \n" +
      "CASE WHEN ('8.1' <> '' and '9.1' <> '') then film.rating BETWEEN 8.1 and 9.0 ELSE film.rating BETWEEN 0 and 10.0 END  \n" +
      "LIMIT 1000 \n" +
      "OFFSET 0;");
    if (!response) return { statusCode: 404, error: 'Not Found', message: `Film with Id=${""} not found` };
    response["listURl"] = ['URL11', 'URL2', 'URL5'];
    return response;
  }



}
