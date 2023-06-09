import { Test, TestingModule } from '@nestjs/testing';
import {Repository} from "sequelize-typescript";
import {Role} from "@app/shared/models/role.model";
import {getModelToken} from "@nestjs/sequelize";
import {RolesService} from "./role.service";
import {RpcException} from "@nestjs/microservices";
import postgres from "postgres";
import value = postgres.toPascal.value;



describe('RoleService', () => {
  let service: RolesService;
  let roleRepository: Repository<Role>

  const ROLE_MODEL_TOKEN = getModelToken(Role)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesService, {
        provide: ROLE_MODEL_TOKEN,
        useValue: {
          findAll: jest.fn(() => [{ "id": 1, "value": "ADMIN", "description": "entitles to everything" }]),
          findOne: jest.fn(() => ({ "id": 1, "value": "ADMIN", "description": "entitles to everything" }) ),
          create: jest.fn(x => ({ "id": 1, "value": x.value, "description": x.description })),
          destroy: jest.fn( x => ({ "value": x.value })),
          update: jest.fn(x => ({"id": 1, "value": x.value, "description": x.description}) )

        }
      }],
    }).compile();

    service = module.get<RolesService>(RolesService);
    roleRepository = module.get<Repository<Role>>(ROLE_MODEL_TOKEN)

  });

  describe("testing method getAllRoles", () => {
    it("method should be defined", () => {
      expect(roleRepository).toBeDefined()
    })

    it('method should return all roles', async () => {
      expect(await service.getAllRoles())
          .toEqual([{
            id: 1,
            value: "ADMIN",
            description: "entitles to everything" }
          ])
    })

  })

  describe("testing method createRole", () => {
    it("create a new role", async () => {
      roleRepository.findOne = jest.fn(() => undefined);
      expect(await service.createRole({
        value: "ADMIN",
        description: "entitles to everything"
      })).toEqual({
       "id": 1,
        "value": "ADMIN",
        "description": "entitles to everything"
      })
    })

    it("create a new role, with exist role, throw exception", async () => {
      await expect(async () => {
        return await service.createRole({
          value: "ADMIN",
          description: "entitles to everything"
        })
      }).rejects.toThrow(RpcException);
    })
  describe('testing method updateRole', () => {

    it ("update a Role", async () => {
      expect(await service.updateRole({

        value: "ADMIN",
        description: "entitles to everything"
      })).toEqual({
        id: expect.any(Number),
        value: "ADMIN",
        description: "entitles to everything"
      })
    })
    it('update a new role, with exist value, throw exception', async () => {
      roleRepository.update = jest.fn(() => undefined)
      await expect(async () => {
        return await service.updateRole({ value: "ADMIN",
          description: "entitles to everything"})
      }).rejects.toThrow(RpcException)
    })
  })
  describe("testing method deleteRole", () => {

    it("delete a role", async () => {
      expect(await service.deleteRole({value: "ADMIN", description: "entitles to everything"})).toEqual({})
      expect(await service.deleteRole({value: "ADMIN", description: "entitles to everything"})).not.toEqual('ADMIN')
      expect(await service.deleteRole({value: "ADMIN", description: "entitles to everything"} )).not.toEqual("kekulol")

    })

    it("delete a role with a non-existent name, throw exception", async () => {
      roleRepository.findOne = jest.fn(() => undefined);
      await expect( async () => {
        return await service.deleteRole({value: "ADMIN", description: "entitles to everything"})
      }).rejects.toThrow(RpcException)
    })
  })

  })
});
