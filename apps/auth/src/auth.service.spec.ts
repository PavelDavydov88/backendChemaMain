import {AuthService} from "./auth.service";
import {ProfileService} from "./profile/profile.service";
import {RolesService} from "./role/role.service";
import {UserService} from "./user/user.service";
import {Repository} from "sequelize-typescript";
import {Profile} from "@app/shared/models/profile.model";
import {Role} from "@app/shared/models/role.model";
import {User} from "@app/shared/models/user.model";
import {getModelToken} from "@nestjs/sequelize";
import {Test, TestingModule} from "@nestjs/testing";
import {RpcException} from "@nestjs/microservices";
import {JwtService} from "@nestjs/jwt";
import {compare} from "bcryptjs"
import * as bcryptjs from "bcryptjs"

describe('AuthService', () => {

    let authService: AuthService;
    let profileservice: ProfileService;
    let roleService: RolesService;
    let userService: UserService
    let userRepository: Repository<User>

    const USER_MODEL_TOKEN = getModelToken(User)

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({

            providers: [ProfileService, RolesService, UserService, AuthService,JwtService,
                {
                  provide: JwtService,
                  useValue: {
                      secretOrPrivateKey: 'secret',
                      sign: jest.fn(() => ("payload"))
                  }
                },
                {
                    provide: ProfileService,
                    useValue: {
                        createProfile: jest.fn(x => ({ "id": 1, "email": x.email, "password": x.password, "firstName": x.firstName, "lastName": x.lastName }))
                    }
                },
                {
                    provide: RolesService,
                    useValue: {
                        // findAll: jest.fn(() => [{"id": 1, "value": "ADMIN", "description": "entitles to everything"}]),
                        // findOne: jest.fn(() => ({"id": 1, "value": "ADMIN", "description": "entitles to everything"})),
                        // create: jest.fn(x => ({"id": 1, "value": x.value, "description": x.description})),
                    }
                },
                {
                    provide: UserService,
                    useValue: {
                        getUserByEmail: jest.fn(() => ({"id": 1, "email": "user@mail.com", "password": "hashPassword"}))
                    }
                },
                {
                    provide: USER_MODEL_TOKEN,
                    useValue: {
                        findOne: jest.fn( () => ({'id': 1}))
                    }
                }
            ],
        }).compile();

        profileservice = module.get<ProfileService>(ProfileService);
        roleService = module.get<RolesService>(RolesService);
        userService = module.get<UserService>(UserService);
        authService = module.get<AuthService>(AuthService);
        userRepository = module.get<Repository<User>>(USER_MODEL_TOKEN)


    });

    describe('testing registartion new user', () => {
        it('method return should bearer Token', async () => {

            userService.getUserByEmail = jest.fn(() => undefined)

            expect(await authService.registration({email: 'user@mail.com', password: 'hashPassword', firstName: 'noname', lastName: 'noname'}))
                .toEqual(

                    {"token": "payload"}

            )
        })
        it('registration new user, with exist user, throw exception', async() => {

            await expect(async () => {
                return await authService.registration({email: 'user@mail.com', password: 'hashPassword', firstName: 'noname', lastName: 'noname'})
            }).rejects.toThrow(RpcException)
        } )
    })

    describe('testing login method', () => {

        it('method should return bearer Token', async () => {
            Object.defineProperty(bcryptjs.compare, 'type', {value: true})
            // bcryptjs.compare = jest.fn()
            console.log(bcryptjs.compare)

            // await authService.registration({email: 'user@mail.com', password: 'hashPassword', firstName: 'noname', lastName: 'noname'})
            // expect( await authService.login({email: 'user@mail.com', password: 'hashPassword', firstName: 'noname', lastName: 'noname'}))
            //     .toEqual({"token": "payload"})
        })

        it('login  user, with non-exist user, throw exception ', async () => {
            await expect(async () => {
                return await authService.login({email: 'user@mail.com', password: 'hashPassword', firstName: 'noname', lastName: 'noname'})

            }).rejects.toThrow(RpcException)
        })
    })

})