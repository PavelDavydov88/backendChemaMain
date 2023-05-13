import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "./film.model";
import {Genre} from "./genre.model";
import {Person} from "./person.model";

interface PersonGenreCreationAttrs {
    person_id: number,
    genre_id: number,
}

@Table({tableName: 'person_genre', createdAt: false, updatedAt: false})
export class PersonGenre extends Model<PersonGenre, PersonGenreCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Person)
    @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    person_id: number;

    @BelongsTo(() => Person)
    person: Person;

    @ForeignKey(() => Genre)
    @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    genre_id: number;

    @BelongsTo(() => Genre)
    genre: Genre;

}