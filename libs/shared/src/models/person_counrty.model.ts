import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { Person } from "./person.model";
import { Country } from "./country.model";
import {ApiProperty} from "@nestjs/swagger";
// import {Film} from "./film.model";
// import {Genre} from "./genre.model";

interface FilmGenreCreationAttrs {
  person_id: number,
  country_id: number,
}

@Table({tableName: 'person_country', createdAt: false, updatedAt: false})
export class PersonCountry extends Model<PersonCountry, FilmGenreCreationAttrs> {
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

  @ForeignKey(() => Country)
  @Column({type: DataType.INTEGER, unique: 'uniqueTag', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  country_id: number;

  @BelongsTo(() => Country)
  country: Country;

}