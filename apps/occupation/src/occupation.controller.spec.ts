import { Test, TestingModule } from "@nestjs/testing";
import { OccupationService } from "./occupation.service";
import { OccupationController } from "./occupation.controller";
import { RpcException } from "@nestjs/microservices";

describe("OccupationController", () => {

  let occupationService: OccupationService;
  let occupationController: OccupationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OccupationController],
      providers: [{
        provide: OccupationService,
        useValue: {
          getAllOccupation: jest.fn(() => [{ "id": 1, "name": "спец во всем" }]),
          createOccupation: jest.fn(x => ({ "id": 1, "name": x.name })),
          updateOccupation: jest.fn(x => ({ "id": 1, "name": x.name })),
          deleteOccupation: jest.fn(() => 1)
        }
      }
      ]
    }).compile();

    occupationService = module.get(OccupationService);
    occupationController = module.get(OccupationController);

  });

  describe("testing calling method getAllOccupation", () => {

    it("method should return all occupations", async () => {
      expect(await occupationController.getAllOccupation()).toEqual([{ id: 1, name: "спец во всем" }]);
    });

  });

  describe("testing calling method createOccupation", () => {

    it("creat a new occupation", async () => {
      const createOccupationMock = jest.spyOn(occupationService, "createOccupation");
      const result = await occupationController.createOccupation({ name: "спец во всем" });
      expect(result).toEqual({ id: expect.any(Number), name: "спец во всем" });
      expect(createOccupationMock).toBeCalledWith({ name: "спец во всем" });
    });

    it("creat a new occupation, with exist occupation, throw exception", async () => {
      let createOccupationMock: jest.SpyInstance;
      createOccupationMock = jest.spyOn(occupationService, "createOccupation");
      createOccupationMock.mockImplementation(() => {
        throw new RpcException("Такая профессия уже существует!");
      });
      await expect(async () => {
        return await occupationController.createOccupation({ name: "спец во всем" });
      }).rejects.toThrow(RpcException);
      await expect(async () => {
        return await occupationController.createOccupation({ name: "спец во всем" });
      }).rejects.toEqual(new RpcException("Такая профессия уже существует!"));

    });

  });

  describe("testing method updateOccupation", () => {

    it("update  a occupation", async () => {
      expect(await occupationController.updateOccupation({ id: 1, name: "спец не во всем" })).toEqual({
        id: expect.any(Number),
        name: "спец не во всем"
      });
    });

    it("update a occupation with a non-existent id, throw exception", async () => {
      let updateOccupationMock: jest.SpyInstance;
      updateOccupationMock = jest.spyOn(occupationService, "updateOccupation");
      updateOccupationMock.mockImplementation(() => {
        throw new RpcException("Такой профессии не существует!");
      });
      await expect(async () => {
        return await occupationController.updateOccupation({ id: 1000, name: "спец во всем" });
      }).rejects.toThrow(RpcException);
      await expect(async () => {
        return await occupationController.updateOccupation({ id: 1000, name: "спец во всем" });
      }).rejects.toEqual(new RpcException("Такой профессии не существует!"));

    });

  });

  describe("testing method deleteOccupation", () => {

    it("delete a occupation", async () => {
      expect(await occupationController.deleteOccupation({ name: "спец во всем" })).toEqual(1);
      expect(await occupationController.deleteOccupation({ name: "спец во всем" })).not.toEqual("спец не во всем");
      expect(await occupationController.deleteOccupation({ name: "спец во всем" })).not.toEqual(2);
    });

    it("delete a occupation with a non-existent name, throw exception", async () => {
      let deleteOccupationMock: jest.SpyInstance;
      deleteOccupationMock = jest.spyOn(occupationService, "deleteOccupation");
      deleteOccupationMock.mockImplementation(() => {
        throw new RpcException("Такой профессии не существует!");
      });
      await expect(async () => {
        return await occupationController.deleteOccupation({ name: "спец во всем" });
      }).rejects.toThrow(RpcException);
      await expect(async () => {
        return await occupationController.deleteOccupation({ name: "спец во всем" });
      }).rejects.toEqual(new RpcException("Такой профессии не существует!"));

    });

  });

});
