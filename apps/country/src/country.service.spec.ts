import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/sequelize";
import { Repository } from "sequelize-typescript";
import { RpcException } from "@nestjs/microservices";
import { CountryService } from "./country.service";
import { Country } from "@app/shared/models/country.model";

describe("CountryService", () => {
  let countryService: CountryService;
  let countryRepository: Repository<Country>;

  const COUNTRY_MODEL_TOKEN = getModelToken(Country);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryService, {
        provide: COUNTRY_MODEL_TOKEN,
        useValue: {
          findAll: jest.fn(() => [{ "id": 1, "name": "готэм Сити" }]),
          findOne: jest.fn(() => ({ "id": 1, "name": "готэм Сити" })),
          create: jest.fn(x => ({ "id": 1, "name": x.name })),
          update: jest.fn(x => ({ "id": 1, "name": x.name })),
          destroy: jest.fn(() => 1)
        }
      }
      ]
    }).compile();

    countryService = module.get<CountryService>(CountryService);
    countryRepository = module.get<Repository<Country>>(COUNTRY_MODEL_TOKEN);
  });

  describe("testing method getAllCountry", () => {

    it("method should be defined", () => {
      expect(countryRepository).toBeDefined();
    });

    it("method should return all countries", async () => {
      expect(await countryService.getAllCountry()).toEqual([{ id: 1, name: "готэм Сити" }]);
    });

  });

  describe("testing method createCountry", () => {

    it("creat a new country", async () => {
      countryRepository.findOne = jest.fn(() => undefined);
      expect(await countryService.createCountry({ name: "готэм Сити" })).toEqual({
        id: expect.any(Number),
        name: "готэм Сити"
      });
    });

    it("creat a new country, with exist country, throw exception", async () => {
      await expect(async () => {
        return await countryService.createCountry({ name: "готэм Сити" });
      }).rejects.toThrow(RpcException);
    });

  });

  describe("testing method updateCountry", () => {

    it("update  a country", async () => {
      expect(await countryService.updateCountry({ id: 1, name: "спец не во всем" })).toEqual({
        id: expect.any(Number),
        name: "спец не во всем"
      });
    });

    it("update a country with a non-existent id, throw exception", async () => {
      countryRepository.findOne = jest.fn(() => undefined);
      await expect(async () => {
        return await countryService.updateCountry({ id: 1000, name: "готэм Сити" });
      }).rejects.toThrow(RpcException);
    });

  });

  describe("testing method deleteCountry", () => {

    it("delete  a country", async () => {
      expect(await countryService.deleteCountry({ id: 1 })).toEqual(1);
      expect(await countryService.deleteCountry({ id: 1 })).not.toEqual(2);
    });

    it("delete a country with a non-existent name, throw exception", async () => {
      countryRepository.findOne = jest.fn(() => undefined);
      await expect(async () => {
        return await countryService.deleteCountry({ id: 1 });
      }).rejects.toThrow(RpcException);
    });

  });

});
