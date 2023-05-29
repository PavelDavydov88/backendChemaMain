import { Film } from "@app/shared/models/film.model";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilterFilmDto } from "./dto/filterFilm.dto";
import { FilmCountry } from "@app/shared/models/film_country.model";
import { Country } from "@app/shared/models/country.model";
import { Genre } from "@app/shared/models/genre.model";
import { FilmGenre } from "@app/shared/models/film_genre.model";
import { FilmOccupation } from "@app/shared/models/film_occupation.model";
import { Occupation } from "@app/shared/models/occupation.model";
import { Person } from "@app/shared/models/person.model";
import { MainActor } from "@app/shared/models/main_actor.model";
import { SimilarFilm } from "@app/shared/models/similar_film.model";
import { CreatFilmDto } from "./dto/creatFilm.dto";
import { UpdateFilmDto } from "./dto/updateFilm.dto";
import { CreateOccupationDto } from "../../occupation/src/dto/createOccupation.dto";
import { DeleteFilmDto } from "./dto/deleteFilm.dto";

@Injectable()
export class FilmService {
  constructor(@InjectModel(Film) private filmRepository: typeof Film,
              @InjectModel(Country) private countryRepository: typeof Country,
              @InjectModel(FilmCountry) private filmCountryRepository: typeof FilmCountry,
              @InjectModel(Genre) private genreRepository: typeof Genre,
              @InjectModel(FilmGenre) private filmGenreRepository: typeof FilmGenre,
              @InjectModel(FilmOccupation) private filmOccupationRepository: typeof FilmOccupation,
              @InjectModel(Occupation) private occupationRepository: typeof Occupation,
              @InjectModel(Person) private personRepository: typeof Person,
              @InjectModel(MainActor) private mainActorRepository: typeof MainActor,
              @InjectModel(SimilarFilm) private similarFilmRepository: typeof SimilarFilm
  ) {
  }

  async getFilmById(id: number) {
    const response = await this.filmRepository.findOne({ raw: true, where: { "id": id } });
    if (!response) return { statusCode: 404, error: "Not Found", message: `Film with Id=${id} not found` };
    const country = await this.filmCountryRepository.findAll({
      where: { film_id: id },
      raw: true,
      attributes: [],
      include: [{ model: Country, attributes: ["name"], required: false }]
    });
    response["country"] = country.map(country => {
      return country["country.name"];
    });
    const genre = await this.filmGenreRepository.findAll({
      where: { film_id: id },
      raw: true,
      attributes: [],
      include: [{ model: Genre, attributes: ["name"], required: false }]
    });
    response["genre"] = genre.map(genre => {
      return genre["genre.name"];
    });
    const filmDirector = await this.filmOccupationRepository.findAll({
      where: { film_id: id, occupation_id: 1 },
      raw: true,
      attributes: [],
      include: [{ model: Person, attributes: ["id", "name", "picture_URL"], required: false }]
    });
    response["filmDirector"] = filmDirector;
    const filmWriter = await this.filmOccupationRepository.findAll({
      where: { film_id: id, occupation_id: 15 },
      raw: true,
      attributes: [],
      include: [{ model: Person, attributes: ["id", "name", "picture_URL"], required: false }]
    });
    response["filmWriter"] = filmWriter;
    const filmProducer = await this.filmOccupationRepository.findAll({
      where: { film_id: id, occupation_id: 6 },
      raw: true,
      attributes: [],
      include: [{ model: Person, attributes: ["id", "name", "picture_URL"], required: false }]
    });
    response["filmProducer"] = filmProducer;
    const filmOperator = await this.filmOccupationRepository.findAll({
      where: { film_id: id, occupation_id: 10 },
      raw: true,
      attributes: [],
      include: [{ model: Person, attributes: ["id", "name", "picture_URL"], required: false }]
    });
    response["filmOperator"] = filmOperator;
    const filmComposer = await this.filmOccupationRepository.findAll({
      where: { film_id: id, occupation_id: 16 },
      raw: true,
      attributes: [],
      include: [{ model: Person, attributes: ["id", "name", "picture_URL"], required: false }]
    });
    response["filmComposer"] = filmComposer;
    const filmArtist = await this.filmOccupationRepository.findAll({
      where: { film_id: id, occupation_id: 17 },
      raw: true,
      attributes: [],
      include: [{ model: Person, attributes: ["id", "name", "picture_URL"], required: false }]
    });
    response["filmArtist"] = filmArtist;
    const filmEditor = await this.filmOccupationRepository.findAll({
      where: { film_id: id, occupation_id: 9 },
      raw: true,
      attributes: [],
      include: [{ model: Person, attributes: ["id", "name", "picture_URL"], required: false }]
    });
    response["filmEditor"] = filmEditor;
    const mainActors = await this.mainActorRepository.findAll({
      where: { film_id: id },
      raw: true,
      attributes: [],
      include: [{ model: Person, attributes: ["id", "name", "picture_URL"], required: false }]
    });
    response["mainActors"] = mainActors;
    const filmTranslators = await this.filmOccupationRepository.findAll({
      where: { film_id: id, occupation_id: 14 },
      raw: true,
      attributes: [],
      include: [{ model: Person, attributes: ["id", "name", "picture_URL"], required: false }]
    });
    response["filmTranslators"] = filmTranslators;
    const [similarFilms] = await this.similarFilmRepository.sequelize.query(
      `select film.name , film.id
            from film 
            LEFT OUTER JOIN similar_film ON similar_film.similar_film_id=film.id
            where similar_film.film_id = ${id}`);
    response["similarFilms"] = similarFilms;

    return response;
  }

