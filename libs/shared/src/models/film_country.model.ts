import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "./film.model";
import {Genre} from "./genre.model";
import {Country} from "./country.model";

interface FilmCountryCreationAttrs {
    film_id: number,
    country_id: number,
}

@Table({tableName: 'film_country', createdAt: false, updatedAt: false})
export class FilmCountry extends Model<FilmCountry, FilmCountryCreationAttrs> {
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

    @ForeignKey(() => Country)
    @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    country_id: number;

    @BelongsTo(() => Country)
    country: Country;

}