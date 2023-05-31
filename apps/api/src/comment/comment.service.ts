import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CommentFilm } from "@app/shared/models/comment.model";
import { CreatCommentFilmDto } from "./dto/creatCommentFilm.dto";

@Injectable()
export class CommentService {

  constructor(@InjectModel(CommentFilm) private commentFilmRepository: typeof CommentFilm) {
  }

  async getCommentsByFilmId(id: number) {
    const comments = await this.commentFilmRepository.findAll({ where: { film_id: id } });
    return comments;
  }

  async creatCommentFilm(creatCommentFilmDto: CreatCommentFilmDto) {
    try {
      return await this.commentFilmRepository.create(creatCommentFilmDto);
    } catch (e) {
      return new HttpException("Не удалось сохранить комментарий", HttpStatus.BAD_REQUEST);
    }
  }

  async deleteCommentFilm(id: number) {
    const comment = await this.commentFilmRepository.findOne({ where: { id: id } });
    if (comment) {
      await this.commentFilmRepository.destroy({ where: { id: comment.id } });
      return comment.id;
    } else {
      return new HttpException("Такого комментария не существует", HttpStatus.BAD_REQUEST);
    }
  }
}
