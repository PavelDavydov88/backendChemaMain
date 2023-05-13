import { Column, DataType, Model, Table } from "sequelize-typescript";

interface CountryCreationAttrs {
    name: string,

}

@Table({tableName: 'country', createdAt: false, updatedAt: false})
export class Country extends Model<Country, CountryCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({type: DataType.STRING, unique: true})
    name: string;

    @Column({ type: DataType.STRING, defaultValue : null})
    picture_URL: string;

    @Column({ type: DataType.STRING, defaultValue : null})
    picture_local_URL: string;

}