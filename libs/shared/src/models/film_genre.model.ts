import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "./film.model";
import {Genre} from "./genre.model";

interface FilmGenreCreationAttrs {
    film_id: number,
    genre_id: number,
}

@Table({tableName: 'film_genre', createdAt: false, updatedAt: false})
export class FilmGenre extends Model<FilmGenre, FilmGenreCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    film_id: number;

    @BelongsTo(() => Film)
    film: Film;

    @ForeignKey(() => Genre)
    @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    genre_id: number;

    @BelongsTo(() => Genre)
    genre: Genre;

}