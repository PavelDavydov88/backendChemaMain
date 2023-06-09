import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Person} from "@app/shared/models/person.model";
import {Film} from "@app/shared/models/film.model";

interface FilmFileCreationAttrs {
    film_id: number,
    file: string
}

@Table({tableName: 'film_file', createdAt: false, updatedAt: false})
export class Film_file extends Model<Film_file, FilmFileCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: '1', description: 'внешний ключ, ссылается на FILM' })
    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER, unique: true, onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    film_id: number;

    @BelongsTo(() => Film)
    film: Film

    @ApiProperty({ example: 'picture.jpeg', description: 'картинка' })
    @Column({type: DataType.STRING, unique: true, onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    file: string

}