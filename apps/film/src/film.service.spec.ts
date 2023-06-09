import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/sequelize";
import { Film } from "@app/shared/models/film.model";
import { Repository } from "sequelize-typescript";
import { FilmService } from "./film.service";
import { Country } from "@app/shared/models/country.model";
import { FilmOccupation } from "@app/shared/models/film_occupation.model";
import { Genre } from "@app/shared/models/genre.model";
import { FilmCountry } from "@app/shared/models/film_country.model";
import { FilmGenre } from "@app/shared/models/film_genre.model";
import { Occupation } from "@app/shared/models/occupation.model";
import { Person } from "@app/shared/models/person.model";
import { MainActor } from "@app/shared/models/main_actor.model";
import { SimilarFilm } from "@app/shared/models/similar_film.model";
import { RpcException } from "@nestjs/microservices";

describe("FilmService", () => {
  let filmService: FilmService;
  let filmRepository: Repository<Film>;

  const FILM_MODEL_TOKEN = getModelToken(Film);
  const COUNTRY_MODEL_TOKEN = getModelToken(Country);
  const FILMCOUNTRY_MODEL_TOKEN = getModelToken(FilmCountry);
  const GENRE_MODEL_TOKEN = getModelToken(Genre);
  const FILMGENRE_MODEL_TOKEN = getModelToken(FilmGenre);
  const FILMOCCUPATION_MODEL_TOKEN = getModelToken(FilmOccupation);
  const OCCUPATION_MODEL_TOKEN = getModelToken(Occupation);
  const PERSON_MODEL_TOKEN = getModelToken(Person);
  const MAINACTOR_MODEL_TOKEN = getModelToken(MainActor);
  const SIMILARFILM_MODEL_TOKEN = getModelToken(SimilarFilm);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmService, {
        provide: FILM_MODEL_TOKEN,
        useValue: {
          findAll: jest.fn(() => [{ "id": 1, "name": "Зеленая миля", "picture_film": "123abc" }]),
          findOne: jest.fn(() => ({ "id": 1, "name": "Зеленая миля", "picture_film": "123abc" })),
          create: jest.fn(x => ({ "id": 1, "name": x.name })),
          update: jest.fn(x => ({ "id": 1, "name": x.name })),
          destroy: jest.fn(() => 1)
        }
      },
        {
          provide: COUNTRY_MODEL_TOKEN,
          useValue: {}
        },
        {
          provide: FILMCOUNTRY_MODEL_TOKEN,
          useValue: {
            findAll: jest.fn(() => [{ "country.name": "США" }]),
            findOne: jest.fn(() => ({ "id": 1, "film_id": 1, "country_id": 1 }))
          }
        },
        {
          provide: GENRE_MODEL_TOKEN,
          useValue: {}
        },
        {
          provide: FILMGENRE_MODEL_TOKEN,
          useValue: {
            findAll: jest.fn(() => [{ "genre.name": "драма" }, { "genre.name": "криминал" }]),
            findOne: jest.fn(() => ({ "id": 1, "film_id": 1, "genre_id": 1 }))
          }
        },
        {
          provide: FILMOCCUPATION_MODEL_TOKEN,
          useValue: {
            findAll: jest.fn(() => [{
              "person.id": 1,
              "person.name": "Фрэнк Дарабонт",
              "person.picture_URL": "123Aa"
            }]),
            findOne: jest.fn(() => ({ "id": 1, "name": "Фрэнк Дарабонт" }))
          }
        },
        {
          provide: OCCUPATION_MODEL_TOKEN,
          useValue: {}
        },
        {
          provide: PERSON_MODEL_TOKEN,
          useValue: {}
        },
        {
          provide: MAINACTOR_MODEL_TOKEN,
          useValue: {
            findAll: jest.fn(() => [{
              "person.id": 2,
              "person.name": "Том Хенкс",
              "person.picture_URL": "123Aa"
            }]),
            findOne: jest.fn(() => ({ "id": 1, "film_id": 1, "person_id": 1 }))
          }
        },
        {
          provide: SIMILARFILM_MODEL_TOKEN,
          useValue: {
            findAll: jest.fn(() => [{ "film.id": 2, "film.name": "Побег из Шоушенка" }]),
            findOne: jest.fn(() => ({ "id": 1, "film_id": 1, "similar_film_id": 2 }))
          }
        }

      ]
    }).compile();

    filmService = module.get<FilmService>(FilmService);
    filmRepository = module.get<Repository<Film>>(FILM_MODEL_TOKEN);
  });

  describe("testing method getFilmById", () => {

    it("method should be defined", () => {
      expect(filmRepository).toBeDefined();
    });

    it("method should return a film", async () => {
      expect(await filmService.getFilmById(1))
        .toEqual({
          id: 1,
          name: "Зеленая миля",
          picture_film: "123abc",
          country: ["США"],
          genre: ["драма", "криминал"],
          filmDirector: [{
            "person.id": 1,
            "person.name": "Фрэнк Дарабонт",
            "person.picture_URL": "123Aa"
          }],
          filmWriter: [{
            "person.id": 1,
            "person.name": "Фрэнк Дарабонт",
            "person.picture_URL": "123Aa"
          }],
          filmProducer: [{
            "person.id": 1,
            "person.name": "Фрэнк Дарабонт",
            "person.picture_URL": "123Aa"
          }],
          filmOperator: [{
            "person.id": 1,
            "person.name": "Фрэнк Дарабонт",
            "person.picture_URL": "123Aa"
          }],
          filmComposer: [{
            "person.id": 1,
            "person.name": "Фрэнк Дарабонт",
            "person.picture_URL": "123Aa"
          }],
          filmArtist: [{
            "person.id": 1,
            "person.name": "Фрэнк Дарабонт",
            "person.picture_URL": "123Aa"
          }],
          filmEditor: [{
            "person.id": 1,
            "person.name": "Фрэнк Дарабонт",
            "person.picture_URL": "123Aa"
          }],
          mainActors: [{
            "person.id": 2,
            "person.name": "Том Хенкс",
            "person.picture_URL": "123Aa"
          }],
          filmTranslators: [{
            "person.id": 1,
            "person.name": "Фрэнк Дарабонт",
            "person.picture_URL": "123Aa"
          }],
          similarFilms: [{
            "film.id": 2,
            "film.name": "Побег из Шоушенка"
          }]

        });
    });

    it("getFilmById a film with a non-existent id, throw exception", async () => {
      filmRepository.findOne = jest.fn(() => undefined);
      await expect(async () => {
        return await filmService.getFilmById(1000);
      }).rejects.toThrow(RpcException);
    });


  });

  describe("testing method updateFilm", () => {

    it("update  a film", async () => {
      expect(await filmService.updateFilm({
        oldName: "Зеленая миля",
        newName: "Зеленая миля 1999"
      })).toEqual({
        id: expect.any(Number),
        name: "Зеленая миля 1999"
      });
    });

    it("update a film with a non-existent id, throw exception", async () => {
      filmRepository.findOne = jest.fn(() => undefined);
      await expect(async () => {
        return await filmService.updateFilm({
          oldName: "Зеленая миля",
          newName: "Зеленая миля 1999"
        });
      }).rejects.toThrow(RpcException);
    });

  });

  describe("testing method deleteFilm", () => {

    it("delete  a film", async () => {
      expect(await filmService.deleteFilm({ name: "Зеленая миля" })).toEqual("123abc");
      expect(await filmService.deleteFilm({ name: "Зеленая миля" })).not.toEqual(2);
    });

    it("delete a film with a non-existent name, throw exception", async () => {
      filmRepository.findOne = jest.fn(() => undefined);
      await expect(async () => {
        return await filmService.deleteFilm({ name: "Зеленая миля" });
      }).rejects.toThrow(RpcException);
    });

  });

});
