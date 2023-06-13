import {Injectable, NotFoundException} from "@nestjs/common";
import {Person} from "@app/shared/models/person.model";
import {InjectModel} from "@nestjs/sequelize";
import {PersonCountry} from "@app/shared/models/person_counrty.model";
import {PersonGenre} from "@app/shared/models/person_genre.model";
import {PersonOccupation} from "@app/shared/models/person_occupation.model";
import {Country} from "@app/shared/models/country.model";
import {Genre} from "@app/shared/models/genre.model";
import {Occupation} from "@app/shared/models/occupation.model";
import {CreatePersonDto} from "@app/shared/dtos/person-dto/createPerson.dto";
import {PersonBestFilm} from "@app/shared/models/person_best_film.model";
import {RpcException} from "@nestjs/microservices";
import {Film} from "@app/shared/models/film.model";

@Injectable()
export class PersonService {
  constructor(@InjectModel(Person) private personRepository: typeof Person,
              @InjectModel(PersonCountry) private personCountryRepository: typeof PersonCountry,
              @InjectModel(PersonGenre) private personGenreRepository: typeof PersonGenre,
              @InjectModel(PersonOccupation) private personOccupationRepository: typeof PersonOccupation,
              @InjectModel(Country) private countryRerepository: typeof Country,
              @InjectModel(Genre) private genreRepository: typeof Genre,
              @InjectModel(Occupation) private occupationRepository: typeof Occupation,
              @InjectModel(PersonBestFilm) private bestFilmRepository: typeof PersonBestFilm,
              @InjectModel(Film) private filmRepository: typeof Film
  ) {}
  async getAllPerson(){
    return this.personRepository.findAll()
  }
  async getByValue(id : number){
    const person  = await this.personRepository.findOne({ where: { id: id  } } )
    if(person){
      const personCountry = await this.personCountryRepository.findAll({ where: { person_id: id }, include: { model:  Country  } } )
      const personGenre = await this.personGenreRepository.findAll({ where: { person_id: id }, include: { model: Genre } } )
      const personOccupation = await this.personOccupationRepository.findAll({ where: { person_id: id }, include: { model: Occupation } } )
      const personBestFilms = await this.bestFilmRepository.findAll({where: { person_id: id }, include: {model: Film}})

      return {
        person, personCountry, personGenre, personOccupation, personBestFilms
      }
    }else{
      throw new RpcException(
          new NotFoundException('Такого работника кино не существует')
      )
    }

  }
  async deletePerson(id: number){
    const person =  await this.personRepository.findByPk(id)
    if(!person) throw new RpcException(
      new NotFoundException(`Такого работника кино не существует!`));
    else{ await this.personRepository.destroy({ where: { id: id } })
    return person.picture_person
    }

  }
  async updatePerson(dto: CreatePersonDto, id: number){
    // console.log(dto, id)
    const person = await this.personRepository.update({ name: dto.name }, { where: { id : id }})
    if(!person)  throw new RpcException(
      new NotFoundException(`Такого работника кино не сущесвует!`))
    else return person
  }


  async createPerson(dto: CreatePersonDto){
    const getPerson = await this.personRepository.findOne({
      where: { name: dto.name }
    })

    if (getPerson) throw new RpcException(
      new NotFoundException(`это имя уже занято!`));
    const createPerson = await this.personRepository.create(dto)
    const country = await this.countryRerepository.findOne({ where: {
      name: dto.country } } );

    const genres = await this.genreRepository.findAll({ attributes: ["id", "name"], raw: true });
    const occupation = await this.occupationRepository.findAll({ attributes: ["id", "name"], raw: true });
    const bestFilm = await this.filmRepository.findAll({ attributes: ["id", "name"], raw: true });

    const genresPerson = dto.genre;
    const occupationsPerson = dto.occupation;
    const bestFilmPerson = dto.bestFilm;
    if(genresPerson){
      const idGenres: number[] = genres.filter(genre => genresPerson.includes(genre.name)).map(id => id.id);
      await this.saveArrayToPersonGenre(createPerson.id, idGenres, this.personGenreRepository);
    }

    if(occupationsPerson){
      const idOccupation: number[] = occupation.filter(occupation => occupationsPerson.includes(occupation.name)).map(id => id.id);
      await this.saveArrayToPersonOccupation(createPerson.id, idOccupation, this.personOccupationRepository)
    }

    if(bestFilmPerson){

      const idBestFilm: number[] = bestFilm.filter(bestFilm => bestFilmPerson.includes(bestFilm.name)).map(id => id.id);
      await this.saveArrayToPersonBestFilm(createPerson.id, idBestFilm, this.bestFilmRepository)


    }

    if(country){
      await this.personCountryRepository.create({person_id: createPerson.id, country_id: country.id})

    }

    return createPerson;
  }


  private async saveArrayToPersonGenre(idPerson: number, arrayIdEntity: number[], model: any){
    for (let i = 0; i < arrayIdEntity.length; i++){
      await model.create({ person_id: idPerson, genre_id: arrayIdEntity[i] })
    }
  }
  private async saveArrayToPersonOccupation(idPerson: number, arrayIdEntity: number[], model: any ){
    for (let i = 0; i < arrayIdEntity.length; i++){

      await model.create({ person_id: idPerson, occupation_id: arrayIdEntity[i] })
    }
  }
  private async saveArrayToPersonBestFilm(idPerson: number, arrayIdEntity: number[], model: any ){
    for (let i = 0; i < arrayIdEntity.length; i++){
      await model.create({ person_id: idPerson, film_id: arrayIdEntity[i] })
    }
  }



}
