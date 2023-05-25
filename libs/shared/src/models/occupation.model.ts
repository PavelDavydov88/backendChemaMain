import { Column, DataType, Model, Table } from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface OccupationCreationAttrs {
    name: string,
}

@Table({tableName: 'occupation', createdAt: false, updatedAt: false})
export class Occupation extends Model<Occupation, OccupationCreationAttrs> {
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

}