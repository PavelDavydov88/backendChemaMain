import { BelongsTo, Column, DataType, ForeignKey, Index, Model, Table, Unique } from "sequelize-typescript";
import { Film } from "@app/shared/models/film.model";
import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "@app/shared/models/profile.model";

interface CommentCreationAttrs {
  userName: string,
  text: string,
  filmId: number,
  parentCommentId : number;
}

@Table({ tableName: "commentFilm", createdAt: false, updatedAt: false })
export class CommentFilm extends Model<CommentFilm, CommentCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })
  id: number;
  @ApiProperty({ example: '1', description: 'Id профиля' })
  @ForeignKey(() => Profile)
  @Column({type: DataType.INTEGER, unique: 'uniqueProfileFilm', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  profileId: number;

  @BelongsTo(() => Profile)
  profile: Profile;

  @ApiProperty({ example: 'классный фильм', description: 'комментарий к фильму' })
  @Column({ type: DataType.STRING, unique: 'uniqueProfileFilm' })
  text: string;

  @ApiProperty({ example: '2', description: 'Id фильма' })
  @ForeignKey(() => Film)
  @Column({type: DataType.INTEGER, unique: 'uniqueProfileFilm', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  film_id: number;

  @BelongsTo(() => Film)
  film: Film;

  @ApiProperty({ example: '1', description: 'Id комментария к которому добавляют комментарий' })
  @Column({type: DataType.INTEGER, unique: 'uniqueProfileFilm',})
  parentCommentId: number;

}