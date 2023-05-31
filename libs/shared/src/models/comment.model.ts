import { BelongsTo, Column, DataType, ForeignKey, Index, Model, Table, Unique } from "sequelize-typescript";
import { Film } from "@app/shared/models/film.model";

interface CommentCreationAttrs {
  userName: string,
  text: string,
  filmId: number,
}

@Table({ tableName: "commentFilm", createdAt: false, updatedAt: false })
export class CommentFilm extends Model<CommentFilm, CommentCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;
  @Column({ type: DataType.STRING, unique: 'uniqueUserFilm' })
  userName: string;

  @Column({ type: DataType.STRING, unique: false })
  text: string;

  @ForeignKey(() => Film)
  @Column({type: DataType.INTEGER, unique: 'uniqueUserFilm', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  film_id: number;

  @BelongsTo(() => Film)
  film: Film;




}