import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "./film.model";
import {Genre} from "./genre.model";
import {Person} from "./person.model";
import { Occupation } from "./occupation.model";
import {ApiProperty} from "@nestjs/swagger";

interface PersonGenreCreationAttrs {
  person_id: number,
  genre_id: number,
}

@Table({tableName: 'person_occupation', createdAt: false, updatedAt: false})
export class PersonOccupation extends Model<PersonOccupation, PersonGenreCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })
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

  @ForeignKey(() => Occupation)
  @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  occupation_id: number;

  @BelongsTo(() => Occupation)
  occupation: Occupation;

}