import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "./film.model";
import {ApiProperty} from "@nestjs/swagger";

interface SimilarFilmCreationAttrs {
    film_id: number,
    similar_film_id: number,
}

@Table({tableName: 'similar_film', createdAt: false, updatedAt: false})
export class SimilarFilm extends Model<SimilarFilm, SimilarFilmCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;



    @BelongsTo(() => Film, 'film_id')
    film: Film;



    @BelongsTo(() => Film, 'similar_film_id')
    similar_film: Film;

}