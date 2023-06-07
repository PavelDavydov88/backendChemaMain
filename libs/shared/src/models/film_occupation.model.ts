import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "./film.model";
import {Genre} from "./genre.model";
import {Country} from "./country.model";
import {Person} from "./person.model";
import {Occupation} from "./occupation.model";
import {ApiProperty} from "@nestjs/swagger";

interface FilmOccupationCreationAttrs {
    person_id: number,
    occupation_id: number,
    film_id: number,
}

@Table({tableName: 'film_occupation', createdAt: false, updatedAt: false})
export class FilmOccupation extends Model<FilmOccupation, FilmOccupationCreationAttrs> {
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

    @ApiProperty({ example: '1', description: 'внешний ключ, ссылкается на PERSON' })
    @ForeignKey(() => Person)
    @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    person_id: number;

    @BelongsTo(() => Person)
    person: Person;

    @ApiProperty({ example: '1', description: 'внешний ключ, ссылкается на OCCUPATION' })
    @ForeignKey(() => Occupation)
    @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    occupation_id: number;

    @BelongsTo(() => Occupation)
    occupation: Occupation;

}