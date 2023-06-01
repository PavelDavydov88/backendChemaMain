import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CommentFilm } from "@app/shared/models/comment.model";
import { CreatCommentFilmDto } from "./dto/creatCommentFilm.dto";

@Injectable()
export class CommentService {

  constructor(@InjectModel(CommentFilm) private commentFilmRepository: typeof CommentFilm) {
  }

  async getCommentsByFilmId(id: number) {
    const comments = await this.commentFilmRepository.findAll({ where: { film_id: id }, raw: true });
    function buildHierarchy(arry) {

      var roots = [], children = {};

      // find the top level nodes and hash the children based on parent
      for (var i = 0; i < arry.length; ++i) {
        var item = arry[i],
          p = item.parentCommentId,
          target = !p ? roots : (children[p] || (children[p] = []));

        target.push({ comment: item });
      }

      // function to recursively build the tree
      var findChildren = function(parent) {
        if (children[parent.comment.id]) {
          parent.children = children[parent.comment.id];
          for (var i = 0; i < parent.children.length; ++i) {
            findChildren(parent.children[i]);
          }
        }
      };

      // enumerate through to handle the case where there are multiple roots
      for (var i = 0; i < roots.length; ++i) {
        findChildren(roots[i]);
      }

      return roots;
    }

    return buildHierarchy(comments);
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
