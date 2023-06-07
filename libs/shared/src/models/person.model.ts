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

    @ApiProperty({ example: 'ОЛЕГ ОЛЕГ', description: 'Имя деятеля кино' })
    @Column({ type: DataType.STRING,  defaultValue : null})
    name: string;

    @ApiProperty({ example: 'OLEG OLEG', description: 'Имя деятеля кино на английском' })
    @Column({ type: DataType.STRING,  defaultValue : null})
    nameEng: string;

    @ApiProperty({ example: '1.77', description: 'рост' })
    @Column({ type: DataType.INTEGER, defaultValue : null })
    height: number;

    @ApiProperty({ example: '1.1.1', description: 'дата рождения' })
    @Column({ type: DataType.STRING, defaultValue : null})
    birthday: string;

    @ApiProperty({ example: '2.2.1109', description: 'дата смерти' })
    @Column({ type: DataType.STRING, defaultValue : null})
    death_date: string;

    @ApiProperty({ example: 'Франция', description: 'Место рождения' })
    @Column({ type: DataType.STRING, defaultValue : null})
    place_birthday: string;

    @ApiProperty({ example: '1243', description: 'Кол-во фильмов в которых принимал участие' })
    @Column({ type: DataType.INTEGER, defaultValue : null})
    count_film: number;

    @ApiProperty({ example: '.jpg', description: 'адрес картинки' })
    @Column({ type: DataType.STRING, defaultValue : null})
    picture_person: string;



}