  async getFilms(filterFilmDto: FilterFilmDto) {
    console.log("filterFilmDto " + filterFilmDto.genre);
    const [response] = await this.filmRepository.sequelize.query(
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


  async creatFilm(creatFilmDto: CreatFilmDto) {
    console.log("creatFilmDto = " + creatFilmDto);
    const getFilm = await this.filmRepository.findOne({
      where: { name: creatFilmDto.name }
    });
    if (getFilm)
      throw new HttpException("такой фильм уже есть", HttpStatus.BAD_REQUEST);
    const createFilm = await this.filmRepository.create(creatFilmDto);
    const countries = await this.countryRepository.findAll({attributes : ['id', 'name'], raw: true,});
    const genres = await this.genreRepository.findAll({attributes : ['id', 'name'], raw: true,});
    const persons = await this.personRepository.findAll({attributes : ['id', 'name'], raw: true,});
    const films = await this.filmRepository.findAll({attributes : ['id', 'name'], raw: true,});

    const countriesFilm = creatFilmDto.country;
    const genresFilm = creatFilmDto.genre;
    const filmDirectors = creatFilmDto.filmDirector;
    const filmWriters = creatFilmDto.filmWriter;
    const filmProducers = creatFilmDto.filmProducer;
    const filmOperators = creatFilmDto.filmOperator;
    const filmComposers = creatFilmDto.filmComposer;
    const filmArtists = creatFilmDto.filmArtist;
    const filmEditors = creatFilmDto.filmEditor;
    const mainActors = creatFilmDto.mainActors;
    const filmTranslators = creatFilmDto.filmTranslators;
    const similarFilms = creatFilmDto.similarFilms;

const idCountries : number[] = countries.filter(country => countriesFilm.includes(country.name)).map(id => id.id)
    await this.saveArrayToFilmCountry(createFilm.id, idCountries, this.filmCountryRepository)

    const idGenres : number[] = genres.filter(genre => genresFilm.includes(genre.name)).map(id => id.id)
    await this.saveArrayToFilmGenre(createFilm.id, idGenres, this.filmGenreRepository)

    const idFilmDirectors : number[] = persons.filter(person => filmDirectors.includes(person.name)).map(id => id.id)
    const director = await this.occupationRepository.findOne({where : {name : "Режиссер"}})
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmDirectors, this.filmOccupationRepository, director.id)

    const idFilmWriters : number[] = persons.filter(person => filmWriters.includes(person.name)).map(id => id.id)
    const writer = await this.occupationRepository.findOne({where : {name : "Сценарист"}})
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmWriters, this.filmOccupationRepository, writer.id)

    const idFilmProducers : number[] = persons.filter(person => filmProducers.includes(person.name)).map(id => id.id)
    const producer = await this.occupationRepository.findOne({where : {name : "Продюсер"}})
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmProducers, this.filmOccupationRepository, producer.id)

