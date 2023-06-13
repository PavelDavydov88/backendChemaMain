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
import {CommentService} from "../comment/comment.service";
import {CreatCommentFilmDto} from "@app/shared/dtos/comment-dto/creatCommentFilm.dto";
import {Roles} from "@app/shared/decorators/role-auth.decorator";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {CommentFilm} from "@app/shared/models/comment.model";
import {RoleGuard} from "../../../auth/src/role.guard";
import {JwtAuthGuard} from "../../../auth/src/jwt-auth.guard";

@Controller("comment")
export class CommentController {
  constructor(
    private commentService: CommentService
  ) {
  }

  @ApiOperation({ summary: " Получить все комментарии к фильму", tags: ['film']  })
  @ApiResponse({ status: 200, type: CommentFilm })
  @Get("/:id")
  async getCommentsByFilmId(@Param("id") id: number) {
    return await this.commentService.getCommentsByFilmId(id)
      .catch(error => {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      });
  }

  @ApiOperation({ summary: "Создать новый комментарий", tags: ['film']  })
  @ApiResponse({ status: 201, type: CommentFilm })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Roles("USER")
  @Post()
  async creatComment(@Request() req: Request, @Body() creatCommentFilmDto: CreatCommentFilmDto) {
    return await this.commentService.creatCommentFilm(req, creatCommentFilmDto);
  }

  @ApiOperation({ summary: "Удалить комментарий", tags: ['film']  })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Roles("ADMIN", "USER")
  @Delete("/:id")
  async deleteComment(@Request() req: Request, @Param("id") id: number) {
    return await this.commentService.deleteCommentFilm(req, id);
  }

}