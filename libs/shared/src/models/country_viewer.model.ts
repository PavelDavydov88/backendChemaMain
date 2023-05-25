import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "./film.model";
import {Genre} from "./genre.model";
import {Country} from "./country.model";
import {ApiProperty} from "@nestjs/swagger";

interface CountryViewerCreationAttrs {
    count: number,
    country_id: number,
    film_id: number,
}

@Table({tableName: 'country_viewer', createdAt: false, updatedAt: false})
export class CountryViewer extends Model<CountryViewer, CountryViewerCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })

    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: '11111', description: 'Кол-во просмотров на одну страну' })
    @Column({ type: DataType.INTEGER, defaultValue : null})
    count: number;

    @ApiProperty({ example: '1', description: 'Уникальный индефикатор фильма' })
    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    film_id: number;

    @BelongsTo(() => Film)
    film: Film;

    @ApiProperty({ example: '1', description: 'Уникальный индефикатор страны' })
    @ForeignKey(() => Country)
    @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    country_id: number;

    @BelongsTo(() => Country)
    country: Country;

}