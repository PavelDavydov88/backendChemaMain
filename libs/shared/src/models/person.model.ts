import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";


interface PersonCreationAttrs {
    name: string;

}

@Table({ tableName: "person", createdAt: false, updatedAt: false })
export class Person extends Model<Person, PersonCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING,  defaultValue : null})
    name: string;

    @Column({ type: DataType.STRING,  defaultValue : null})
    nameEng: string;

    @Column({ type: DataType.INTEGER, defaultValue : null })
    height: number;

    @Column({ type: DataType.STRING, defaultValue : null})
    birthday: string;

    @Column({ type: DataType.STRING, defaultValue : null})
    death_date: string;

    @Column({ type: DataType.STRING, defaultValue : null})
    place_birthday: string;

    @Column({ type: DataType.INTEGER, defaultValue : null})
    count_film: number;

    @Column({ type: DataType.STRING, defaultValue : null})
    picture_URL: string;

    @Column({ type: DataType.STRING, defaultValue : null})
    picture_local_URL: string;

}