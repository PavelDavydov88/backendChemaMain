import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "./film.model";
import {Genre} from "./genre.model";
import {ApiProperty} from "@nestjs/swagger";

interface FilmGenreCreationAttrs {
    film_id: number,
    genre_id: number,
}

@Table({tableName: 'film_genre', createdAt: false, updatedAt: false})
export class FilmGenre extends Model<FilmGenre, FilmGenreCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: '1', description: 'внешний ключ, ссылкается на FILM' })
    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    film_id: number;

    @BelongsTo(() => Film)
    film: Film;

    @ApiProperty({ example: '1', description: 'внешний ключ, ссылкается на GENRE' })
    @ForeignKey(() => Genre)
    @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    genre_id: number;

    @BelongsTo(() => Genre)
    genre: Genre;

}