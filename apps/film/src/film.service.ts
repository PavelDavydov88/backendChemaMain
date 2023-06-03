import { Film } from "@app/shared/models/film.model";
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
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
import { DeleteFilmDto } from "./dto/deleteFilm.dto";
import sequelize, { Op, where } from "sequelize";
import { RpcException } from "@nestjs/microservices";

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

    if (!response) throw new RpcException(
      new NotFoundException("Такого фильма не существует!"));

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
    const genre = filterFilmDto.genre === undefined ? "0" : filterFilmDto.genre;
    const country = filterFilmDto.country === undefined ? "0" : filterFilmDto.country;
    const artist = filterFilmDto.artist === undefined ? "0" : filterFilmDto.artist;
    const writer = filterFilmDto.writer === undefined ? "0" : filterFilmDto.writer;
    const offset = filterFilmDto.offset === undefined ? null : filterFilmDto.offset;
    const limit = filterFilmDto.limit === undefined ? null : filterFilmDto.limit;

    let response = [];

    const idGenreFilter = (await this.genreRepository.findOne(
      { where: { name: genre }, raw: true, attributes: ["id"] }));
    if (idGenreFilter != null) {
      const filterGenre = await this.filmGenreRepository.findAll({
        where: { genre_id: idGenreFilter.id },
        raw: true,
        attributes: ["film_id"]
      });
      const arrayFilmIdGenre: number[] = filterGenre.map(film => film.film_id);
      response.push(arrayFilmIdGenre);
    }

    const idCountryFilter = (await this.countryRepository.findOne(
      { where: { name: country }, raw: true, attributes: ["id"] }));
    if (idCountryFilter != null) {
      const filterCountry = await this.filmCountryRepository.findAll({
        where: { country_id: idCountryFilter.id },
        raw: true,
        attributes: ["film_id"]
      });
      const arrayFilmIdCountry: number[] = filterCountry.map(film => film.film_id);
      response.push(arrayFilmIdCountry);
    }

    const filterRatingMin = (await this.filmRepository.findAll({
      where: { rating: { [Op.gte]: filterFilmDto.ratingMin } }
    }));
    if (filterRatingMin.length) {
      const arrayFilmIdRatingMin: number[] = filterRatingMin.map(film => film.id);
      response.push(arrayFilmIdRatingMin);
    }

    const filterRatingMax = await this.filmRepository.findAll({
      where: { rating: { [Op.lte]: filterFilmDto.ratingMax } }
    });
    console.log("filterRatingMax" + filterRatingMax);
    if (filterRatingMax.length) {
      const arrayFilmIdRatingMax: number[] = filterRatingMax.map(film => film.id);
      response.push(arrayFilmIdRatingMax);
    }

    const filterEstimationMin = await this.filmRepository.findAll({
      where: { estimation: { [Op.gte]: filterFilmDto.estimationMin } }
    });
    if (filterEstimationMin.length) {
      const arrayFilmIdEstimationMin: number[] = filterEstimationMin.map(film => film.id);
      response.push(arrayFilmIdEstimationMin);
    }

    const filterEstimationMax = await this.filmRepository.findAll({
      where: { estimation: { [Op.lte]: filterFilmDto.estimationMax } }
    });
    if (filterEstimationMax.length) {
      const arrayFilmIdEstimationMax: number[] = filterEstimationMax.map(film => film.id);
      response.push(arrayFilmIdEstimationMax);
    }

    const idArtistFilter = (await this.personRepository.findOne(
      { where: { name: artist }, raw: true, attributes: ["id"] }));
    if (idArtistFilter != null) {
      const filterArtist = await this.filmOccupationRepository.findAll({
        where: { person_id: idArtistFilter.id },
        raw: true,
        attributes: [[sequelize.fn("DISTINCT", sequelize.col("film_id")), "film_id"]]
      });
      const arrayFilmIdArtist: number[] = filterArtist.map(film => film.film_id);
      response.push(arrayFilmIdArtist);
    }

    const idWriterFilter = (await this.personRepository.findOne(
      { where: { name: writer }, raw: true, attributes: ["id"] }));
    if (idWriterFilter != null) {
      const filterWriter = await this.filmOccupationRepository.findAll({
        where: { person_id: idWriterFilter.id },
        raw: true,
        attributes: [[sequelize.fn("DISTINCT", sequelize.col("film_id")), "film_id"]]
      });
      const arrayFilmIdWriter: number[] = filterWriter.map(film => film.film_id);
      response.push(arrayFilmIdWriter);
    }

    let distinctId: number [] = response[0];

    function intersect(a, b) {
      let new_arr = [];
      for (let element_a of a) {
        for (let element_b of b) {
          if (element_b == element_a) {
            new_arr.push(element_a);
          }
        }
      }
      return new_arr;
    };

    for (let i = 1; i < response.length; i++) {
      distinctId = intersect(distinctId, response[i]);
    }
    if ((distinctId == null) || (!distinctId.length)) throw new RpcException(
      new NotFoundException(`Нет подходящих фильмов с такими условиями ${JSON.stringify(filterFilmDto)}!`));

    const finalFilmFilter : Film[] = await this.filmRepository.findAll({where: {"id" :distinctId}, offset : offset, limit : limit})

    return finalFilmFilter;
  }


  async creatFilm(creatFilmDto: CreatFilmDto) {
    const getFilm = await this.filmRepository.findOne({
      where: { name: creatFilmDto.name }
    });
    if (getFilm)
      throw new RpcException(
        new NotFoundException(`Такой фильм уже есть`));
    const createFilm = await this.filmRepository.create(creatFilmDto);
    const countries = await this.countryRepository.findAll({ attributes: ["id", "name"], raw: true });
    const genres = await this.genreRepository.findAll({ attributes: ["id", "name"], raw: true });
    const persons = await this.personRepository.findAll({ attributes: ["id", "name"], raw: true });
    const films = await this.filmRepository.findAll({ attributes: ["id", "name"], raw: true });

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

    const idCountries: number[] = countries.filter(country => countriesFilm.includes(country.name)).map(id => id.id);
    await this.saveArrayToFilmCountry(createFilm.id, idCountries, this.filmCountryRepository);

    const idGenres: number[] = genres.filter(genre => genresFilm.includes(genre.name)).map(id => id.id);
    await this.saveArrayToFilmGenre(createFilm.id, idGenres, this.filmGenreRepository);

    const idFilmDirectors: number[] = persons.filter(person => filmDirectors.includes(person.name)).map(id => id.id);
    const director = await this.occupationRepository.findOne({ where: { name: "Режиссер" } });
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmDirectors, this.filmOccupationRepository, director.id);

    const idFilmWriters: number[] = persons.filter(person => filmWriters.includes(person.name)).map(id => id.id);
    const writer = await this.occupationRepository.findOne({ where: { name: "Сценарист" } });
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmWriters, this.filmOccupationRepository, writer.id);

    const idFilmProducers: number[] = persons.filter(person => filmProducers.includes(person.name)).map(id => id.id);
    const producer = await this.occupationRepository.findOne({ where: { name: "Продюсер" } });
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmProducers, this.filmOccupationRepository, producer.id);

    const idFilmOperators: number[] = persons.filter(person => filmOperators.includes(person.name)).map(id => id.id);
    const operator = await this.occupationRepository.findOne({ where: { name: "Оператор" } });
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmOperators, this.filmOccupationRepository, operator.id);

    const idFilmComposers: number[] = persons.filter(person => filmComposers.includes(person.name)).map(id => id.id);
    const composer = await this.occupationRepository.findOne({ where: { name: "Композитор" } });
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmComposers, this.filmOccupationRepository, composer.id);

    const idFilmArtists: number[] = persons.filter(person => filmArtists.includes(person.name)).map(id => id.id);
    const artist = await this.occupationRepository.findOne({ where: { name: "Актер" } });
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmArtists, this.filmOccupationRepository, artist.id);

    const idFilmEditors: number[] = persons.filter(person => filmEditors.includes(person.name)).map(id => id.id);
    const editor = await this.occupationRepository.findOne({ where: { name: "Монтажер" } });
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmEditors, this.filmOccupationRepository, editor.id);

    const idMainActors: number[] = persons.filter(person => mainActors.includes(person.name)).map(id => id.id);
    await this.saveArrayToMainActor(createFilm.id, idMainActors, this.mainActorRepository);

    const idFilmTranslators: number[] = persons.filter(person => filmTranslators.includes(person.name)).map(id => id.id);
    const translator = await this.occupationRepository.findOne({ where: { name: "Актер дубляжа" } });
    await this.saveArrayToPerson_Occupation(createFilm.id, idFilmTranslators, this.filmOccupationRepository, translator.id);

    const idSimilarFilms: number[] = films.filter(film => similarFilms.includes(film.name)).map(id => id.id);
    await this.saveArrayToSimilarFilm(createFilm.id, idSimilarFilms, this.similarFilmRepository);

    return createFilm;
  }

  private async saveArrayToFilmCountry(idFilm: number, arrayIdEntity: number[], model: any) {
    for (let i = 0; i < arrayIdEntity.length; i++) {
      await model.create({ film_id: idFilm, country_id: arrayIdEntity[i] });
    }
  }

  private async saveArrayToFilmGenre(idFilm: number, arrayIdEntity: number[], model: any) {
    for (let i = 0; i < arrayIdEntity.length; i++) {
      await model.create({ film_id: idFilm, genre_id: arrayIdEntity[i] });
    }
  }

  private async saveArrayToSimilarFilm(idFilm: number, arrayIdEntity: number[], model: any) {
    for (let i = 0; i < arrayIdEntity.length; i++) {
      await model.create({ film_id: idFilm, similar_film_id: arrayIdEntity[i] });
    }
  }

  private async saveArrayToPerson_Occupation(idFilm: number, arrayIdEntity: number[], model: any, occupationId: number) {
    for (let i = 0; i < arrayIdEntity.length; i++) {
      await model.create({ film_id: idFilm, person_id: arrayIdEntity[i], occupation_id: occupationId });
    }
  }

  private async saveArrayToMainActor(idFilm: number, arrayIdEntity: number[], model: any) {
    for (let i = 0; i < arrayIdEntity.length; i++) {
      await model.create({ film_id: idFilm, person_id: arrayIdEntity[i] });
    }
  }

  async updateFilm(dto: UpdateFilmDto) {
    const film = await this.filmRepository.findOne({ raw: true, where: { "name": dto.oldName } });
    if (!film) throw new RpcException(
      new NotFoundException(`Такой фильм не найден!`));
      // return { statusCode: 404, error: "Not Found", message: `Film with name= ${dto.oldName} not found` };
    return await this.filmRepository.update({ name: dto.newName }, { where: { id: film.id } });
  }

  async deleteFilm(dto: DeleteFilmDto) {
    const id = await this.filmRepository.findOne({ where: { name: dto.name } });
    if (id) {
      await this.filmRepository.destroy({ where: { id: id.id } });
      console.log("id.picture_film = " + id.picture_film);
      return id.picture_film;
    } else {
      throw new RpcException(
        new NotFoundException(`Такой фильм не найден!`));
    }
  }

  async searchWriters(query: string) {
    const writers = await this.personRepository.findAll({where: { name: { [Op.substring]: query } }, attributes : ["name"]});
    return writers.map(person => person.name);
  }
}
