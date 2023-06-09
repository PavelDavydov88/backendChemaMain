import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "@app/shared/models/profile.model";

export class CreatCommentFilmDto {

  @ApiProperty({ example: '1', description: 'Id профиля' })
  profileId: string;
  @ApiProperty({ example: 'классный фильм', description: 'комментарий к фильму' })
  text: string;
  @ApiProperty({ example: '2', description: 'Id фильма' })
  filmId: number;

  @ApiProperty({ example: '1', description: 'Id комментария к которому добавляют комментарий' })
  parentCommentId: number;

}