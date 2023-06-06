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
          findOne: jest.fn(() => ({ "id": 1, "name": "спец во всем" })).mockReturnValueOnce(undefined),
          create: jest.fn(x => ({ "id": 1, "name": x.name }))
        }
      }
      ]
    }).compile();

    occupationService = module.get<OccupationService>(OccupationService);
    occupationRepository = module.get<Repository<Occupation>>(OCCUPATION_MODEL_TOKEN);
  });

  describe("testing service", () => {

    it("repository should be defined", () => {
      expect(occupationRepository).toBeDefined();
    });

    it("service should return occupations", async () => {
      expect(await occupationService.getAllOccupation()).toEqual([{ id: 1, name: "спец во всем" }]);
    });

    it("creat a new occupation", async () => {

      expect(await occupationService.createOccupation({ name: "спец во всем" })).toEqual({
        id: expect.any(Number),
        name: "спец во всем"
      });
    });

    it("don't creat a new occupation, with exist occupation, throw exception", async () => {
      expect(await occupationService.createOccupation({ name: "спец во всем" }));
      await expect(async () => {
        return await occupationService.createOccupation({ name: "спец во всем" });
      }).rejects.toThrow(RpcException);
    });

  });

});
