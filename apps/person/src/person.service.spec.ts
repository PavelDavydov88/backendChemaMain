import {PersonService} from "./person.service";
import {Repository} from "sequelize-typescript";
import {Person} from "@app/shared/models/person.model";
import {getModelToken} from "@nestjs/sequelize";
import {Test, TestingModule} from "@nestjs/testing";
import {Country} from "@app/shared/models/country.model";
import {Genre} from "@app/shared/models/genre.model";
import {Occupation} from "@app/shared/models/occupation.model";
import {PersonGenre} from "@app/shared/models/person_genre.model";
import {PersonOccupation} from "@app/shared/models/person_occupation.model";
import {PersonCountry} from "@app/shared/models/person_counrty.model";
import {PersonBestFilm} from "@app/shared/models/person_best_film.model";
import {RpcException} from "@nestjs/microservices";

describe('PersonService', () => {
    let personService: PersonService;
    let personRepository: Repository<Person>
    let countryRepository: Repository<Country>
    let occupationRepository: Repository<Occupation>
    let genreRepository: Repository<Genre>
    let personGenreRepository: Repository<PersonGenre>
    let personOccupationRepository: Repository<PersonOccupation>
    let personCountryRepository: Repository<PersonCountry>
    let personBestFilmRepository: Repository<PersonBestFilm>




    const MODEL_TOKENS = {
        PERSON_TOKEN: getModelToken(Person),
        PERSON_GENRE_TOKEN: getModelToken(PersonGenre),
        PERSON_OCCUPATION_TOKEN: getModelToken(PersonOccupation),
        PERSON_COUNTRY_TOKEN: getModelToken(PersonCountry),
        COUNTRY_TOKEN: getModelToken(Country),
        OCCUPATION_TOKEN: getModelToken(Occupation),
        GENRE_TOKEN: getModelToken(Genre),
        PERSON_BESTFILM_TOKEN: getModelToken(PersonBestFilm)
    }


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PersonService,
                {
                provide: MODEL_TOKENS.PERSON_TOKEN,
                useValue: {
                    update: jest.fn( x => ({
                        "id": 1,
                        "name": x.name
                    }) ),
                    findAll: jest.fn(() => ([{}])),
                    findOne: jest.fn(() => ({"id": 1, "name": 'go and look'})),
                    destroy: jest.fn(() => 1)
                    // create: jest
                }
            },

                {
                    provide: MODEL_TOKENS.COUNTRY_TOKEN,
                    useValue: {

                    }
                },
                {
                    provide: MODEL_TOKENS.GENRE_TOKEN,
                    useValue: {

                    }
                },
                {
                    provide: MODEL_TOKENS.OCCUPATION_TOKEN,
                    useValue: {

                    }
                },
                {
                    provide: MODEL_TOKENS.PERSON_GENRE_TOKEN,
                    useValue: {
                        findAll: jest.fn(() => ([{ "id": 1, "genre_id": 1, "person_id": 1 }]))

                    }
                },
                {
                    provide: MODEL_TOKENS.PERSON_COUNTRY_TOKEN,
                    useValue: {
                        findAll: jest.fn(() => ([{ "id": 1, "country_id": 1, "person_id": 1 }]))

                    }
                },
                {
                    provide: MODEL_TOKENS.PERSON_OCCUPATION_TOKEN,
                    useValue: {
                        findAll: jest.fn(() => ([{ "id": 1, "occupation_id": 1, "person_id": 1 }]))

                    }
                },
                {
                    provide:MODEL_TOKENS.PERSON_BESTFILM_TOKEN,
                    useValue: {
                        findAll: jest.fn(() => ([{ "id": 1, "occupation_id": 1, "person_id": 1 }]))

                    }
                }
            ]
        }).compile()
        personService = module.get<PersonService>(PersonService)

        personRepository = module.get<Repository<Person>>(MODEL_TOKENS.PERSON_TOKEN)
        personCountryRepository = module.get<Repository<PersonCountry>>(MODEL_TOKENS.PERSON_COUNTRY_TOKEN)
        personGenreRepository = module.get<Repository<PersonGenre>>(MODEL_TOKENS.PERSON_GENRE_TOKEN)
        personOccupationRepository = module.get<Repository<PersonOccupation>>(MODEL_TOKENS.PERSON_OCCUPATION_TOKEN)
        occupationRepository = module.get<Repository<Occupation>>(MODEL_TOKENS.OCCUPATION_TOKEN)
        genreRepository = module.get<Repository<Genre>>(MODEL_TOKENS.GENRE_TOKEN)
        countryRepository = module.get<Repository<Country>>(MODEL_TOKENS.COUNTRY_TOKEN)
    });

    describe("testing method update", () => {

        it('method should return update a person', async () => {

            expect(await personService.updatePerson({'oldName': "PersonName", "newName": "newPersonName"}))
                .toEqual({
                "id": 1,
                "name": "newPersonName"
            })
        })

        it('update person, with exist person, throw exception', async () => {
            personRepository.update = jest.fn( () => undefined)
            await expect(async () => {
                return await personService.updatePerson({'oldName': "PersonName", "newName": "newPersonName"})
            }).rejects.toThrow(RpcException)
        })
    })

    describe('testing method getAll person', () => {

        it('method should return all person', async () => {
            expect(await personService.getAllPerson()).toEqual([{}])
        })

    })

    describe('testing method findOne Perosn', () => {

        it('method should return one person with include models', async () => {
            expect(await personService.getByValue(1)).toEqual(
                {
                "person": {
                    "id": 1,
                    "name": "go and look"
                },
                "personBestFilms": [
                    {
                        "id": 1,
                        "occupation_id": 1,
                        "person_id": 1
                    }
                ],
                "personCountry": [
                    {
                        "country_id": 1,
                        "id": 1,
                        "person_id": 1
                    }
                ],
                "personGenre": [
                    {
                        "genre_id": 1,
                        "id": 1,
                        "person_id": 1
                    }
                ],
                "personOccupation": [
                    {
                        "id": 1,
                        "occupation_id": 1,
                        "person_id": 1
                    }
                ]
            })
        })
        it('findOne person, with non-exist person, throw exception ', async () => {
            personRepository.findOne = jest.fn( () => undefined)
            await expect(async () => {
                return await personService.getByValue(1)
            }).rejects.toThrow(RpcException)
        })
    })

    describe('testing method delete Person', () => {

        it('method should return "1" - successful destroy', async () => {
            expect(await personService.deletePerson(1)).toEqual(1)
            expect(await personService.deletePerson(1)).not.toEqual(2)
            expect(await personService.deletePerson(1)).not.toEqual('Том круз')

        })

        it('destroy person, with non-exist person, throw exception', async () => {
            personRepository.destroy = jest.fn( () => undefined)
            await expect(async () => {
                return await personService.deletePerson(1)
            }).rejects.toThrow(RpcException)
        })
    })

})