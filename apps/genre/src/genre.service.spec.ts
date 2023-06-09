import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/sequelize";
import { Repository } from "sequelize-typescript";
import { RpcException } from "@nestjs/microservices";
import { GenreService } from "./genre.service";
import { Genre } from "@app/shared/models/genre.model";

describe("GenreService", () => {
  let genreService: GenreService;
  let genreRepository: Repository<Genre>;

  const GENRE_MODEL_TOKEN = getModelToken(Genre);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenreService, {
        provide: GENRE_MODEL_TOKEN,
        useValue: {
          findAll: jest.fn(() => [{ "id": 1, "name": "Российский жанр" }]),
          findOne: jest.fn(() => ({ "id": 1, "name": "Российский жанр" })),
          create: jest.fn(x => ({ "id": 1, "name": x.name })),
          update: jest.fn(x => ({ "id": 1, "name": x.name })),
          destroy: jest.fn(() => 1)
        }
      }
      ]
    }).compile();

    genreService = module.get<GenreService>(GenreService);
    genreRepository = module.get<Repository<Genre>>(GENRE_MODEL_TOKEN);
  });

  describe("testing method getAllGenres", () => {

    it("method should be defined", () => {
      expect(genreRepository).toBeDefined();
    });

    it("method should return all genres", async () => {
      expect(await genreService.getAllGenres()).toEqual([{ id: 1, name: "Российский жанр" }]);
    });

  });

  describe("testing method createGenre", () => {

    it("creat a new genre", async () => {
      genreRepository.findOne = jest.fn(() => undefined);
      expect(await genreService.createGenre({ name: "Российский жанр" })).toEqual({
        id: expect.any(Number),
        name: "Российский жанр"
      });
    });

    it("creat a new genres, with exist genres, throw exception", async () => {
      await expect(async () => {
        return await genreService.createGenre({ name: "Российский жанр" });
      }).rejects.toThrow(RpcException);
    });

  });

  describe("testing method updateGenre", () => {

    it("update  a genres", async () => {
      expect(await genreService.updateGenre({ id: 1, name: "Российский жанр" })).toEqual({
        id: expect.any(Number),
        name: "Российский жанр"
      });
    });

    it("update a genres with a non-existent id, throw exception", async () => {
      genreRepository.findOne = jest.fn(() => undefined);
      await expect(async () => {
        return await genreService.updateGenre({ id: 1000, name: "Российский жанр" });
      }).rejects.toThrow(RpcException);
    });

  });

  describe("testing method deleteGenre", () => {

    it("delete  a genres", async () => {
      expect(await genreService.deleteGenre({ id: 1 })).toEqual(1);
      expect(await genreService.deleteGenre({ id: 1 })).not.toEqual(10);
    });

    it("delete a genres with a non-existent name, throw exception", async () => {
      genreRepository.findOne = jest.fn(() => undefined);
      await expect(async () => {
        return await genreService.deleteGenre({ id: 10 });
      }).rejects.toThrow(RpcException);
    });

  });

});
