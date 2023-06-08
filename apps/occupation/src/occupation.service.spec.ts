import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/sequelize";
import { Occupation } from "@app/shared/models/occupation.model";
import { OccupationService } from "./occupation.service";
import { Repository } from "sequelize-typescript";
import { RpcException } from "@nestjs/microservices";

describe("OccupationService", () => {
  let occupationService: OccupationService;
  let occupationRepository: Repository<Occupation>;

  const OCCUPATION_MODEL_TOKEN = getModelToken(Occupation);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OccupationService, {
        provide: OCCUPATION_MODEL_TOKEN,
        useValue: {
          findAll: jest.fn(() => [{ "id": 1, "name": "спец во всем" }]),
          findOne: jest.fn(() => ({ "id": 1, "name": "спец во всем" })),
          create: jest.fn(x => ({ "id": 1, "name": x.name })),
          update: jest.fn(x => ({ "id": 1, "name": x.name })),
          destroy: jest.fn(() => 1)
        }
      }
      ]
    }).compile();

    occupationService = module.get<OccupationService>(OccupationService);
    occupationRepository = module.get<Repository<Occupation>>(OCCUPATION_MODEL_TOKEN);
  });

  describe("testing method getAllOccupation", () => {

    it("method should be defined", () => {
      expect(occupationRepository).toBeDefined();
    });

    it("method should return all occupations", async () => {
      expect(await occupationService.getAllOccupation()).toEqual([{ id: 1, name: "спец во всем" }]);
    });

  });

  describe("testing method createOccupation", () => {

    it("creat a new occupation", async () => {
      occupationRepository.findOne = jest.fn(() => undefined);
      expect(await occupationService.createOccupation({ name: "спец во всем" })).toEqual({
        id: expect.any(Number),
        name: "спец во всем"
      });
    });

    it("creat a new occupation, with exist occupation, throw exception", async () => {
      await expect(async () => {
        return await occupationService.createOccupation({ name: "спец во всем" });
      }).rejects.toThrow(RpcException);
    });

  });

  describe("testing method updateOccupation", () => {

    it("update  a occupation", async () => {
      expect(await occupationService.updateOccupation({ id: 1, name: "спец не во всем" })).toEqual({
        id: expect.any(Number),
        name: "спец не во всем"
      });
    });

    it("update a occupation with a non-existent id, throw exception", async () => {
      occupationRepository.findOne = jest.fn(() => undefined);
      await expect(async () => {
        return await occupationService.updateOccupation({ id: 1000, name: "спец во всем" });
      }).rejects.toThrow(RpcException);
    });

  });

  describe("testing method deleteOccupation", () => {

    it("delete  a occupation", async () => {
      expect(await occupationService.deleteOccupation({ name: "спец во всем" })).toEqual(1);
      expect(await occupationService.deleteOccupation({ name: "спец во всем" })).not.toEqual("спец не во всем");
      expect(await occupationService.deleteOccupation({ name: "спец во всем" })).not.toEqual(2);
    });

    it("delete a occupation with a non-existent name, throw exception", async () => {
      occupationRepository.findOne = jest.fn(() => undefined);
      await expect(async () => {
        return await occupationService.deleteOccupation({ name: "спец во всем" });
      }).rejects.toThrow(RpcException);
    });

  });

});
