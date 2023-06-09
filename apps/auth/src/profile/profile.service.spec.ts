import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import {Repository} from "sequelize-typescript";
import {Profile} from "@app/shared/models/profile.model";
import {getModelToken} from "@nestjs/sequelize";
import {RolesService} from "../role/role.service";
import {UserService} from "../user/user.service";
import {Role} from "@app/shared/models/role.model";
import {User} from "@app/shared/models/user.model";
import {getConfigToken} from "@nestjs/config";
import {RpcException} from "@nestjs/microservices";
import any = jasmine.any;
import {errorContext} from "rxjs/internal/util/errorContext";

describe('ProfileService: update, destroy, findOne', () => {

  let dto = {
  email: 'user@mail.com',
    password: 'hashPassword',
    firstName: 'noname',
    lastName: 'noname'
  }

  let service: ProfileService;
  let roleService: RolesService;
  let userService: UserService
  let profileRepository: Repository<Profile>;
  let roleRepository: Repository<Role>
  let userRepository: Repository<User>

  const PROFILE_MODEL_TOKEN = getModelToken(Profile)
  const USER_MODEL_TOKEN = getModelToken(User)
  const ROLE_MODEL_TOKEN = getModelToken(Role)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService, RolesService, UserService, {
        provide: PROFILE_MODEL_TOKEN,
        useValue: {
          create: jest.fn(x => ({ "id": 1, "email": x.email, "password": x.password, "firstName": x.firstName, "lastName": x.lastName })),
          findAll: jest.fn(() => [{ "id": 1, "email": "user@mail.com", 'password': "hashPassword", "firstName": "noname", "lastName": 'noname' }]),
          findByPk: jest.fn(() => ({ "id": 1, "email": "user@mail.com", 'password': "hashPassword", "firstName": "noname", "lastName": 'noname'  })),
          createUser: jest.fn( x => ({ "id": 1, "email": x.email, "password": x.password, "userId": 1 }) ),
          getRolByValue: jest.fn(() => ({"id": 1, "value": "USER" })),
          update: jest.fn( x => ({ "id": 1, "email": x.email, "password": x.password, "firstName": x.firstName, "lastName": x.lastName })),
          updateUser: jest.fn( x => ({ "id": 1, "email": x.email, "password": x.password })),
          destroy: jest.fn(() => 1)

        }
      },
        {
          provide: ROLE_MODEL_TOKEN,
          useValue: {
            findAll: jest.fn(() => [{ "id": 1, "value": "ADMIN", "description": "entitles to everything" }]),
            findOne: jest.fn(() => ({ "id": 1, "value": "ADMIN", "description": "entitles to everything" }) ),
            create: jest.fn(x => ({ "id": 1, "value": x.value, "description": x.description })),
        }},
        {
          provide: USER_MODEL_TOKEN,
          useValue: {
            $set: jest.fn( x => ({ "id": 1, "roleId": x.roleId, "profileId": x.profileId }) ),

          }
          },
        {
          provide: UserService,
          useValue: {


            createUser: jest.fn(x => ( {"email": x.email, "password": x.password })),
            updateUser: jest.fn( x => ({"email": x.email, "password": x.password, userId: 1 }))

          }
        },
        // {
        //   provide: ProfileService,
        //   useValue: {
        //     update:
        //         jest.fn( x => ({"profile": {
        //         "email": "user@mail.com",
        //         "firstName": x.firstName,
        //         "id": 1,
        //         "lastName": x.lastName,
        //         "password": x.password
        //       },
        //       "user": {
        //         "email": x.email,
        //         "id": 1,
        //         "password": x.password,
        //         "userId": 1
        //       }})),
        //     $set: jest.fn( x => ({ "id": 1, "roleId": x.roleId, "profileId": x.profileId }) ),
        //     createProfile: jest.fn(x => ({ "id": 1, "email": x.email, "password": x.password, "firstName": x.firstName, "lastName": x.lastName }))
        //   }
        // }

      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    roleService = module.get<RolesService>(RolesService);
    userService = module.get<UserService>(UserService)

    profileRepository = module.get<Repository<Profile>>(PROFILE_MODEL_TOKEN)
    userRepository = module.get<Repository<User>>(USER_MODEL_TOKEN)
    roleRepository = module.get<Repository<Role>>(ROLE_MODEL_TOKEN)
  });
  describe("testing method getAllProfile", () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it("method should return all profile", async () => {
      expect(await service.getAllProfiles()).toEqual([{
        id: 1,
        email: 'user@mail.com',
        password: 'hashPassword',
        firstName: 'noname',
        lastName: 'noname'
      }])
    })
  })
  describe('testing method createProfile', () => {

    it ('create a new profile', async () => {

      expect(await service.createProfile(dto)).toEqual({
        "email": "user@mail.com",
        "firstName": "noname",
        "id": 1,
        "lastName": "noname",
        "password": "hashPassword"
      })
    })
  })
  describe('testing metgod updateProfile',  () => {
    it('update a profile', async () => {
      expect(await service.update(dto))
          .toEqual({
            "profile": {
              email: "user@mail.com",
              firstName: "noname",
              id: 1,
              lastName: "noname",
              password: "hashPassword"
            },
            user: {
              email: "user@mail.com",

              password: "hashPassword",
              userId: 1
            }
          })
    })
    it('update a profile with a non-existent id, throw exception', async () => {

      profileRepository.update = jest.fn(() => undefined)
      await expect(async () => {
        return await service.update(dto)
      }).rejects.toThrow(RpcException)
    })
    })

  describe('teting method destroy', () => {
    it('destroy profile with all include', async () => {
      expect(await service.delete(1)).toEqual(1)
      expect(await service.delete(1)).not.toEqual(2)
      expect(await service.delete(1)).not.toEqual('4')

    })

    it('delete a profile with non-existent id, throw exception', async () => {

      profileRepository.destroy = jest.fn(() => undefined)
      await expect(async () => {
        return await service.delete(1)
      }).rejects.toThrow(RpcException)
    })
  })


});
