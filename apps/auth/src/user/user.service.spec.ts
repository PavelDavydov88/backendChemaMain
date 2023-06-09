import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import {Repository} from "sequelize-typescript";
import {User} from "@app/shared/models/user.model";
import {getModelToken} from "@nestjs/sequelize";
import {OccupationService} from "../../../occupation/src/occupation.service";
import {RpcException} from "@nestjs/microservices";

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>

  const USER_MODEL_TOKEN = getModelToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: USER_MODEL_TOKEN,
        useValue: {
          findOne: jest.fn(() => ({
            "id": 1,
            "email": "user@gmail.com",
            "password": 'hashPassword',

            "userId": 1

          })),
          create: jest.fn(x => ({
            "id": 1,
            "email": x.email,
            "password": x.password,
            "userId": 1

          })),
          update: jest.fn( x => ({
            "id": 1,
            "email": x.email,
            "password": x.password,
            "userId": 1
          })),
          destroy: jest.fn( () => ({
            "id": 1,
            "email": "user@gmail.com",
            "password": 'hashPassword',

            "userId": 1
          }))
        }
      }
      ]
    }).compile();

    userService = module.get<UserService>(UserService)
    userRepository = module.get<Repository<User>>(USER_MODEL_TOKEN)
  });
  describe("testing method createUser", () => {
    it("repository should be defined", () => {
      expect(userRepository).toBeDefined()
    })
    it('create user', async () => {
      expect(await userRepository.create({email: 'user@gmail.com', password: 'hashPassword'})).toEqual({
        id: expect.any(Number),
        email: "user@gmail.com",
        password: "hashPassword",

        userId: expect.any(Number)
      })
    })
  describe("testing method get one",  () => {
    it('method should be defined', () => {
      expect(userRepository).toBeDefined()
    })

    it("method should return one user", async () => {
      expect(await userService.getUserByEmail("user@gmail.com")).toEqual({
        id: 1,
        email: "user@gmail.com",
        password: "hashPassword",

        userId: 1
      })
    })

  })
  describe('testing method update user', () => {
    it('method should update user', async () => {
      expect(await userService.updateUser({
        email: "user@gmail.com",
        password: "hashPassword",
        lastName: "noname",
        firstName: "noname"}))
          .toEqual({
            id: 1,
            email: "user@gmail.com",
            password: "hashPassword",

            userId: 1
      })
    })
    it('update a user with non-existent email, throw exception', async () => {
      userRepository.update = jest.fn(() => undefined)
      await expect(async () => {
        return await userService.updateUser({
          email: "nonEmail",
          password: "hashPassword",
          lastName: "noname",
          firstName: "noname"})
      }).rejects.toThrow(RpcException)
    })
  })
  describe("testing destroy user", () => {
    it('method should return destroy user', async () => {
      expect(await userService.deleteUser({email: "user@gmail.com", password: "hashPassword", lastName: "noname", firstName: "noname"})).toEqual({"id": 1, "email": "user@gmail.com", "password": 'hashPassword', "userId": 1})
      expect(await userService.deleteUser({email: "user@gmail.com", password: "hashPassword", lastName: "noname", firstName: "noname"})).not.toEqual(1)
      expect(await userService.deleteUser({email: "user@gmail.com", password: "hashPassword", lastName: "noname", firstName: "noname"})).not.toEqual('hashPassword')
    })

  })
  })
});
