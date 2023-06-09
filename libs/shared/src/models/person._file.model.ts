import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Person} from "@app/shared/models/person.model";

interface PersonFileCreationAttrs {
    person_id: number,
    file: string
}

@Table({tableName: 'person_file', createdAt: false, updatedAt: false})
export class Person_file extends Model<Person_file, PersonFileCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: '1', description: 'внешний ключ, ссылается на PERSON' })
    @ForeignKey(() => Person)
    @Column({type: DataType.INTEGER, unique: true, onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    person_id: number;

    @BelongsTo(() => Person)
    person: Person

    @ApiProperty({ example: 'picture.jpeg', description: 'картинка' })
    @Column({type: DataType.STRING, unique: true, onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    file: string

}