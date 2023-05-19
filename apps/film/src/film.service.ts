import { Film } from "@app/shared/models/film.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilterFilmDto } from "./dto/filterFilm.dto";

@Injectable()
export class FilmService {
  constructor(@InjectModel(Film) private filmRepository: typeof Film) {
  }

  async getFilmById(id: number) {
    const response = await this.filmRepository.findOne({ raw: true, where: { "id": id } });
    if (!response) return { statusCode: 404, error: "Not Found", message: `Film with Id=${id} not found` };
    response["listURl"] = ["URL11", "URL2", "URL5"];
    return response;
  }

  async getFilms(filterFilmDto: FilterFilmDto) {
    console.log("filterFilmDto " + filterFilmDto.genre);
    const [response, data] = await this.filmRepository.sequelize.query(
      `SELECT distinct  on (film.id) film.id,  film.name, film.rating, 
      film.year, genre.name as genre_name, country.name as country_name, 
      film.picture_film 
      FROM film 
      LEFT OUTER JOIN film_genre ON film_genre.film_id=film.id
      LEFT OUTER JOIN genre ON genre.id=film_genre.genre_id 
      LEFT OUTER JOIN film_country ON film_country.film_id=film.id 
      LEFT OUTER JOIN country ON country.id=film_country.country_id 
      where 
      CASE WHEN ('${filterFilmDto.genre ? filterFilmDto.genre : ""}' <> '') 
      then genre.name = '${filterFilmDto.genre ? filterFilmDto.genre : ""}' 
      ELSE genre.name like '%' END 
      and 
      CASE WHEN ('${filterFilmDto.country ? filterFilmDto.country : ""}' <> '') 
      then country.name = '${filterFilmDto.country ? filterFilmDto.country : ""}' 
      ELSE country.name like '%' END
      and 
      CASE WHEN (${filterFilmDto.ratingMin ? filterFilmDto.ratingMin : 0} <> 0 
      and ${filterFilmDto.ratingMax ? filterFilmDto.ratingMax : 10} <> 10) 
      then film.rating BETWEEN ${filterFilmDto.ratingMin ? filterFilmDto.ratingMin : 0} 
      and ${filterFilmDto.ratingMax ? filterFilmDto.ratingMax : 10} 
      ELSE film.rating BETWEEN 0 and 10.0 END  
      LIMIT ${filterFilmDto.limit ? filterFilmDto.limit : 1000000} 
      OFFSET ${filterFilmDto.offset ? filterFilmDto.offset : 0};`);
    if (!response) return {
      statusCode: 404,
      error: "Not Found",
      message: `Film with filters = ${filterFilmDto} not found`
    };
    const pictureList: string[] = response.map(movie => {
      return movie["picture_film"];
    });
    response.push({ "pictureList": pictureList });
    return response;
  }


}
