import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";


interface FilmCreationAttrs {
    name: string;

}

@Table({ tableName: "film", createdAt: false, updatedAt: false })
export class Film extends Model<Film, FilmCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({ example: 'ОНО', description: 'Имя фильма на русском' })
    @Column({ type: DataType.STRING,  defaultValue : null})
    name: string;

    @ApiProperty({ example: 'IT', description: 'Имя фильма на английском' })
    @Column({ type: DataType.STRING,  defaultValue : null})
    nameEng: string;

    @ApiProperty({ example: '1.1', description: 'Рейтинг' })
    @Column({ type: DataType.REAL, defaultValue : null })
    rating: number;

    @ApiProperty({ example: '1.1', description: 'Рейтинг' })
    @Column({ type: DataType.STRING,  defaultValue : null })
    estimation: string;

    @ApiProperty({ example: 'Rus/Eng', description: 'Субтитры' })
    @Column({ type: DataType.STRING, defaultValue : null})
    subtitles: string;

    @ApiProperty({ example: 'Rus/Eng', description: 'Озвучка' })
    @Column({ type: DataType.STRING, defaultValue : null})
    audio_track: string;



    @ApiProperty({ example: '1999', description: 'Год фильма' })
    @Column({ type: DataType.INTEGER, defaultValue : null})
    year: number;

    @ApiProperty({ example: 'слоган', description: 'слоган' })
    @Column({ type: DataType.STRING, defaultValue : null})
    slogan: string;

    @ApiProperty({ example: '200000$', description: 'Бюджет' })
    @Column({ type: DataType.STRING, defaultValue : null})
    budget: string;

    @ApiProperty({ example: '1000$', description: 'сборы в США' })
    @Column({ type: DataType.STRING, defaultValue : null})
    tax_usa: string;

    @ApiProperty({ example: '11111$', description: 'Сборы в мире' })
    @Column({ type: DataType.STRING, defaultValue : null})
    tax_world: string;

    @ApiProperty({ example: '11111$', description: 'Сборы в россии' })
    @Column({ type: DataType.STRING, defaultValue : null})
    tax_rus: string;

    @ApiProperty({ example: '01.01.2002', description: 'Релиз в мире' })
    @Column({ type: DataType.STRING, defaultValue : null})
    release_world: string;

    @ApiProperty({ example: '01.01.2002', description: 'Релиз в России' })
    @Column({ type: DataType.STRING, defaultValue : null})
    release_rus: string;

    @ApiProperty({ example: '01.01.2002', description: 'Релиз на dvd' })
    @Column({ type: DataType.STRING, defaultValue : null})
    release_dvd: string;

    @ApiProperty({ example: '01.01.2002', description: 'Релиз на dvd' })
    @Column({ type: DataType.STRING, defaultValue : null})
    age_restrict: string;

    @ApiProperty({ example: '1 час ', description: 'Длительность' })
    @Column({ type: DataType.STRING, defaultValue : null})
    time_during: string;

    @ApiProperty({ example: '5/10', description: 'Рейтинг мпаа' })
    @Column({ type: DataType.STRING, defaultValue : null})
    rating_MPAA: string;

    @ApiProperty({ example: 'mp4 ', description: 'трейлер' })
    @Column({ type: DataType.STRING, defaultValue : null})
    trailer: string;

    @ApiProperty({ example: '.png', description: 'картинка url' })
    @Column({ type: DataType.STRING, defaultValue : null})
    picture_film: string;

    // @ApiProperty({ example: '.png', description: 'картинка local' })
    // @Column({ type: DataType.STRING, defaultValue : null})
    // picture_local_URL: string;

}