import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards
} from "@nestjs/common";
import { CommentService } from "./comment/comment.service";
import { CreatCommentFilmDto } from "../../../libs/shared/src/dtos/comment-dto/creatCommentFilm.dto";
import { Roles } from "@app/shared/decorators/role-auth.decorator";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CommentFilm } from "@app/shared/models/comment.model";
import { RoleGuard } from "../../auth/src/role.guard";

@Controller("comment")
export class CommentController {
  constructor(
    private commentService: CommentService
  ) {
  }

  @ApiOperation({ summary: " Получить все комментарии к фильму" })
  @ApiResponse({ status: 200, type: CommentFilm })
  @Get("/:id")
  async getCommentsByFilmId(@Param("id") id: number) {
    return await this.commentService.getCommentsByFilmId(id)
      .catch(error => {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      });
  }

  @ApiOperation({ summary: "Создать новый комментарий" })
  @ApiResponse({ status: 201, type: CommentFilm })
  @UseGuards(RoleGuard)
  @Roles("USER")
  @Post()
  async creatComment(@Body() creatCommentFilmDto: CreatCommentFilmDto) {
    return await this.commentService.creatCommentFilm(creatCommentFilmDto);
  }

  @ApiOperation({ summary: "Удалить комментарий" })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(RoleGuard)
  @Roles("ADMIN", "USER")
  @Delete("/:id")
  async deleteComment(@Request() req: Request, @Param("id") id: number) {
    return await this.commentService.deleteCommentFilm(req, id);
  }

}