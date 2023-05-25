import { Column, DataType, Model, Table } from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface GenreCreationAttrs {
    name: string,
    nameEng: string,
}

@Table({tableName: 'genre', createdAt: false, updatedAt: false})
export class Genre extends Model<Genre, GenreCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({type: DataType.STRING, unique: true})
    name: string;

    @Column({type: DataType.STRING, unique: true})
    nameEng: string;

}