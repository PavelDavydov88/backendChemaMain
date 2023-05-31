import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CommentService } from "./comment/comment.service";
import { CreatCommentFilmDto } from "./comment/dto/creatCommentFilm.dto";

@Controller("comment")
export class CommentController {
  constructor(
    private commentService: CommentService
  ) {
  }

  @Get("/:id")
  async getCommentsByFilmId(@Param("id") id: number) {
    return await this.commentService.getCommentsByFilmId(id);
  }

  @Post()
  async creatComment(@Body() creatCommentFilmDto: CreatCommentFilmDto) {
    return await this.commentService.creatCommentFilm(creatCommentFilmDto);
  }

  @Delete("/:id")
  async deleteComment(@Param("id") id: number) {
    return await this.commentService.deleteCommentFilm(id);
  }

}