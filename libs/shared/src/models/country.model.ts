import { Column, DataType, Model, Table } from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface CountryCreationAttrs {
    name: string,

}

@Table({tableName: 'country', createdAt: false, updatedAt: false})
export class Country extends Model<Country, CountryCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'africa', description: 'страна' })
    @Column({type: DataType.STRING, unique: true})
    name: string;

    @ApiProperty({ example: 'picture', description: 'url картинки' })
    @Column({ type: DataType.STRING, defaultValue : null})
    picture_URL: string;

    @ApiProperty({ example: 'picture_local', description: 'url картинки локально' })
    @Column({ type: DataType.STRING, defaultValue : null})
    picture_local_URL: string;

}