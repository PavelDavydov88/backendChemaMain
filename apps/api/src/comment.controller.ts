import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment/comment.service";
import { CreatCommentFilmDto } from "../../../libs/shared/src/dtos/comment-dto/creatCommentFilm.dto";
import { JwtAuthGuard } from "../../auth/src/jwt-auth.guard";
import { Roles } from "@app/shared/decorators/role-auth.decorator";
import { catchError, throwError } from "rxjs";
import { RpcException } from "@nestjs/microservices";

@Controller("comment")
export class CommentController {
  constructor(
    private commentService: CommentService
  ) {
  }

  @Get("/:id")
  async getCommentsByFilmId(@Param("id") id: number) {
    return await this.commentService.getCommentsByFilmId(id)
      .catch(error => {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      });
  }


  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'USER')
  @Post()
  async creatComment(@Body() creatCommentFilmDto: CreatCommentFilmDto) {
    return await this.commentService.creatCommentFilm(creatCommentFilmDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Delete("/:id")
  async deleteComment(@Param("id") id: number) {
    return await this.commentService.deleteCommentFilm(id);
  }

}