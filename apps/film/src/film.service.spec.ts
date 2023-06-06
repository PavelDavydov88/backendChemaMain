import { Test, TestingModule } from '@nestjs/testing';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { Film } from "@app/shared/models/film.model";
import { getModelToken } from "@nestjs/sequelize";
import { FilmModule } from "./film.module";
import { CountryService } from "../../country/src/country.service";
import { CountryModule } from "../../country/src/country.module";

describe('FilmService', () => {
  let filmService: FilmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmService, {provide: getModelToken(Film),
        useValue: {
          findAll: jest.fn(/*() => {return [sampleProfile]}*/),
          findOne: jest.fn(/*() => sampleProfile*/),
          create: jest.fn(/*() => sampleProfile*/),

        },},
      // CountryService,
      ],
      // imports : [CountryModule]

    }).compile();

    filmService = module.get<FilmService>(FilmService);

  });

  describe('testing service', () => {
    it('should be defined', () => {
      expect(filmService).toBeDefined();
    });
  });
});
