import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Genre } from "@app/shared/models/genre.model";
import { CreateGenreDto } from "@app/shared/dtos/genre-dto/createGenre.dto";
import { UpdateGenreDto } from "@app/shared/dtos/genre-dto/updateGenre.dto";
import { DeleteGenreDto } from "@app/shared/dtos/genre-dto/deleteGenre.dto";
import { RpcException } from "@nestjs/microservices";

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

  async updateGenre(dto: UpdateGenreDto) {
    const genre = await this.genreRepository.findOne({ raw: true, where: { id: dto.id } });
    if (!genre) {
      throw new RpcException(
        new NotFoundException(`Такой жанр не найден!`));
    }
    return await this.genreRepository.update(dto, { where: { id: dto.id } });
  }

  async deleteGenre(dto: DeleteGenreDto) {
    const id = await this.genreRepository.findOne({ where: { id: dto.id } });
    if (id) {
      return await this.genreRepository.destroy({ where: { id: id.id } });
    } else {
      throw new RpcException(
        new NotFoundException(`Такого жанра нет!`));
    }
  }

}
