import { Column, DataType, Model, Table } from "sequelize-typescript";

interface OccupationCreationAttrs {
    name: string,
}

@Table({tableName: 'occupation', createdAt: false, updatedAt: false})
export class Occupation extends Model<Occupation, OccupationCreationAttrs> {
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