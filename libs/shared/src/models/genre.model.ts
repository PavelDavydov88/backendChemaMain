import { Column, DataType, Model, Table } from "sequelize-typescript";

interface GenreCreationAttrs {
    name: string,
    nameEng: string,
}

@Table({tableName: 'genre', createdAt: false, updatedAt: false})
export class Genre extends Model<Genre, GenreCreationAttrs> {
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