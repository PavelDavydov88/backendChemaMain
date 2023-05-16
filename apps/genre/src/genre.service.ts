import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Genre} from "@app/shared/models/genre.model";
import {CreateGenreDto} from "./dto/createGenre.dto";
import {UpdateGenreDto} from "./dto/updateGenre.dto";

@Injectable()
export class GenreService {
  constructor(@InjectModel(Genre) private genreRepository: typeof Genre) {}

  async getAllGenres(){
    const genres = this.genreRepository.findAll()
    return genres
  }
  async createGenre(dto: CreateGenreDto){
    const getGenre = await this.genreRepository.findOne({
      where: {name: dto.name}})
    if (getGenre){
      throw new HttpException('Такой жанр уже создан', HttpStatus.BAD_REQUEST)
    }else{
      const createGenre = await this.genreRepository.create(dto)
      return createGenre

    }


  }
  async updateGenre(dto: UpdateGenreDto){
    const genre = await this.genreRepository.update(dto, {where: {id: dto.id}})
    return genre
  }
  async deleteGenre(dto: CreateGenreDto){
    const id = await this.genreRepository.findOne({where: {name: dto.name}})
    if(id){
      const genre = await this.genreRepository.destroy({where: {id: id.id}})
      return genre
    }else{
      throw new HttpException('Такого жанра нет', HttpStatus.BAD_REQUEST)
    }
  }

}
