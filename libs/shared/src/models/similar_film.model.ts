import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "./film.model";

interface SimilarFilmCreationAttrs {
    film_id: number,
    similar_film_id: number,
}

@Table({tableName: 'similar_film', createdAt: false, updatedAt: false})
export class SimilarFilm extends Model<SimilarFilm, SimilarFilmCreationAttrs> {
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

    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    similar_film_id: number;

    @BelongsTo(() => Film)
    similar_film: Film;

}