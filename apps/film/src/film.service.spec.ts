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
          findAll: jest.fn(() => [{ "id": 1, "name": "Зеленая миля" }]),
          findOne: jest.fn(() => ({ "id": 1, "name": "Зеленая миля" })),
          create: jest.fn(x => ({ "id": 1, "name": x.name })),
          update: jest.fn(x => ({ "id": 1, "name": x.name })),
          destroy: jest.fn(() => 1)
        }
      },
        {
          provide: COUNTRY_MODEL_TOKEN,
          useValue: {
            findAll: jest.fn(() => [{ "id": 1, "name": "США" }]),
            findOne: jest.fn(() => ({ "id": 1, "name": "США" })),
          }
        },
        {
          provide: FILMCOUNTRY_MODEL_TOKEN,
          useValue: {
            findAll: jest.fn(() => ["США" ]),
            findOne: jest.fn(() => ({ "id": 1, "film_id": 1, "country_id": 1 })),
          }
        },
        {
          provide: GENRE_MODEL_TOKEN,
          useValue: {
            findAll: jest.fn(() => [{ "id": 1, "name": "драма" }, { "id": 2, "name": "криминал" }]),
            findOne: jest.fn(() => ({ "id": 1, "name": "драма" })),
          }
        },
        {
          provide: FILMGENRE_MODEL_TOKEN,
          useValue: {
            findAll: jest.fn(() => [{ "id": 1, "film_id": 1, "genre_id": 1 }, { "id": 2, "film_id": 1, "genre_id": 2 }]),
            findOne: jest.fn(() => ({ "id": 1, "film_id": 1, "genre_id": 1 })),
          }
        },
        {
          provide: FILMOCCUPATION_MODEL_TOKEN,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          }
        },
        {
          provide: OCCUPATION_MODEL_TOKEN,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          }
        },
        {
          provide: PERSON_MODEL_TOKEN,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          }
        },
        {
          provide: MAINACTOR_MODEL_TOKEN,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          }
        },
        {
          provide: SIMILARFILM_MODEL_TOKEN,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          }
        },

      ]
    }).compile();

    filmService = module.get<FilmService>(FilmService);
    filmRepository = module.get<Repository<Film>>(FILM_MODEL_TOKEN);
  });

  describe("testing method getFilmById", () => {

    it("method should be defined", () => {
      expect(filmRepository).toBeDefined();
    });

    // it("method should return a film", async () => {
    //   expect(await filmService.getFilmById(1)).toEqual([{ id: 1, name: "Зеленая миля" }]);
    // });

  });

  // describe("testing method createFilm", () => {
  //
  //   it("creat a new film", async () => {
  //     filmRepository.findOne = jest.fn(() => undefined);
  //     expect(await filmService.createFilm({ name: "спец во всем" })).toEqual({
  //       id: expect.any(Number),
  //       name: "спец во всем"
  //     });
  //   });
  //
  //   it("creat a new film, with exist film, throw exception", async () => {
  //     await expect(async () => {
  //       return await filmService.createFilm({ name: "спец во всем" });
  //     }).rejects.toThrow(RpcException);
  //   });
  //
  // });
  //
  // describe("testing method updateFilm", () => {
  //
  //   it("update  a film", async () => {
  //     expect(await filmService.updateFilm({ id: 1, name: "спец не во всем" })).toEqual({
  //       id: expect.any(Number),
  //       name: "спец не во всем"
  //     });
  //   });
  //
  //   it("update a film with a non-existent id, throw exception", async () => {
  //     filmRepository.findOne = jest.fn(() => undefined);
  //     await expect(async () => {
  //       return await filmService.updateFilm({ id: 1000, name: "спец во всем" });
  //     }).rejects.toThrow(RpcException);
  //   });
  //
  // });
  //
  // describe("testing method deleteFilm", () => {
  //
  //   it("delete  a film", async () => {
  //     expect(await filmService.deleteFilm({ name: "спец во всем" })).toEqual(1);
  //     expect(await filmService.deleteFilm({ name: "спец во всем" })).not.toEqual("спец не во всем");
  //     expect(await filmService.deleteFilm({ name: "спец во всем" })).not.toEqual(2);
  //   });
  //
  //   it("delete a film with a non-existent name, throw exception", async () => {
  //     filmRepository.findOne = jest.fn(() => undefined);
  //     await expect(async () => {
  //       return await filmService.deleteFilm({ name: "спец во всем" });
  //     }).rejects.toThrow(RpcException);
  //   });
  //
  // });

});