    const idFilmOperators : number[] = persons.filter(person => filmOperators.includes(person.name)).map(id => id.id)
    const operator = await this.occupationRepository.findOne({where : {name : "Оператор"}})
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmOperators, this.filmOccupationRepository, operator.id)

    const idFilmComposers : number[] = persons.filter(person => filmComposers.includes(person.name)).map(id => id.id)
    const composer = await this.occupationRepository.findOne({where : {name : "Композитор"}})
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmComposers, this.filmOccupationRepository, composer.id)

    const idFilmArtists : number[] = persons.filter(person => filmArtists.includes(person.name)).map(id => id.id)
    const artist = await this.occupationRepository.findOne({where : {name : "Актер"}})
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmArtists, this.filmOccupationRepository, artist.id)

    const idFilmEditors : number[] = persons.filter(person => filmEditors.includes(person.name)).map(id => id.id)
    const editor = await this.occupationRepository.findOne({where : {name : "Монтажер"}})
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmEditors, this.filmOccupationRepository, editor.id)

    const idMainActors : number[] = persons.filter(person => mainActors.includes(person.name)).map(id => id.id)
    await this.saveArrayToMainActor(createFilm.id, idMainActors, this.mainActorRepository)

    const idFilmTranslators : number[] = persons.filter(person => filmTranslators.includes(person.name)).map(id => id.id)
    const translator = await this.occupationRepository.findOne({where : {name : "Актер дубляжа"}})
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmTranslators, this.filmOccupationRepository, translator.id)

    const idSimilarFilms : number[] = films.filter(film => similarFilms.includes(film.name)).map(id => id.id)
    await this.saveArrayToSimilarFilm(createFilm.id, idSimilarFilms, this.similarFilmRepository)

    return createFilm;
  }

  private async saveArrayToFilmCountry(idFilm : number, arrayIdEntity : number[], model : any){
    for (let i = 0; i < arrayIdEntity.length; i++) {
      await model.create({film_id : idFilm, country_id :  arrayIdEntity[i]})
    }
  }

  private async saveArrayToFilmGenre(idFilm : number, arrayIdEntity : number[], model : any){
    for (let i = 0; i < arrayIdEntity.length; i++) {
      await model.create({film_id : idFilm, genre_id :  arrayIdEntity[i]})
    }
  }

  private async saveArrayToSimilarFilm(idFilm : number, arrayIdEntity : number[], model : any){
    for (let i = 0; i < arrayIdEntity.length; i++) {
      await model.create({film_id : idFilm, similar_film_id :  arrayIdEntity[i]})
    }
  }

  private async saveArrayToPerson_Occupation(idFilm : number, arrayIdEntity : number[], model : any, occupationId : number){
    for (let i = 0; i < arrayIdEntity.length; i++) {
      await model.create({film_id : idFilm, person_id :  arrayIdEntity[i], occupation_id : occupationId})
    }
  }

  private async saveArrayToMainActor(idFilm : number, arrayIdEntity : number[], model : any){
    for (let i = 0; i < arrayIdEntity.length; i++) {
      await model.create({film_id : idFilm, person_id :  arrayIdEntity[i]})
    }
  }

  async updateFilm(dto: UpdateFilmDto) {
    const film = await this.filmRepository.findOne({ raw: true, where: { "name": dto.oldName } });
    if (!film) return { statusCode: 404, error: "Not Found", message: `Film with name= ${dto.oldName} not found` };
    return await this.filmRepository.update({name : dto.newName}, { where: { id: film.id } });
  }

  async deleteFilm(dto: DeleteFilmDto) {
    const id = await this.filmRepository.findOne({ where: { name: dto.name } });
    if (id) {
        await this.filmRepository.destroy({ where: { id: id.id } });
      console.log("id.picture_film = "+ id.picture_film);
        return id.picture_film;
    } else {
      console.log("Такого фильма не существует");
      return  new HttpException("Такого фильма не существует", HttpStatus.BAD_REQUEST);;
    }
  }
}
