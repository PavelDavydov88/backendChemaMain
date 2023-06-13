import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Genre} from "@app/shared/models/genre.model";
import {CreateGenreDto} from "@app/shared/dtos/genre-dto/createGenre.dto";
import {RpcException} from "@nestjs/microservices";

@Injectable()
export class GenreService {
  constructor(@InjectModel(Genre) private genreRepository: typeof Genre) {
  }

  async getAllGenres() {
    const genres = this.genreRepository.findAll();
    return genres;
  }

  async createGenre(dto: CreateGenreDto) {
    const getGenre = await this.genreRepository.findOne({
      where: { name: dto.name }
    });
    if (getGenre) {
      throw new RpcException(
        new NotFoundException(`Такой жанр уже создан!`));
    } else {
      return await this.genreRepository.create(dto);

    }

  }

  async updateGenre(id: number,dto: CreateGenreDto) {
    const genre = await this.genreRepository.update(dto, { where: { id: id } });
    if (!genre) {
      throw new RpcException(
        new NotFoundException(`Такой жанр не найден!`));
    }
    return genre
  }

  async deleteGenre(id: number) {
    const genre = await this.genreRepository.destroy({ where: { id: id } });
    if (genre) {
      return genre
    } else {
      throw new RpcException(
        new NotFoundException(`Такого жанра нет!`));
    }
  }

}
