import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "./film.model";
import {Genre} from "./genre.model";
import {Country} from "./country.model";
import {Person} from "./person.model";
import {Occupation} from "./occupation.model";

interface FilmOccupationCreationAttrs {
    person_id: number,
    occupation_id: number,
    film_id: number,
}

@Table({tableName: 'film_occupation', createdAt: false, updatedAt: false})
export class FilmOccupation extends Model<FilmOccupation, FilmOccupationCreationAttrs> {
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

    @ForeignKey(() => Person)
    @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    person_id: number;

    @BelongsTo(() => Person)
    person: Person;

    @ForeignKey(() => Occupation)
    @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    occupation_id: number;

    @BelongsTo(() => Occupation)
    occupation: Occupation;

}