import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CommentFilm } from "@app/shared/models/comment.model";
import { CreatCommentFilmDto } from "../../../../libs/shared/src/dtos/comment-dto/creatCommentFilm.dto";
import { Op } from "sequelize";

@Injectable()
export class CommentService {

  constructor(@InjectModel(CommentFilm) private commentFilmRepository: typeof CommentFilm) {
  }

  async getCommentsByFilmId(id: number) {

    const comments = await this.commentFilmRepository.findAll({ where: { film_id: id }, raw: true });
    console.log("comments "  + comments.length );
    if (comments.length === 0) throw new HttpException("Нет комментариев к этому фильму", HttpStatus.BAD_REQUEST);
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
      throw new HttpException("Не удалось сохранить комментарий", HttpStatus.BAD_REQUEST);
    }
  }

  async deleteCommentFilm(id: number) {
    const comment = await this.commentFilmRepository.findOne({ where: { id: id } });
    if (comment) {
      await this.commentFilmRepository.destroy({ where:  {[Op.or] : [{id: comment.id}, {parentCommentId: comment.id} ]}  }  );
      return comment.id;
    } else {
      throw new HttpException("Такого комментария не существует", HttpStatus.BAD_REQUEST);
    }
  }
}
