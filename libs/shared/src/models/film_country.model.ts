import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "./film.model";
import {Country} from "./country.model";
import {ApiProperty} from "@nestjs/swagger";

interface FilmCountryCreationAttrs {
    film_id: number,
    country_id: number,
}

@Table({tableName: 'film_country', createdAt: false, updatedAt: false})
export class FilmCountry extends Model<FilmCountry, FilmCountryCreationAttrs> {
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

    @ApiProperty({ example: '1', description: 'внешний ключ, ссылкается на COUNTRY' })
    @ForeignKey(() => Country)
    @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    country_id: number;

    @BelongsTo(() => Country)
    country: Country;

}